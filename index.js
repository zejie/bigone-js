const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const API = {
  MARKET_URL: "https://b1.run/api/v2",
}
const BIGONE = {}
let config = {
  key: '',
  secret: ''
}

// Init config
BIGONE.init = cfg => {
  config = cfg
}

BIGONE.getToken = () => {
  return new Promise(resolve => {
    jwt.sign({
      "type": "OpenAPI",
      "sub": config.key,
      "nonce": + new Date() * 1000000
    }, config.secret, {header: {
      "alg": "HS256",
      "typ": "JWT"
    }}, (err, token) => {
      if (!err) {
        resolve(token)
      } else {
        resolve('')
      }
    })
  })
}

/**
 * 创建订单（买卖）
 * @param {交易对} symbol 
 * @param {买卖方向} side 
 * @param {现价还是市价} type 
 * @param {价格} price 
 * @param {数量} amount 
 */
BIGONE.createOrder = async (symbol, side, price, amount = 0.01) => {
  const FormData = require('form-data')
  const token = await BIGONE.getToken()
  const form = new FormData()

  form.append('market_id', symbol)
  form.append('side', side)
  form.append('price', price)
  form.append('amount', amount)

  // 创建订单
  return fetch(API.MARKET_URL + '/viewer/orders', {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: form
  }).then(res => res.json())
}


/**
 * 取消订单（买卖）
 * @param {订单id} id 
 */
BIGONE.cancelOrder = async (id) => {
  const url = `${API.MARKET_URL}/viewer/orders/${id}/cancel`
  const token = await BIGONE.getToken()

  // 发送新建订单的请求
  return fetch(url, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
}

/**
 * 查询资产
 * 
 */
BIGONE.getBalance = async() => {
  let token = await BIGONE.getToken()
  return fetch(API.MARKET_URL + '/viewer/accounts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
}

/**
 * 查询所有订单
 * @param {交易对} symbol
 * @param {订单状态} states
 *
 */
BIGONE.getOrders = async (symbol, states = 'FILLED') => {
  const url = `${API.MARKET_URL}/viewer/orders/?market_id=${symbol}&state=${states}`
  const token = await BIGONE.getToken()

  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
}

/**
 * 获取指定 id 的订单 
 * @param {订单id} id
 * 
 */
BIGONE.getOrderByid = async (id) => {
  const url = `${API.MARKET_URL}/viewer/orders/${id}`
  const token = await BIGONE.getToken()

  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
}

/**
 * 行情接口(ticker)
 * @param {交易对} symbol 
 * 
 */
BIGONE.getTicker = (symbol) => {
  const url = `${API.MARKET_URL}/markets/${symbol}/ticker`

  return fetch(url, {
    method: 'GET'
  }).then(res => res.json())
}

/**
 * 深度查询
 * @param {交易对} symbol
 * 
 */
BIGONE.getDepth = (symbol) => {
  const url = `${API.MARKET_URL}/markets/${symbol}/depth`

  return fetch(url, {
    method: 'GET'
  }).then(res => res.json())
}

module.exports = BIGONE
