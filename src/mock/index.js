import Mock from "mockjs"
import goodsData from "./MockServeData/goodsData"
import homeData from "./MockServeData/homeData"
import loginHandler from "./MockServeData/loginHandler"
import profileData from "./MockServeData/profileData"
import routesListHandler from "./MockServeData/routesListHandler"

Mock.mock("http://localhost/mock/goods/load", "get", goodsData)
Mock.mock("http://localhost/mock/home/load", "get", homeData)
Mock.mock(/http:\/\/localhost\/mock\/login/, "post", loginHandler)
Mock.mock(/http:\/\/localhost\/mock\/profile/, "get", profileData)
Mock.mock("http://localhost/mock/routes", "get", routesListHandler)