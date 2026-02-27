const app = getApp()

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    activeMainTab: 0,
    activeSubTab: 0,
    subTabs: [],
    periodText: '本周',
    updateTime: '2小时前',
    topItems: [],
    rankItems: [],
    refreshing: false,
    hasMore: true,
    page: 1
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    const statusBarHeight = sysInfo.statusBarHeight
    const navHeight = statusBarHeight + 44

    this.setData({
      statusBarHeight,
      navHeight,
      subTabs: app.globalData.categories.shorts
    })

    this.loadMockData()
  },

  switchMainTab(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    if (index === this.data.activeMainTab) return

    const categories = index === 0
      ? app.globalData.categories.shorts
      : app.globalData.categories.drama

    this.setData({
      activeMainTab: index,
      activeSubTab: 0,
      subTabs: categories
    })

    this.loadMockData()
  },

  switchSubTab(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    if (index === this.data.activeSubTab) return

    const periodMap = { 0: '本周', 1: '本月', 2: '年度', 3: this.data.activeMainTab === 0 ? '新人' : '人气' }

    this.setData({
      activeSubTab: index,
      periodText: periodMap[index] || '本周'
    })

    this.loadMockData()
  },

  goToRankList() {
    const type = this.data.activeMainTab === 0 ? 'shorts' : 'drama'
    const sub = this.data.subTabs[this.data.activeSubTab].id
    wx.navigateTo({
      url: '/pages/rankList/rankList?type=' + type + '&sub=' + sub
    })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  onSearchTap() {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' })
  },

  onRefresh() {
    this.setData({ refreshing: true, page: 1 })
    setTimeout(() => {
      this.loadMockData()
      this.setData({ refreshing: false })
    }, 1000)
  },

  onLoadMore() {
    if (!this.data.hasMore) return
    this.setData({ page: this.data.page + 1 })
    if (this.data.page >= 3) {
      this.setData({ hasMore: false })
    }
  },

  loadMockData() {
    const isShorts = this.data.activeMainTab === 0

    const mockCovers = [
      'https://picsum.photos/seed/aaff1/600/400',
      'https://picsum.photos/seed/aaff2/600/400',
      'https://picsum.photos/seed/aaff3/600/400',
      'https://picsum.photos/seed/aaff4/600/400',
      'https://picsum.photos/seed/aaff5/600/400',
      'https://picsum.photos/seed/aaff6/600/400',
      'https://picsum.photos/seed/aaff7/600/400',
      'https://picsum.photos/seed/aaff8/600/400',
      'https://picsum.photos/seed/aaff9/600/400',
      'https://picsum.photos/seed/aaff10/600/400'
    ]

    var titles = isShorts
      ? ['消逝的记忆', '星际迷航2077', '最后一个画师', '数字花园', '虚拟黄昏', '机器之心', '量子玫瑰', '平行世界的你', '赛博朋克日记', '未来简史']
      : ['AI都市传说', '虚拟偶像计划', '代码情书', '数字永生', '芯片之梦', '人工之恋', '未来日记', '智能觉醒', '镜中世界', '时间旅客']

    var authors = ['CyberArt', 'AIVision', 'PixelDream', 'NeuralFilm', 'DeepFrame', 'VoidStudio', 'ByteMotion', 'SynthWave', 'DreamMaker', 'FutureEye']
    var tagSets = [
      ['科幻', 'Sora'],
      ['剧情', 'Runway'],
      ['实验', 'Pika'],
      ['动画', 'Kling'],
      ['悬疑', 'Sora'],
      ['温情', 'Luma'],
      ['赛博', 'Runway'],
      ['奇幻', 'Kling'],
      ['文艺', 'Pika'],
      ['冒险', 'Sora']
    ]

    var topItems = []
    for (var i = 0; i < 3; i++) {
      topItems.push({
        id: 'top_' + i,
        title: titles[i],
        cover: mockCovers[i],
        author: authors[i],
        authorAvatar: 'https://picsum.photos/seed/avatar' + i + '/100/100',
        score: (9.5 - i * 0.3).toFixed(1),
        playCountText: (Math.random() * 50 + 10).toFixed(1) + '万',
        duration: isShorts ? (Math.floor(Math.random() * 5 + 1) + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0')) : (Math.floor(Math.random() * 8 + 3) + '集'),
        tags: tagSets[i],
        trend: i === 0 ? 0 : (Math.random() > 0.5 ? 1 : -1),
        trendText: i === 0 ? '冠军' : String(Math.floor(Math.random() * 5 + 1))
      })
    }

    var rankItems = []
    for (var j = 0; j < 10; j++) {
      rankItems.push({
        id: 'rank_' + j,
        rank: j + 1,
        title: titles[j],
        cover: mockCovers[j],
        author: authors[j],
        score: (9.5 - j * 0.2).toFixed(1),
        playCountText: (Math.random() * 50 + 5).toFixed(1) + '万',
        tags: tagSets[j],
        trend: j < 3 ? (Math.random() > 0.3 ? 1 : 0) : (Math.random() > 0.5 ? 1 : -1),
        trendText: j < 3 ? String(Math.floor(Math.random() * 3)) : String(Math.floor(Math.random() * 5 + 1))
      })
    }

    this.setData({ topItems: topItems, rankItems: rankItems })
  }
})
