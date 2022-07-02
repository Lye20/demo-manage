import axios from "./axios"

export function loginRequest({ acount, password }) {
  return axios.request({
    url: "login",
    method: "POST",
    data: {
      acount,
      password
    }
  })
}

export function getProfile(token) {
  return axios.request({
    url: "profile",
    method: "GET",
    data: { token }
  })
}