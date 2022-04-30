const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router({ prefix: '/user' });
router.get('/', (ctx) => {
    ctx.body = '/user';
});
router.get('/list', (ctx) => {
    ctx.body = 'user/list';
});
app.use(router.routes()).use(router.allowedMethods());
// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
});

// /user 输出“/user”
// /user/list 输出“/user/list”