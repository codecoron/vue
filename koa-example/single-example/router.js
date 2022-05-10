// 导入模块
const Koa = require('koa');
const Router = require('koa-router');
// 实例化应用
const app = new Koa();
// 实例化路由
const router = new Router();
// 路由定义
router.get('/', async (ctx) => {
    ctx.body = 'Hello World';
});
router.get('/user', async (ctx) => {
    ctx.body = 'User';
});
// 挂载路由中间件
app.use(router.routes());
// app.use(router.allowedMethods());
// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
});

