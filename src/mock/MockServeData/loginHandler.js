export default function({ body }) {
  const { acount, password } = JSON.parse(body)
  if (!new Set(["tom", "jerry"]).has(acount)) return { status: 403, message: "账号不存在" }
  if (acount === "tom" && password === "tom") {
    return { status: 200, token: "1234" }
  } else if (acount === "jerry" && password === "jerry") {
    return { status: 200, token: "5678" }
  } else return { status: 403, message: "密码错误" }
}