const fs = require('fs')
const bluebird = require('bluebird')
// Pormise 化 fs的API
bluebird.promisifyAll(fs)

// 文章数据
const posts = []

// 文章id
let postId = 1

// 发表文章
exports.publish = function (title, content) {
    const item = {
        id: postId++,
        title: title,
        content: content,
        time: (new Date()).toLocaleString()
    }
    posts.push(item)
    return item
}

// 查看文章
exports.show = function (id) {
    // 因为参数默认是字符类型，所以这里要转换一下
    id = Number(id)
    for (const post of posts) {
        if (post.id === id) {
            return post;
        }
    }
    return null
}

// 编辑文章
exports.update = function (id, title, content) {
    id = Number(id)
    res = "空"
    posts.forEach((post) => {
        if (post.id === id) {
            post.title = title
            post.content = content
            post.modifytime = (new Date()).toLocaleString()
            // console.log("updating")
            // console.log(post)
            res = post
        }
    })
    return res
}

// 删除文章
exports.delete = function (id) {
    id = Number(id)
    let index = -1
    // 应该是作为一个下标(会自动被填充)
    posts.forEach((post, i) => {
        if (post.id === id) {
            index = i
        }
    })
    if (index > -1) {
        // 
        posts.splice(index, 1)
    }
}

// 文章列表
exports.list = function () {
    // TODO map的作用
    return posts.map(item => item)
}