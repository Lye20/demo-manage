import axios from "./axios"

export function loginRequest({ account, password }) {
  return axios.request({
    url: "login",
    method: "POST",
    params: {
      account,
      password
    }
  })
}

export function requestInfo() {
  return axios.request({
    url: "info",
    method: "GET",
  })
}

export function updateInfo(info){
  return axios.request({
    url: "info",
    method: "POST",
    data: info
  })
}

export function changePassword(password){
  return axios.request({
    url: "changePassword",
    method: "POST",
    data: {password}
  })
}

export function getRoutesList() {
  return axios.request({
    url: "routesList",
    method: "GET",
  })
}

export function requestStatisticData() {
  return axios.request({
      url: "statistic",
      method: "GET",
  })
}

export function requestGoods(){
  return axios.request({
    url: "goods",
    method: "GET",
  })
}

export function addGood(good){

  return axios.request({
    url: "addGood",
    method: "POST",
    data: good
  })
}

export function deleteGood(goodId){
  return axios.request({
    url: "deleteGood",
    method: "POST",
    data: {goodId}
  })
}

export function editGood(good){
  return axios.request({
    url: "editGood",
    method: "POST",
    data: good
  })
}

export function requestAdmins(){
  return axios.request({
    url: "admins",
    method: "GET"
  })
}

export function signUpAdmin(admin){
  return axios.request({
    url: "admins",
    method: "POST",
    data: admin
  })
}

export function removeAdmin(account){
  return axios.request({
    url: "removeAdmin",
    method: "POST",
    data: {account}
  })
}

export function resetPassword(account){
  return axios.request({
    url: "resetPassword",
    method: "POST",
    data: {account}
  })
}