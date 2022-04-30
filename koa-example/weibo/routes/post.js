const Router = require('koa-router')
const postService = require('../services/post')
const router = new Router()

// 发布表单页
router.get('/publish', async (ctx) => {
    ctx.body = '在这里可以发布你的微博 title=title content=content'
    // await ctx.render('publish')
})

// 发布处理
router.post('/publish', async (ctx) => {
    const data = ctx.request.body

    if (!data.title || !data.content) {
        ctx.throw(400, "您的请求有误")
    }
    const item = postService.publish(data.title, data.content)

    ctx.body = item

    // ctx.redirect(`/post/${item.id}`)
})

// 详情页
router.get('/post/:postId', async (ctx) => {
    const post = postService.show(ctx.params.postId)
    if (!post) {
        ctx.throw(404, "文章不存在")
    }

    console.log(post)
    ctx.body = post

    // render这样一个东西是什么意思
    // await ctx.render('post', { post: post })
})

// 编辑表单页
// 原本这是get请求，然后通过render转发post请求，后来我直接改成post请求
router.post('/update/:postId', async (ctx) => {
    const post = postService.show(ctx.params.postId)
    if (!post) {
        ctx.throw(404, '文章不存在')
    }
    const data = ctx.request.body
    const item = postService.update(post.id, data.title, data.content)
    if (!item) {
        ctx.throw(404, "更新失败")
    }
    console.log("更新后内容")
    console.log(item)
    ctx.body = item
    // await ctx.render('update', { post })
})

// 删除
router.post('/delete/:postId', async (ctx) => {
    postService.delete(ctx.params.postId)
    ctx.redirect('/')
})

module.exports = router 