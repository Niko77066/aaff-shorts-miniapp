const app = getApp()
const rankings = require('../../data/rankings.js')

/* Color palette for CSS gradient backgrounds (no external images) */
var GRADIENT_COLORS = [
  ['#00A896', '#00C9B0'],
  ['#2563eb', '#60a5fa'],
  ['#0891b2', '#22d3ee'],
  ['#ea580c', '#fb923c'],
  ['#059669', '#34d399'],
  ['#d97706', '#fbbf24'],
  ['#0d9488', '#2dd4bf'],
  ['#0891b2', '#22d3ee'],
  ['#0284c7', '#38bdf8'],
  ['#be123c', '#fb7185'],
  ['#15803d', '#4ade80'],
  ['#00A896', '#34d399'],
  ['#0d9488', '#2dd4bf'],
  ['#c2410c', '#fdba74']
]

/* Hero banner gradient presets */
var HERO_GRADIENTS = [
  'linear-gradient(135deg, #0A0F14, #00504A, #003D36)',
  'linear-gradient(135deg, #0A0F14, #0c4a6e, #164e63)',
  'linear-gradient(135deg, #0A0F14, #365314, #3f6212)',
  'linear-gradient(135deg, #0A0F14, #78350f, #92400e)'
]

function formatViews(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '万'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}

function formatDuration(seconds) {
  var s = Math.floor(seconds)
  var m = Math.floor(s / 60)
  var sec = s % 60
  return m + ':' + ('0' + sec).slice(-2)
}

function getApprovalColor(value) {
  if (value >= 95) return '#f43f5e'
  if (value >= 90) return '#FFB800'
  return '#00A896'
}

/* Generate a synthetic approval rating from views + likes */
function calcApproval(item) {
  if (item.likes && item.views && item.views > 0) {
    var raw = Math.min(99, Math.round(80 + (item.likes / item.views) * 500))
    return raw
  }
  return Math.floor(85 + Math.random() * 14) // 85-98 fallback
}

/* Generate tags from platform + duration */
function genTags(item) {
  var tags = []
  if (item.platform === 'youtube') tags.push('YouTube')
  else if (item.platform === 'bilibili') tags.push('B站')
  else if (item.platform) tags.push(item.platform)
  if (item.duration > 300) tags.push('长片')
  else if (item.duration > 0) tags.push('短片')
  return tags
}

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    tabs: ['年榜', '月榜', '动画榜', '怪就怪AI'],
    tabKeys: ['AAFF精选年榜', '月榜', '动画榜', '怪就怪AI榜'],
    tabIcons: ['\ue053', '\ue067', '\ue085', '\ue416'],
    activeMainTab: 0,
    featured: null,
    podiumItems: [],
    rankItems: [],
    refreshing: false,
    hasMore: false
  },

  onLoad() {
    var windowInfo = wx.getWindowInfo()
    var statusBarHeight = windowInfo.statusBarHeight
    var navHeight = statusBarHeight + 44

    this.setData({
      statusBarHeight: statusBarHeight,
      navHeight: navHeight
    })

    this.loadData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  switchMainTab(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    if (index === this.data.activeMainTab) return

    this.setData({ activeMainTab: index })
    this.loadData()
  },

  goToDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  onRefresh() {
    this.setData({ refreshing: true })
    setTimeout(function() {
      this.loadData()
      this.setData({ refreshing: false })
    }.bind(this), 600)
  },

  onLoadMore() {
    // No pagination yet — hasMore is always false
  },

  loadData() {
    var tabKey = this.data.tabKeys[this.data.activeMainTab]
    var items = rankings[tabKey] || []

    /* Build podium (top 3) */
    var podiumItems = items.slice(0, 3).map(function(item, i) {
      return {
        id: item.slug,
        rank: i + 1,
        title: item.original_title || item.title,
        author: item.author,
        score: item.views ? formatViews(item.views) : '-'
      }
    })

    /* Build rank items (all) */
    var rankItems = items.map(function(item, i) {
      var colors = GRADIENT_COLORS[i % GRADIENT_COLORS.length]
      var approval = calcApproval(item)
      return {
        id: item.slug,
        rank: i + 1,
        title: item.original_title || item.title,
        author: item.author,
        score: item.duration ? formatDuration(item.duration) : '',
        approval: approval,
        approvalColor: getApprovalColor(approval),
        views: item.views ? formatViews(item.views) : '-',
        description: item.description || '',
        tags: genTags(item),
        platform: item.platform || '',
        cover: item.cover || '',
        gradientFrom: colors[0],
        gradientTo: colors[1],
        badgeClass: (i + 1) === 1 ? 'badge-gold' : ((i + 1) === 2 ? 'badge-silver' : ((i + 1) === 3 ? 'badge-bronze' : ''))
      }
    })

    /* Featured = first item */
    var first = items[0] || {}
    var featured = items.length > 0 ? {
      title: first.original_title || first.title || '',
      author: first.author || '',
      badge: this.data.tabs[this.data.activeMainTab] + ' TOP 1',
      description: first.description || '',
      gradient: HERO_GRADIENTS[this.data.activeMainTab % HERO_GRADIENTS.length]
    } : null

    this.setData({
      featured: featured,
      podiumItems: podiumItems,
      rankItems: rankItems,
      hasMore: false
    })
  }
})
