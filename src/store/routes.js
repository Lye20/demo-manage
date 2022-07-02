import { getRoutesList } from "../api/routesList"
export default {
  namespaced: true,
  state: {
    dynamicRoutes: []
  },
  getters: {},
  actions: {},
  mutations: {
    ADD_DYNAMIC_ROUTES(state, router) {
      getRoutesList().then(
        response => {
          state.dynamicRoutes = response.data
          const routesList = []
          state.dynamicRoutes.forEach(item => {
            if (item.children) routesList.push(...item.children)
            else routesList.push(item)
          })
          routesList.forEach(item => item.component = () =>import (`@/pages/${item.url}`))
          routesList.forEach(item => router.addRoute("main", item))
        },
        err => {
          alert("请求失败", err)
        }).catch((err) => alert(err))
    },
    REMOVE_DYNAMIC_ROUTES(state) {
      state.dynamicRoutes = []
    }
  }
}