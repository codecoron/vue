# node.js
> 基于《Node.js+Webpack开发实战》和Nodejs官网学习nodejs


简单监听一个http服务
```js
const http = require('http')

const hostname = '127.0.0.1'
const port = 9090

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})
```

因为在学nodejs的过程也是学习js的过程，也许我会提一下一些js语法上的认识。

1. 这里用const的原因
2. 导入一个模块的对象、函数等，可以使用`require`，或者后续的`import`
3. 获取到`http`对象后，创建了一个服务器`server`，顺理成章地监听ip:port