import Vue from "vue";
import VueRouter from "vue-router";

// Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/lineMonitor".

//布局
import Layout from "@/components/index.vue";
Vue.use(VueRouter);

//路由
export const routingList=[
    {
        path: '/',
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
        // name: '/home',// 可以为路由进行命名,可以通过name进行路由跳转
        component: Layout,
        redirect: '/home',
        children:[
            {
                path:'/home',
                component: () => import('@/views/homePage/index.vue'),
            },
        ]
    },
]
// 解决vue-router重复导航同一个路由的报错问题.
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location);
};
//把常量routingList放进来
const router =  new VueRouter({
    // scrollBehavior: () => ({ y: 0 }),
    // mode: 'history',
    routes: routingList,
});
//添加路由的方法
// export function addRoutes(res) {
//     console.log(1111111111111111)
    // res.forEach((Router, index) => {
    //     console.log(Router, index,router)
    //     router.addRoute({
    //     // path: Router.path,
    //     // name: Router.label,
    //     // component: () => import('@/views/' + Router.label + '.vue'),
    //   })
    //   console.log(Router)
    //   let childrens = Router.children;
    //   if (childrens != undefined) {
    //     for (let i = 0; i < childrens.length; i++) {
    //       if (childrens[i] != undefined) {
    //         console.log(childrens)
    //         VueRouter.addRoute('Homepage', {
    //           path: childrens[i].path,
    //           name: childrens[i].name,
    //           component: () => import('@/views/' + childrens[i].name + '.vue')
    //         })
    //       }
    //     }
    //   }
    // })
//   }
  



// export function resetRouter() {
//     const newRouter = createRouter();
//     router.matcher = newRouter.matcher; // reset router
// }
//导出router

export default router
