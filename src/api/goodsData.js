import axios from "./axios"


export function loadGoodsData() {
  return axios.request({
    url: "goods/load",
    method: "GET"
  })

}

export function updateGoodsData(goodsData) {
  return axios.request({
    url: "goods/clear",
    method: "POST"
  }).then(async response => {
    if (response.data !== "OK") {
      throw new Error("数据库初始化失败")
    } else {
      let response
      try {
        for (let good of goodsData) {
          response = await axios({
            url: "goods/update",
            method: "POST",
            data: good
          })
        }
      } catch {
        throw new Error("数据上传失败")
      }
      return response
    }
  })
}