Component({
  data: {
    selected: 1,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "发现",
        icon: "\uD83E\uDDED",
        activeIcon: "\uD83E\uDDED"
      },
      {
        pagePath: "/pages/index/index",
        text: "榜单",
        icon: "\uD83C\uDFC6",
        activeIcon: "\uD83C\uDFC6"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        icon: "\uD83D\uDC64",
        activeIcon: "\uD83D\uDC64"
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
