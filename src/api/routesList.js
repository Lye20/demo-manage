import Cookies from "js-cookie"
import axios from "./axios"

export function getRoutesList() {
  if (process.env.NODE_ENV === "development") {
    return axios.request({
      url: "routes",
      method: "GET",
      data: {
        token: Cookies.get("token")
      }
    })
  } else {
    return axios.request({
      url: "routes",
      method: "GET"
    })
  }
}