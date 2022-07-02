import Vue from "vue"
import Vuex from "vuex"
import login from "./login"
import routes from "./routes"

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    login,
    routes
  }
})