import Vue from 'vue'
import App from "./App"
import { router } from "./router"
import store from "./store"
import "./mock"
import { Container, Aside, Header, Footer, Main, Menu, Submenu, MenuItem, MenuItemGroup, Button, Dropdown, DropdownMenu, DropdownItem, Input, Table, TableColumn, Pagination, Dialog, Form, FormItem, Select, Option, Upload, Tag, Card, Col, Row } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/index.css"
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Tag)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)

router.beforeEach((to, from, next) => {
  store.commit("login/GET_TOKEN")
  const token = store.state.login.token
  if (to.name !== "login" && !token) {
    next({ name: "login" })
  } else if (to.name !== "login") {
    if (!store.state.routes.dynamicRoutes.length) store.commit("routes/ADD_DYNAMIC_ROUTES", router)
    if (!store.state.login.profile) store.commit("login/GET_PROFILE", token)
    next()
  } else if (to.name === "login" && token) {
    next({ name: "main" })
  } else {
    next()
  }
})

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})