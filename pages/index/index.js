const app = getApp()

/* Color palette for CSS gradient backgrounds (no external images) */
var GRADIENT_COLORS = [
  ['#7c3aed', '#a78bfa'],
  ['#2563eb', '#60a5fa'],
  ['#db2777', '#f472b6'],
  ['#ea580c', '#fb923c'],
  ['#059669', '#34d399'],
  ['#d97706', '#fbbf24'],
  ['#7c3aed', '#c084fc'],
  ['#0891b2', '#22d3ee'],
  ['#4f46e5', '#818cf8'],
  ['#be123c', '#fb7185'],
  ['#15803d', '#4ade80'],
  ['#9333ea', '#c084fc'],
  ['#0d9488', '#2dd4bf'],
  ['#c2410c', '#fdba74']
]

function getApprovalColor(value) {
  if (value >= 95) return '#f43f5e'
  if (value >= 90) return '#f59e0b'
  return '#60a5fa'
}

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    activeMainTab: 0,
    topItems: [],
    rankItems: [],
    refreshing: false,
    hasMore: true,
    page: 1,
    avatarLetter: 'U'
  },

  onLoad() {
    var sysInfo = wx.getSystemInfoSync()
    var statusBarHeight = sysInfo.statusBarHeight
    var navHeight = statusBarHeight + 44

    this.setData({
      statusBarHeight: statusBarHeight,
      navHeight: navHeight
    })

    this.loadMockData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  switchMainTab(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    if (index === this.data.activeMainTab) return

    this.setData({
      activeMainTab: index,
      page: 1,
      hasMore: true
    })

    this.loadMockData()
  },

  goToDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  onRefresh() {
    this.setData({ refreshing: true, page: 1 })
    setTimeout(function() {
      this.loadMockData()
      this.setData({ refreshing: false })
    }.bind(this), 1000)
  },

  onLoadMore() {
    if (!this.data.hasMore) return
    this.setData({ page: this.data.page + 1 })
    if (this.data.page >= 3) {
      this.setData({ hasMore: false })
    }
  },

  loadMockData() {
    var isShorts = this.data.activeMainTab === 0

    var shortFilms = [
      { id: 'sf1', title: 'Cyberpunk Cityscape', author: 'NeonDreams', score: 98.5, approval: 99, views: '1.2M', gradientIdx: 0, tags: ['Sci-Fi', '3D'], description: '绝美的赛博朋克视觉盛宴，每一帧都可以作为壁纸，光影效果令人惊叹。' },
      { id: 'sf2', title: 'The Last Astronaut', author: 'SpaceXplorer', score: 97.2, approval: 96, views: '980K', gradientIdx: 1, tags: ['Space', 'Realistic'], description: '孤独与浩瀚宇宙的完美结合，配乐极其震撼，让人感受到宇宙的深邃。' },
      { id: 'sf3', title: "Ocean's Whisper", author: 'DeepBlue', score: 95.8, approval: 94, views: '850K', gradientIdx: 2, tags: ['Nature', 'Fantasy'], description: '仿佛潜入深海，感受到了海洋生物的神秘低语，治愈系神作。' },
      { id: 'sf4', title: 'Mechanical Heart', author: 'RoboArt', score: 94.1, approval: 91, views: '720K', gradientIdx: 3, tags: ['Steampunk', '2D'], description: '蒸汽朋克风格的巅峰之作，机械设定非常硬核，细节满满。' },
      { id: 'sf5', title: 'Neon Samurai', author: 'BladeRunner', score: 93.5, approval: 89, views: '650K', gradientIdx: 4, tags: ['Action', 'Cyberpunk'], description: '动作设计行云流水，霓虹光影效果拉满，打击感十足。' },
      { id: 'sf6', title: 'Echoes of Time', author: 'ChronoVisuals', score: 92.8, approval: 87, views: '540K', gradientIdx: 5, tags: ['Sci-Fi', 'Drama'], description: '时间旅行的悖论被完美演绎，结局令人唏嘘。' },
      { id: 'sf7', title: 'Desert Mirage', author: 'SandStorm', score: 91.5, approval: 85, views: '420K', gradientIdx: 6, tags: ['Adventure', '3D'], description: '极具异域风情的视觉体验，沙丘的质感无比真实。' }
    ]

    var shortDramas = [
      { id: 'sd1', title: 'AI Awakening: Ep 1', author: 'FutureStudios', score: 99.1, approval: 98, views: '2.5M', gradientIdx: 7, tags: ['Drama', 'Series'], description: '剧情反转再反转，AI觉醒的主题发人深省，全员演技在线。' },
      { id: 'sd2', title: 'Virtual Reality Love', author: 'RomanceAI', score: 98.4, approval: 95, views: '1.8M', gradientIdx: 8, tags: ['Romance', 'VR'], description: '虚拟与现实的交织，让人分不清哪边才是真爱，情感刻画细腻。' },
      { id: 'sd3', title: "The Algorithm's Choice", author: 'SciFiDaily', score: 96.7, approval: 93, views: '1.4M', gradientIdx: 9, tags: ['Thriller', 'Tech'], description: '节奏紧凑，悬疑感营造得非常到位，期待下一集的剧情走向！' },
      { id: 'sd4', title: 'Digital Ghosts', author: 'HorrorGen', score: 95.2, approval: 90, views: '1.1M', gradientIdx: 10, tags: ['Horror', 'Mystery'], description: '数字幽灵的概念很新颖，氛围渲染得让人毛骨悚然，深夜慎点。' },
      { id: 'sd5', title: 'Silicon Valley 2050', author: 'TechTales', score: 94.8, approval: 88, views: '900K', gradientIdx: 11, tags: ['Comedy', 'Future'], description: '对未来科技公司的讽刺喜剧，笑点密集且高级，极具现实意义。' },
      { id: 'sd6', title: 'Mars Colony', author: 'RedPlanet', score: 93.2, approval: 86, views: '850K', gradientIdx: 12, tags: ['Sci-Fi', 'Survival'], description: '火星生存的艰难与人性的光辉交织，硬核科幻短剧。' },
      { id: 'sd7', title: 'The Last Cafe', author: 'UrbanTales', score: 92.1, approval: 84, views: '760K', gradientIdx: 13, tags: ['Slice of Life', 'Drama'], description: '末日背景下的温馨日常，一杯咖啡带来的治愈时光。' }
    ]

    var currentData = isShorts ? shortFilms : shortDramas

    /* Build top 3 for podium */
    var topItems = currentData.slice(0, 3).map(function(item, i) {
      var colors = GRADIENT_COLORS[item.gradientIdx % GRADIENT_COLORS.length]
      return {
        id: item.id,
        author: item.author,
        score: item.score,
        initial: item.author.charAt(0),
        gradientFrom: colors[0],
        gradientTo: colors[1]
      }
    })

    /* Build all items for leaderboard cards */
    var rankItems = currentData.map(function(item, i) {
      var colors = GRADIENT_COLORS[item.gradientIdx % GRADIENT_COLORS.length]
      return {
        id: item.id,
        rank: i + 1,
        title: item.title,
        author: item.author,
        score: item.score,
        approval: item.approval,
        approvalColor: getApprovalColor(item.approval),
        views: item.views,
        gradientFrom: colors[0],
        gradientTo: colors[1],
        tags: item.tags,
        description: item.description,
        badgeClass: i === 0 ? 'badge-gold' : (i === 1 ? 'badge-silver' : (i === 2 ? 'badge-bronze' : ''))
      }
    })

    this.setData({ topItems: topItems, rankItems: rankItems })
  }
})
