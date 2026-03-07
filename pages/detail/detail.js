const rankings = require('../../data/rankings.json')

/* Color palette for related items */
var RELATED_GRADIENTS = [
  ['#db2777', '#f472b6'],
  ['#ea580c', '#fb923c'],
  ['#059669', '#34d399'],
  ['#d97706', '#fbbf24'],
  ['#4f46e5', '#818cf8']
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
function findBySlug(slug) {
  var keys = Object.keys(rankings)
  for (var k = 0; k < keys.length; k++) {
    var list = rankings[keys[k]]
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
    relatedItems: []
  },

  onLoad(options) {
    var slug = options.id || ''
    this.loadDetail(slug)
  },

  loadDetail(slug) {
    var result = findBySlug(slug)
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
      coverGradient: 'linear-gradient(135deg, #7c3aed, #2563eb)',
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
    if (this.data.info.sourceUrl) {
      wx.setClipboardData({
        data: this.data.info.sourceUrl,
        success: function() {
          wx.showToast({ title: '链接已复制', icon: 'success' })
        }
      })
    } else {
      wx.showToast({ title: '播放功能开发中', icon: 'none' })
    }
  },
  onShareAppMessage() {
    return {
      title: this.data.info.title,
      path: '/pages/detail/detail?id=' + this.data.info.id
    }
  }
})
