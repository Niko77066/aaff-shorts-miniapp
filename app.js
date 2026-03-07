App({
  globalData: {
    userInfo: null,
    apiBase: 'https://api.aaff.com',
    statusBarHeight: 0,
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

    // Load Lucide icon font
    wx.loadFontFace({
      global: true,
      family: 'lucide',
      source: 'url("https://unpkg.com/lucide-static@0.473.0/font/lucide.woff2")',
      success() { console.log('[font] lucide loaded') },
      fail(e) { console.warn('[font] lucide failed', e) }
    })

    // Load Inter font (400 + 700)
    wx.loadFontFace({
      global: true,
      family: 'Inter',
      source: 'url("https://fonts.gstatic.com/s/inter/v21/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.woff2")',
      desc: { weight: '400' },
      success() { console.log('[font] Inter 400 loaded') },
      fail(e) { console.warn('[font] Inter 400 failed', e) }
    })
    wx.loadFontFace({
      global: true,
      family: 'Inter',
      source: 'url("https://fonts.gstatic.com/s/inter/v21/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.woff2")',
      desc: { weight: '700' },
      success() { console.log('[font] Inter 700 loaded') },
      fail(e) { console.warn('[font] Inter 700 failed', e) }
    })
  }
})
