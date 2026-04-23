const dataLoader = require('../../utils/data-loader.js')

/* Color palette for related items */
var RELATED_GRADIENTS = [
  ['#00A896', '#00C9B0'],
  ['#ea580c', '#fb923c'],
  ['#059669', '#34d399'],
  ['#d97706', '#fbbf24'],
  ['#0891b2', '#22d3ee']
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

/* Find an item by slug across all rankings */
function findBySlugIn(rankings, slug) {
  var keys = Object.keys(rankings || {})
  for (var k = 0; k < keys.length; k++) {
    var list = rankings[keys[k]] || []
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug) {
        return { item: list[i], listName: keys[k], rank: list[i].rank }
      }
    }
  }
  return null
}

Page({
  data: {
    info: {},
    relatedItems: [],
    isPlaying: false
  },

  onLoad(options) {
    var slug = options.id || ''
    var self = this
    dataLoader.loadRankings().then(function(rankings) {
      self._rankings = rankings
      self.loadDetail(slug)
    }).catch(function() {
      wx.showToast({ title: '加载失败，请重试', icon: 'none' })
    })
  },

  loadDetail(slug) {
    var rankings = this._rankings || {}
    var result = findBySlugIn(rankings, slug)
    if (!result) {
      wx.showToast({ title: '未找到该作品', icon: 'none' })
      return
    }

    var item = result.item
    var title = item.original_title || item.title
    var author = item.author || ''

    var info = {
      id: item.slug,
      title: title,
      coverGradient: 'linear-gradient(135deg, #00A896, #00C9B0)',
      author: author,
      authorInitial: author ? author[0] : '?',
      authorDesc: item.platform ? '来自 ' + item.platform : '',
      score: item.views ? formatViews(item.views) : '-',
      duration: item.duration ? formatDuration(item.duration) : '-',
      playCountText: item.views ? formatViews(item.views) : '-',
      likeCount: item.likes ? formatViews(item.likes) : '-',
      commentCount: '-',
      shareCount: '-',
      tags: [item.platform || 'AI'].filter(Boolean),
      aiTool: '-',
      aiModel: '-',
      rankPosition: result.rank,
      rankListName: result.listName,
      description: item.description || '',
      sourceUrl: item.source_url || '',
      video: item.video || '',
      cover: item.cover || ''
    }

    /* Build related items from same list */
    var listItems = rankings[result.listName] || []
    var relatedItems = []
    for (var i = 0; i < listItems.length && relatedItems.length < 5; i++) {
      if (listItems[i].slug !== slug) {
        var ri = listItems[i]
        var colors = RELATED_GRADIENTS[relatedItems.length % RELATED_GRADIENTS.length]
        relatedItems.push({
          id: ri.slug,
          title: ri.original_title || ri.title,
          gradientFrom: colors[0],
          gradientTo: colors[1],
          score: ri.views ? formatViews(ri.views) : '-'
        })
      }
    }

    this.setData({ info: info, relatedItems: relatedItems })
  },

  goToRelated(e) {
    var id = e.currentTarget.dataset.id
    wx.redirectTo({ url: '/pages/detail/detail?id=' + id })
  },

  goToAuthor() {
    wx.showToast({ title: '作者主页开发中', icon: 'none' })
  },

  onLike() {
    wx.showToast({ title: '已点赞', icon: 'success' })
  },
  onComment() {
    wx.showToast({ title: '评论功能开发中', icon: 'none' })
  },
  onShare() {
    return {
      title: this.data.info.title,
      path: '/pages/detail/detail?id=' + this.data.info.id
    }
  },
  onPlay() {
    if (!this.data.info.video) {
      wx.showToast({ title: '视频源缺失', icon: 'none' })
      return
    }
    this.setData({ isPlaying: true })
  },
  onVideoPlay() {
    // placeholder for analytics hook
  },
  onVideoError(e) {
    console.warn('[detail] video error', e && e.detail)
    wx.showToast({ title: '视频加载失败', icon: 'none' })
    this.setData({ isPlaying: false })
  },
  onShareAppMessage() {
    return {
      title: this.data.info.title,
      path: '/pages/detail/detail?id=' + this.data.info.id
    }
  }
})
