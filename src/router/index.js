import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/index.html'
    },
    {
        path: '/index.html',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router