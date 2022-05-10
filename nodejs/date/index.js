const date = require('./date')
const now = parseInt(Date.now() / 1000, 10)

console.log(date.formatTime(now - 60))
console.log(date.formatTime(now - 600))
console.log(date.formatTime(now - 5400))