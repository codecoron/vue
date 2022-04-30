// 导入模块
const Koa = require('koa');
const Router = require('koa-router');
// 实例化应用
const app = new Koa();
// 实例化路由
const router = new Router();
// 路由定义

// 全局加载中间件
// 日志中间件
// async function logger(ctx, next) {
//     console.log(`${ctx.method} ${ctx.path}
// ${ctx.headers['user-agent']}`);
//     await next();
// }
// router.use(logger);
// router.get('/', (ctx) => {
//     ctx.body = 'home';
// });

// 某个路由加载中间件
// 日志中间件
async function logger(ctx, next) {
    console.log(`${ctx.method} ${ctx.path}
${ctx.headers['user-agent']}`);
    await next();
}
router.get('/', logger, (ctx) => {
    ctx.body = 'home';
});

// 挂载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());
// 监听
app.listen(10000, () => {
    console.log('listen on 10000');
});

