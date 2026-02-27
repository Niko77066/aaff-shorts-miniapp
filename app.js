App({
  globalData: {
    userInfo: null,
    apiBase: 'https://api.aaff.com',
    statusBarHeight: 0,
    categories: {
      shorts: [
        { id: 'weekly', name: '周榜', icon: '🔥' },
        { id: 'monthly', name: '月榜', icon: '🌟' },
        { id: 'annual', name: '年榜', icon: '🏆' },
        { id: 'newbie', name: '新人榜', icon: '🌱' }
      ],
      drama: [
        { id: 'weekly', name: '周榜', icon: '🔥' },
        { id: 'monthly', name: '月榜', icon: '🌟' },
        { id: 'annual', name: '年榜', icon: '🏆' },
        { id: 'popular', name: '人气榜', icon: '❤' }
      ]
    }
  },

  onLaunch() {
    const sysInfo = wx.getSystemInfoSync()
    this.globalData.statusBarHeight = sysInfo.statusBarHeight
  }
})
