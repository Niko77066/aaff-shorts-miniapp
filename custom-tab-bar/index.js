Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "榜单",
        icon: "\ue376"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        icon: "\ue19e"
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
