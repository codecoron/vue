const express = require('express')
const app = express()

function logger(options) {
    return function (req, resp, next) {
        const logs = [];
        if (options.method)
            logs.push(req.method)
        if (options.path)
            logs.push(req.path)
        if (options['user-agent'])
            logs.push(req.headers['user-agent'])
        console.log(logs.join(' '))
        next();
    }
}

app.use(logger({ method: true, path: true }))//使用中间件，并传入配置
app.get('/', (req, resp) => {
    resp.send('hello world')
})

// 未使用中间件
app.get('/user', (req, resp) => {
    resp.send('user')
})

app.listen(8080, () => {
    console.log('listen on 8080')
})
