import {createRouter, createWebHashHistory} from 'vue-router'
// hash: createWebHashHistory
// history: createWebHistory
const routes = [
    { path: '/', component: () => import('../App.vue')},
    {
        path: '/todo',
        component: () => {}
    }
];
export default createRouter({
    history: createWebHashHistory(),
    routes
})