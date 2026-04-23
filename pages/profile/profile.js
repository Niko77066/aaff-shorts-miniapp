var app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    userInfo: {
      name: '',
      avatar: '',
      desc: ''
    },
    stats: {
      watched: 128,
      liked: 56,
      collected: 23
    }
  },

  onLoad() {
    var windowInfo = wx.getWindowInfo()
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight
    })
    try {
      var saved = wx.getStorageSync('userInfo')
      if (saved && saved.name) {
        this.setData({ userInfo: saved })
        if (app && app.globalData) app.globalData.userInfo = saved
      }
    } catch (e) {}
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }

    var userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({ userInfo: userInfo })
    }
  },

  onAvatarTap() {
    // 已登录不做事
  },

  onChooseAvatar(e) {
    var avatarUrl = e.detail.avatarUrl
    var current = this.data.userInfo || {}
    var next = {
      name: current.name || '',
      avatar: avatarUrl,
      desc: current.desc || 'AI视频爱好者'
    }
    this.setData({ userInfo: next })
    try { wx.setStorageSync('userInfo', next) } catch (e) {}
    if (app && app.globalData) app.globalData.userInfo = next
  },

  onNicknameInput(e) {
    var name = (e.detail.value || '').trim()
    if (!name) return
    var current = this.data.userInfo || {}
    var next = {
      name: name,
      avatar: current.avatar || '',
      desc: current.desc || 'AI视频爱好者'
    }
    this.setData({ userInfo: next })
    try { wx.setStorageSync('userInfo', next) } catch (e) {}
    if (app && app.globalData) app.globalData.userInfo = next
  },

  goTo(e) {
    var page = e.currentTarget.dataset.page
    var pageMap = {
      submit: '提交作品',
      about: '关于 Arklink',
      feedback: '意见反馈',
      settings: '设置',
      history: '观看历史',
      favorites: '我的收藏',
      likes: '我的点赞'
    }
    wx.showToast({
      title: (pageMap[page] || page) + '开发中',
      icon: 'none'
    })
  }
})
