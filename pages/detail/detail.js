Page({
  data: {
    info: {},
    relatedItems: []
  },

  onLoad(options) {
    var id = options.id || 'top_0'
    this.loadDetail(id)
  },

  loadDetail(id) {
    var info = {
      id: id,
      title: '消逝的记忆 — 当AI学会遗忘',
      cover: 'https://picsum.photos/seed/' + id + '/800/500',
      author: 'CyberArt Studio',
      authorAvatar: 'https://picsum.photos/seed/avatar_detail/100/100',
      authorDesc: 'AI视觉艺术创作者 | 10.2万粉丝',
      score: '9.5',
      duration: '3:42',
      playCountText: '32.8万',
      likeCount: '2.1万',
      commentCount: '3,652',
      shareCount: '1,284',
      tags: ['科幻', '剧情', '实验'],
      aiTool: 'Sora',
      aiModel: 'Sora v2.0',
      rankPosition: 1,
      rankListName: 'AI短片 · 周榜',
      description: '在一个AI已经深度融入人类生活的近未来，主人公发现自己珍贵的记忆正在被逐渐"优化"。这部短片探讨了在人工智能时代，记忆、身份与人性之间的微妙关系。使用Sora生成的视觉效果营造出一种既熟悉又陌生的氛围，挑战观众对现实与虚拟边界的认知。'
    }

    var relatedItems = []
    var titles = ['星际迷航2077', '最后一个画师', '数字花园', '虚拟黄昏', '机器之心']
    for (var i = 0; i < 5; i++) {
      relatedItems.push({
        id: 'related_' + i,
        title: titles[i],
        cover: 'https://picsum.photos/seed/related' + i + '/400/300',
        score: (9.3 - i * 0.2).toFixed(1)
      })
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
    wx.showToast({ title: '播放功能开发中', icon: 'none' })
  },
  onShareAppMessage() {
    return {
      title: this.data.info.title,
      path: '/pages/detail/detail?id=' + this.data.info.id
    }
  }
})
