// 导入模块
const Koa = require('koa');
// 实例化应用
const app = new Koa();
async function middleware1(ctx, next) {
    console.log('middleware1 start');
    await next();
    console.log('middlware1 end')
}
async function middleware2(ctx, next) {
    console.log('middleware2 start');
    await next();
    console.log('middlware2 end')
}
// 中间件
app.use(middleware1);
app.use(middleware2);
// 路由
app.use(async (ctx) => {
    console.log('router');
    ctx.body = 'Hello World';
});
// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
});