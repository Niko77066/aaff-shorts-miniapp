Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "榜单",
        iconText: "☰"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        iconText: "⊙"
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
