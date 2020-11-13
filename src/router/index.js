import {createRouter, createWebHistory} from 'vue-router'
// import { $util } from '../util/index'// 进度条
import NProgress from 'nprogress' // progress bar

const INDEX_MAIN_PAGE_PATH = '/home/home';

/**
 * 白名单列表
 * @type {*[]}
 */
const whiteList = [
    '/user/login',
    '/sso',
    '/user/register',
    '/user/register-result'
];

/**
 * 生成路由列表
 * @param data
 * @returns {*[]}
 */
function generateRouter(data) {
    const childrenList = generateChildRouters(data)
    return [
        { path: '/user/login', component: ()=> import('../views/user/login.vue') },
        { path: '/404', component: () => import('../views/exception/404.vue') },
        {
            path: '/', name: 'home',
            // 单页模式
            component: () => import('../views/home/home.vue'),
            // TAB模式
            // component: resolve => require(['@/components/layouts/TabLayout'], resolve),
            meta: {title: '首页'},
            redirect: '/home/home',
            children: [
                // routers
                ...childrenList
            ]
        },
        { path: '/:catchAll(.*)', 'redirect': '/404', 'hidden': true }
    ]
}

/**
 * 生成嵌套路由（子路由）
 * @param data
 * @returns {[]}
 */
function generateChildRouters(data) {
    if(!data) return []
    const routers = [];
    for (const item of data) {
        let component = '';
        if (item.component.indexOf('layouts') >= 0) {
            component = 'components/' + item.component
        } else {
            component = 'views/' + item.component
        }

        // eslint-disable-next-line
        let URL = (item.meta.url || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)); // URL支持{{ window.xxx }}占位符变量
        if (isURL(URL)) {
            item.meta.url = URL
        }

        const componentPath = resolve => require(['@/' + component + '.vue'], resolve);

        const menu = {
            path: item.path,
            name: item.name,
            redirect: item.redirect,
            component: componentPath,
            hidden: item.hidden,
            // component:()=> import(`@/views/${item.component}.vue`),
            meta: {
                title: item.meta.title,
                icon: item.meta.icon,
                url: item.meta.url,
                permissionList: item.meta.permissionList,
                keepAlive: item.meta.keepAlive,
                internalOrExternal: item.meta.internalOrExternal
            }
        };
        if (item.alwaysShow) {
            menu.alwaysShow = true;
            menu.redirect = menu.path
        }
        if (item.children && item.children.length > 0) {
            menu.children = [...generateChildRouters(item.children)]
        }
        // 根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
        // 判断是否生成路由
        if (item.route && item.route === '0') {
            // console.log(' 不生成路由 item.route：  '+item.route);
            // console.log(' 不生成路由 item.path：  '+item.path);
        } else {
            routers.push(menu)
        }
        // 根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    }
    return routers
}

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/user',
        // component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [{
            path: 'login',
            name: 'login',
            component: () => import('../views/user/Login')
        }]
    },
    {
        path: '/sso',
        component: () => import('../views/sso/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    }
]


/**
 * 创建路由实例
 * @type {Router}
 */
const router = createRouter({
    history: createWebHistory(),
    routes: generateRouter([]),
});

/**
 * 路由守卫设置
 */
router.beforeEach((to, from, next) => {
    // NProgress.start();
    next(true)
    if(false) {
        // if (!$util.token()){
        if (true){
            if (whiteList.indexOf(to.path) !== -1) {
                // 在免登录白名单，直接进入
                next()
            } else {
                next({
                    path: '/user/login',
                    query: {
                        redirect: to.fullPath
                    }
                })
                NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
            }
        } else {
            /* has token */
            if (to.path === '/user/login') {
                next({ path: INDEX_MAIN_PAGE_PATH })
                NProgress.done()
            } else {
                if (store.getters.permissionList.length === 0) {
                    // 加载路由信息
                    store.dispatch('GetPermissionList').then(res => {
                        // 路由信息
                        const menuData = res.result.menu
                        console.log(res.message)
                        if (menuData === null || menuData === '' || menuData === undefined) {
                            return
                        }
                        const constRoutes = router.generate(menuData)

                        // 添加主界面路由
                        store.dispatch('UpdateAppRouter', {
                            constRoutes
                        }).then(() => {
                            // 根据roles权限生成可访问的路由表 动态添加可访问路由表
                            router.addRoutes(store.getters.addRouters)

                            // 需要显示的页面
                            const redirect = decodeURIComponent(from.query.redirect || to.path)
                            if (to.path === redirect) {
                                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                                next({ ...to, replace: true })
                            } else {
                                // 跳转到目的路由
                                next({ path: redirect })
                            }
                        })
                    }).catch(() => {
                        /* notification.error({
                             message: '系统提示',
                             description: '请求用户信息失败，请重试！'
                           })*/
                        store.dispatch('Logout').then(() => {
                            next({
                                path: '/user/login',
                                query: {
                                    redirect: to.fullPath
                                }
                            })
                        })
                    })
                } else {
                    next()
                }
            }
        }
    }
});
router.afterEach(() => {
    // NProgress.done();
});

export default router

