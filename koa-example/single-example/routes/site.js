// routes/site.js
const Router = require('koa-router');
const router = new Router();
router.get('/', (ctx) => {
    ctx.body = '首页';
});
router.get('/about', (ctx) => {
    ctx.body = '关于页';
});
module.exports = router;