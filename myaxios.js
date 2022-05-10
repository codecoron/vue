const axios = require('axios')

// 发起一个post请求
axios('http://114.132.252.201:8080/').then(function (response) {
    console.log(response.data)
})
