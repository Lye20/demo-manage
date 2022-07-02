export default ({ body }) => {
  const { token } = JSON.parse(body)
  if (token === "1234") {
    return [{
        name: "home",
        path: "/home",
        url: "home",
        meta: {
          title: "主页",
          icon: "el-icon-s-home"
        }
      },
      {
        name: "goods",
        path: "/goods",
        url: "goods",
        meta: {
          title: "商品",
          icon: "el-icon-shopping-cart-2",
        }
      },
      {
        name: "admins",
        path: "/admins",
        url: "admins",
        meta: {
          title: "管理员",
          icon: "el-icon-user",
        }
      },
      {
        meta: {
          title: "其他",
          icon: "el-icon-more",
        },
        children: [{
            name: "other1",
            path: "/other1",
            url: "other/other1",
            meta: {
              title: "其他1",
              icon: "el-icon-document-copy",
            }
          },
          {
            name: "other2",
            path: "/other2",
            url: "other/other2",
            meta: {
              title: "其他2",
              icon: "el-icon-document-checked",
            }
          }
        ]
      }
    ]
  } else if (token === "5678") {

    return [{
        name: "home",
        path: "home",
        url: "home",
        meta: {
          title: "主页",
          icon: "el-icon-s-home"
        }
      },
      {
        name: "goods",
        path: "goods",
        url: "goods",
        meta: {
          title: "商品",
          icon: "el-icon-shopping-cart-2",
        }
      },
      {
        meta: {
          title: "其他",
          icon: "el-icon-more",
        },
        children: [{
            name: "other1",
            path: "/other1",
            url: "other/other1",
            meta: {
              title: "其他1",
              icon: "el-icon-document-copy",
            }
          },
          {
            name: "other2",
            path: "/other2",
            url: "other/other2",
            meta: {
              title: "其他2",
              icon: "el-icon-document-checked",
            }
          }
        ]
      }
    ]
  }
}