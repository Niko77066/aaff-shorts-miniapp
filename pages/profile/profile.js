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
    var sysInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }

    var userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({ userInfo: userInfo })
    }
  },

  onAvatarTap() {
    if (this.data.userInfo.name) return

    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: function(res) {
        var userInfo = {
          name: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl,
          desc: 'AI视频爱好者'
        }
        app.globalData.userInfo = userInfo
        this.setData({ userInfo: userInfo })
      }.bind(this),
      fail: function() {
        wx.showToast({ title: '登录已取消', icon: 'none' })
      }
    })
  },

  goTo(e) {
    var page = e.currentTarget.dataset.page
    var pageMap = {
      submit: '提交作品',
      about: '关于AAFF',
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
