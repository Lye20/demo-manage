import Vue from "vue"
import Vuex from "vuex"
import Cookies from "js-cookie"
import { getRoutesList } from "@/api"
import { router, resetRouter } from "../router"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    dynamicRoutes: [],
    token: "",
    profile: ""
  },
  getters: {},
  actions: {
    add_dynamic_routes(context) {
      getRoutesList().then(response => {
        context.commit("SET_DYNAMIC_ROUTES", JSON.parse(response.data.routesList))
      }, err => {
        alert("请求失败", err)
      }).catch((err) => alert(err))
    }
  },
  mutations: {
    REMOVE_DYNAMIC_ROUTES(state) {
      state.dynamicRoutes = []
    },
    SET_TOKEN(state, token) {
      Cookies.set("token", token)
    },
    GET_TOKEN(state){
      state.token = Cookies.get('token') || ""
    },
    REMOVE_TOKEN(state) {
      state.token = ""
      Cookies.remove("token")
    }, 
    SET_PROFILE(state, value){
      state.profile = value
    },
    SET_DYNAMIC_ROUTES(state, routesList){
      resetRouter()
      state.dynamicRoutes = routesList
      const temp_routesList = []
      state.dynamicRoutes.forEach(item => {
        if (item.children) temp_routesList.push(...item.children)
        else temp_routesList.push(item)
      })
      temp_routesList.forEach(item => item.component = () =>import (`@/pages/${item.url}`))
      temp_routesList.forEach(item => router.addRoute("main", item))
    }
  }
})