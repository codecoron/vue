// 导入模块
const koa = require('koa')

//实例化
const app = new koa()

// 中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

// 监听
app.listen(10000, () => {
    console.log("listen on 10000")
})