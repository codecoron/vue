// koa.js
// 导入模块
const Koa = require('koa');
const app = new Koa();
// 导入路由模块
const siteRoute = require('./routes/site');
const userRouter = require('./routes/user');
// 挂载路由
app.use(siteRoute.routes()).use(siteRoute.allowedMethods());
app.use(userRouter.routes()).use(siteRoute.allowedMethods());
// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
});