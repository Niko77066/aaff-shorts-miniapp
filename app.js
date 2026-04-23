var dataLoader = require('./utils/data-loader.js')

App({
  globalData: {
    userInfo: null,
    statusBarHeight: 0,
    rankingsEndpoint: 'https://aafflist.tos-cn-beijing.volces.com/rankings.json',
    categories: [
      { id: 'annual', name: 'AAFF精选年榜' },
      { id: 'monthly', name: '月榜' },
      { id: 'animation', name: '动画榜' },
      { id: 'weird', name: '怪就怪AI榜' }
    ]
  },

  onLaunch() {
    var windowInfo = wx.getWindowInfo()
    this.globalData.statusBarHeight = windowInfo.statusBarHeight

    // Preload rankings in background (non-blocking)
    dataLoader.loadRankings().catch(function (e) {
      console.warn('[app] preload rankings failed', e)
    })

    // Load Lucide icon font
    wx.loadFontFace({
      global: true,
      family: 'lucide',
      source: 'url("https://aafflist.tos-cn-beijing.volces.com/fonts/lucide.woff2")',
      success() { console.log('[font] lucide loaded') },
      fail(e) { console.warn('[font] lucide CDN failed, using system fallback', e) }
    })
  }
})
