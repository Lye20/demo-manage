import Cookies from "js-cookie"
import axios from "./axios"

export function loadHomeData() {
  if (process.env.NODE_ENV === "development") {
    return axios.request({
      url: "home/load",
      method: "GET",
      data: { token: Cookies.get("token") }
    })
  } else {
    return axios.request({
      url: "home/load",
      method: "GET"
    })
  }
}