const koa = require('koa')

const app = new koa()

// proxy的作用是?
// app.proxy = true

app.use(async (ctx) => {
    ctx.set('x-version', '1.0.0');
    ctx.body = {
        method: ctx.method,
        path: ctx.path,
        url: ctx.url,
        query: ctx.query,
        headers: ctx.headers,
        ip: ctx.ip
    };
})

app.listen(10000, () => {
    console.log('listen on 10000')
})