import Cookies from "js-cookie"
import { getProfile } from "../api/loginRequest"
export default {
  namespaced: true,
  state: {
    token: "",
    profile: ""
  },
  getters: {},
  actions: {},
  mutations: {
    ADD_TOKEN(state, token) {
      state.token = token
      state.token = Cookies.set("token", token)
    },
    GET_TOKEN(state) {
      state.token = Cookies.get("token") || ""
    },
    REMOVE_TOKEN(state) {
      state.token = ""
      Cookies.remove("token")
    },
    GET_PROFILE(state, token) {
      getProfile(token).then(response => {
        state.profile = response.data.profile
      })
    }
  },
}