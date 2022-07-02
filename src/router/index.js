import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

export const constRoutes = {
  mode: "hash",
  routes: [{
      name: "main",
      path: "/",
      redirect: "/home",
      component: () =>
        import ("../pages/main"),
    },
    {
      name: "login",
      path: "/login",
      component: () =>
        import ("../pages/login")
    },
  ]
}

export const router = new VueRouter(constRoutes)

export const resetRouter = () => {
  router.matcher = new VueRouter(constRoutes).matcher
}