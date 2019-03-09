const axios = require('axios')

// 一言
const hitokotoApi = 'https://v1.hitokoto.cn'
exports.getHitokoto = function() {
  const types = [
    'a', // anime
    'b', // comic
    'c', // game
    'd', // novel
  ]

  const c = types[Math.floor(Math.random() * types.length)]

  return axios.get(hitokotoApi, {
    params: {
      c,
      encode: 'json',
      charset: 'utf-8'
    }
  })
}
