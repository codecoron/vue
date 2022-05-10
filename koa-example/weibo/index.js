const Koa = require('koa');
// const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
// const authenticate = require('./middlwares/authticate');
// 路由
const siteRoute = require('./routes/site');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const app = new Koa();
app.keys = ['hO0TTQctIjSjNykY'];
// 使用中间件
app.use(bodyParser());
// app.use(authenticate);
// render(app, {
//     root: './templates',
//     layout: 'main',
//     viewExt: 'ejs'
// });
// 挂载路由
app.use(siteRoute.routes()).use(siteRoute.allowedMethods());
app.use(userRoute.routes()).use(userRoute.allowedMethods());
app.use(postRoute.routes()).use(postRoute.allowedMethods());
app.listen(10000, () => {
    console.log('listen on 10000');
});