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
      success() { console.log('[font] Inter 400 loaded') }
    })
    wx.loadFontFace({
      global: true,
      family: 'Inter',
      source: 'url("https://fonts.gstatic.com/s/inter/v21/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.woff2")',
      desc: { weight: '700' },
      success() { console.log('[font] Inter 700 loaded') }
    })
  }
})
