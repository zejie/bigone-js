const API = require('./index.js')

API.init({
  key: 'key',
  secret: 'secret'
})

// ticker
// API.getTicker('ETH-USDT').then(data => {
//   console.log(data)
// })


// API.getBalance().then(data => {
//   console.log(data)
// })


// API.createOrder('ETH-USDT', 'BID', '400', '0.06').then(data => {
//   console.log(data)
// })

// API.cancelOrder('63894594').then(data => {
//   console.log(data)
// })


// API.getDepth('ETH-USDT').then(data => {
//   console.log(data)
// })


// API.getOrders('ETH-USDT', 'PENDING').then(data => {
//   console.log(data)
// })


// API.getOrderByid('100').then(data => {
//   console.log(data)
// })