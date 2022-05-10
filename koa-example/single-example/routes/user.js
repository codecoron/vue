// routes/user.js
const Router = require('koa-router');
const router = new Router({ prefix: '/user' });
router.get('/', (ctx) => {
    ctx.body = '用户首页';
});
router.get('/login', (ctx) => {
    ctx.body = '用户登录';
});
module.exports = router;