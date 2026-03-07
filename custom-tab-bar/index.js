Component({
  data: {
    selected: 1,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "发现",
        icon: "\ue09b"
      },
      {
        pagePath: "/pages/index/index",
        text: "榜单",
        icon: "\ue04f"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        icon: "\ue461"
      }
    ]
  },

  methods: {
    switchTab(e) {
      var index = e.currentTarget.dataset.index
      var item = this.data.list[index]
      wx.switchTab({ url: item.pagePath })
    }
  }
})
