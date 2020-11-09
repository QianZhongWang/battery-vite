import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue';
import T404 from '../views/exception/404.vue';

// const About = { template: '<div>About</div>' }
const routes = [
    { path: '/login', component: Login },
    // { path: '/about', component: About },
    { path: '/', component: T404 },
    // { path: '/home', name: 'home',
    //     // 单页模式
    //     // component: () => import('@/components/layouts/BasicLayout'),
    //     // TAB模式
    //     component: resolve => require(['@/components/layouts/TabLayout'], resolve),
    //     meta: { title: '统计首页' },
    //     redirect: '/dashboard/home',
    //     children: [
    //         // routers
    //     ]
    // },
    // { path: '/:catchAll(/*)', 'redirect': '/404', 'hidden': true }
];
// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });
export default createRouter({
    history: createWebHistory(),
    routes,
})
