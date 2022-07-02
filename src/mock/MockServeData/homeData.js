import { Random } from "mockjs";

export default ({ body }) => {
  const { token } = JSON.parse(body)
  let salesData = {
    category: ["computer", "phone", "book"],
    data: {}
  }
  let staffsData = {
    name: ["tom", "jerry"],
    data: {}
  }
  for (let i = 1; i <= 12; i++) {
    let month = i < 10 ? `0${i}` : i.toString()
    salesData.data[`2021-${month}`] = [
      { category: "computer", sales: Random.float(500000, 1000000, 2, 2), totalOrders: Random.integer(100, 200) },
      { category: "phone", sales: Random.float(300000, 600000, 2, 2), totalOrders: Random.integer(100, 200) },
      { category: "book", sales: Random.float(100000, 200000, 2, 2), totalOrders: Random.integer(300, 500) }
    ]
    if (token === "1234") {
      staffsData.data[`2021-${month}`] = [
        { name: "tom", onlineTime: Random.float(240, 360, 2, 2), dpi: Random.float(0, 10, 2, 2) },
        { name: "jerry", onlineTime: Random.float(240, 360, 2, 2), dpi: Random.float(0, 10, 2, 2) }
      ]
    }
  }
  if (token === "1234") {
    return { salesData, staffsData }
  } else if (token === "5678") {
    return { salesData }
  }
}