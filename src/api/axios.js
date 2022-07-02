import axios from "axios"
import Cookies from "js-cookie"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const defaultConfig = {
  baseURL: (process.env.NODE_ENV === "production") ? "http://localhost:80/api" : "http://localhost/mock",
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
      if (token) config.header.Authorization = token
      return config
    }, err => {
      return Promise.reject(err)
    })
    instance.interceptors.response.use(response => {
      endLoading()
      return response
    }, err => {
      endLoading()
      return Promise.reject(err)
    })
  }

  request(config) {
    const instance = axios.create()
    this.interceptors(instance)
    return instance({...this.defaultConfig, ...config })
  }
}

export default new HttpRequest(defaultConfig)