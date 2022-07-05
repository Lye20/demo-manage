import axios from "axios"
import Cookies from "js-cookie"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const defaultConfig = {
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080/api" : "http://81.71.159.103:8080/api",
  header: {},
  timeout: 3000
}

NProgress.configure({ trickle: false, showSpinner: false })

let loadingNum = 0;

function startLoading() {
  if (loadingNum == 0) {
    NProgress.start()
  }
  loadingNum++;
}

function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

class HttpRequest {
  constructor(config) {
    this.defaultConfig = config
  }
  interceptors(instance) {
    instance.interceptors.request.use(config => {
      startLoading()
      let token = Cookies.get("token")
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })
    instance.interceptors.response.use(response => {
      endLoading()
      return response
    })
  }

  request(config) {
    const instance = axios.create()
    this.interceptors(instance)
    return instance({...this.defaultConfig, ...config })
  }
}

export default new HttpRequest(defaultConfig)