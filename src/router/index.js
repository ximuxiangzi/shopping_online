import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/lineMonitor".
// 解决vue-router重复导航同一个路由的报错问题.
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
//布局
// import Layout from "@/components/index.vue";

//路由
export const routingList=[
    {
        path: '*',
        redirect: '/login',
    },//匹配不到路由时跳转的页面
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),// vue路由懒加载  异步加载
        meta: {
            noNav: true // 不显示nav
        },
    },
    {
        path: '/home',//每次进入默认进入该路由
        name: '/home',// 可以为路由进行命名,可以通过name进行路由跳转
        // component: Layout,
        component: () => import('@/views/homePage/index.vue'),
        meta: {//可以保存路由里的一些信息，相当于html里的meta元信息,你可以通过$route里来获取
            title: '首页',
            requireAuth: true // 只要此字段为true，必须做鉴权处理
        },    
    },
    {
        path: '/system',
        name: '系统管理',
        // component: Layout,
        component: () => import('@/views/system/index.vue'),
        meta: {
            title: '系统管理',
            requireAuth: true 
        },
        children:[
            {
            path: '/system',
            component: () => import('@/views/system/index.vue'),
            },
           {
            path: '/menu',
            name:'menu',
            component: () => import('@/views/system/menu.vue'),
           },
           {
            path: '/role',
            name:'role',
            component: () => import('@/views/system/role.vue'),
           },
        ]
    },
]

//把常量routingList放进来
const createRouter = () =>
    new VueRouter({
        // scrollBehavior: () => ({ y: 0 }),
        routes: routingList,
    });
const router = createRouter();
//导出router
export default router
