Page({
  data: {
    type: 'shorts',
    sub: 'weekly',
    filters: [
      { id: 'all', name: '全部' },
      { id: 'sora', name: 'Sora' },
      { id: 'runway', name: 'Runway' },
      { id: 'kling', name: 'Kling' },
      { id: 'pika', name: 'Pika' },
      { id: 'luma', name: 'Luma' }
    ],
    activeFilter: 0,
    sortLabel: '按评分',
    totalCount: 50,
    items: [],
    hasMore: true,
    page: 1
  },

  onLoad(options) {
    var type = options.type || 'shorts'
    var sub = options.sub || 'weekly'
    var titleMap = { shorts: 'AI短片', drama: 'AI短剧' }
    var subMap = { weekly: '周榜', monthly: '月榜', annual: '年榜' }

    wx.setNavigationBarTitle({
      title: (titleMap[type] || 'AI短片') + (subMap[sub] || '周榜')
    })

    this.setData({ type: type, sub: sub })
    this.loadItems()
  },

  switchFilter(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    this.setData({ activeFilter: index, items: [], page: 1 })
    this.loadItems()
  },

  toggleSort() {
    var labels = ['按评分', '按播放量', '按时间']
    var current = labels.indexOf(this.data.sortLabel)
    var next = (current + 1) % labels.length
    this.setData({ sortLabel: labels[next], items: [], page: 1 })
    this.loadItems()
  },

  onItemTap(e) {
    var id = e.detail.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  onLoadMore() {
    if (!this.data.hasMore) return
    this.setData({ page: this.data.page + 1 })
    if (this.data.page > 3) {
      this.setData({ hasMore: false })
      return
    }
    this.loadItems()
  },

  loadItems() {
    var isShorts = this.data.type === 'shorts'
    var titles = isShorts
      ? ['消逝的记忆', '星际迷航2077', '最后一个画师', '数字花园', '虚拟黄昏', '机器之心', '量子玫瑰', '平行世界的你', '赛博朋克日记', '未来简史', '像素之梦', '代码诗人', '光影之间', '纳米花园', '虚空行者']
      : ['AI都市传说', '虚拟偶像计划', '代码情书', '数字永生', '芯片之梦', '人工之恋', '未来日记', '智能觉醒', '镜中世界', '时间旅客', '算法之恋', '深蓝梦境', '数据幽灵', '神经漫游', '量子恋人']
    var authors = ['CyberArt', 'AIVision', 'PixelDream', 'NeuralFilm', 'DeepFrame', 'VoidStudio', 'ByteMotion', 'SynthWave', 'DreamMaker', 'FutureEye', 'LoopLab', 'DigiSoul', 'NeonMind', 'VoxelArts', 'CloudEyes']
    var tagSets = [['科幻','Sora'],['剧情','Runway'],['实验','Pika'],['动画','Kling'],['悬疑','Sora'],['温情','Luma'],['赛博','Runway'],['奇幻','Kling'],['文艺','Pika'],['冒险','Sora'],['科幻','Luma'],['哲思','Runway'],['奇幻','Pika'],['悬疑','Kling'],['爱情','Sora']]

    var start = (this.data.page - 1) * 15
    var newItems = []
    for (var i = 0; i < 15 && (start + i) < 50; i++) {
      var idx = (start + i) % titles.length
      newItems.push({
        id: 'item_' + (start + i),
        rank: start + i + 1,
        title: titles[idx],
        cover: 'https://picsum.photos/seed/aaff' + (start + i + 20) + '/600/400',
        author: authors[idx],
        score: (9.5 - (start + i) * 0.08).toFixed(1),
        playCountText: (Math.random() * 50 + 5).toFixed(1) + '万',
        tags: tagSets[idx],
        trend: Math.random() > 0.5 ? 1 : (Math.random() > 0.5 ? -1 : 0),
        trendText: String(Math.floor(Math.random() * 5))
      })
    }

    this.setData({
      items: this.data.page === 1 ? newItems : this.data.items.concat(newItems)
    })
  }
})
