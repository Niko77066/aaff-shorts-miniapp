/**
 * Rankings data loader.
 * Pulls rankings.json from TOS with in-memory + storage cache.
 * Falls back to bundled local data if network fails on first launch.
 */

var REMOTE_URL = 'https://aafflist.tos-cn-beijing.volces.com/rankings.json'
var CACHE_KEY = 'rankings_cache_v1'
var CACHE_TS_KEY = 'rankings_cache_ts_v1'
var CACHE_TTL_MS = 10 * 60 * 1000 // 10 min

var _memCache = null

function getLocalFallback() {
  try {
    return require('../data/rankings.js')
  } catch (e) {
    return {}
  }
}

function readStorageCache() {
  try {
    var data = wx.getStorageSync(CACHE_KEY)
    var ts = wx.getStorageSync(CACHE_TS_KEY)
    if (data && ts && (Date.now() - ts < CACHE_TTL_MS)) {
      return data
    }
    return data || null // still return stale as fallback while revalidating
  } catch (e) {
    return null
  }
}

function writeStorageCache(data) {
  try {
    wx.setStorageSync(CACHE_KEY, data)
    wx.setStorageSync(CACHE_TS_KEY, Date.now())
  } catch (e) {
    // ignore quota errors
  }
}

function fetchRemote() {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: REMOTE_URL,
      method: 'GET',
      timeout: 8000,
      success: function(res) {
        if (res.statusCode === 200 && res.data && typeof res.data === 'object') {
          resolve(res.data)
        } else {
          reject(new Error('bad response ' + res.statusCode))
        }
      },
      fail: function(e) { reject(e) }
    })
  })
}

/**
 * loadRankings(options?)
 * options.force = true → skip cache and re-fetch
 * Returns Promise<rankings>
 */
function loadRankings(options) {
  options = options || {}

  if (!options.force && _memCache) {
    return Promise.resolve(_memCache)
  }

  if (!options.force) {
    var cached = readStorageCache()
    if (cached) {
      _memCache = cached
      // kick off background revalidate
      fetchRemote().then(function(fresh) {
        _memCache = fresh
        writeStorageCache(fresh)
      }).catch(function() { /* keep cached */ })
      return Promise.resolve(cached)
    }
  }

  return fetchRemote().then(function(data) {
    _memCache = data
    writeStorageCache(data)
    return data
  }).catch(function(err) {
    console.warn('[data-loader] remote failed, using local fallback', err)
    var fb = getLocalFallback()
    _memCache = fb
    return fb
  })
}

/** Find a single item across all lists by slug. Returns { item, listName } or null. */
function findBySlug(rankings, slug) {
  var keys = Object.keys(rankings || {})
  for (var k = 0; k < keys.length; k++) {
    var list = rankings[keys[k]] || []
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug) {
        return { item: list[i], listName: keys[k] }
      }
    }
  }
  return null
}

module.exports = {
  loadRankings: loadRankings,
  findBySlug: findBySlug,
  REMOTE_URL: REMOTE_URL
}
