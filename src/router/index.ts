import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Index from "../views/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    redirect: to => {
      const { hash, params, query } = to
      // 根据hash，或者params,或者query，或者其他条件进行判断，return要去的路径
      return { path: '/home' } 
    },
 
    component: Index,
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },

      {
        path: "/PictureToolsView",
        name: "PictureToolsView",
        component: () =>
          import( "../views/PictureToolsView.vue"),
      },
      {
        path: "/test",
        name: "test",
        component: () =>
          import( "../views/TestView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
