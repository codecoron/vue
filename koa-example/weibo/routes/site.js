// 负责读取文章列表，并渲染到HTML上
const Router = require('koa-router')
const postService = require('../services/post')
const router = new Router()

// 网站首页
router.get('/', async (ctx) => {
    const list = postService.list()
    ctx.body = list
    // await ctx.render('index', { list: list })
})

module.exports = router