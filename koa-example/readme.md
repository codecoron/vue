# koa
> 基于《Node.js+webpack实战》学习


**简单的监听例子**

在添加中间件的时候，使用了函数，并且使用`async`修饰(我实测有没有async修饰都可以)

但是我比较疑惑的是，这个use的作用是什么?

```js
// 导入模块
const koa = require('koa')

//实例化
const app = new koa()

// 中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

// 监听
app.listen(10000, () => {
    console.log("listen on 10000")
})
```

## `context`
> context对象(目前还解析不清楚，这个对象处于一个请求过程中的什么位置)

该对象包含了Koa请求对象、Koa响应对象和应用实例(**所以它的位置是贯穿请求到响应的整个过程**)

## `cookie`

跳过

## 中间件

在这个中间件的例子中[midware.js](./single-example/midware.js) 中，能看到`midware`的比`ctx`更早的。

```js
// midware.js对一个get请求的输出
middleware1 start
middleware2 start
router
middlware2 end
middlware1 end
```

我发现，即使没有`await`修饰，也是符合预期的

但是如果没有`next()`函数，get请求会显示notfound，因为在进行请求时，在一步中卡住了，因为没有`next()`

```js
async function middleware1(ctx, next) {
    console.log('middleware1 start');
    await next();
    console.log('middlware1 end')
}
async function middleware2(ctx, next) {
    console.log('middleware2 start');
    await next();
    console.log('middlware2 end')
}
```

## `router`
> [router.js](single-example/router.js) <br>
> [routerb.js](single-example/routerb.js)

对于例子[router.js](single-example/router.js) 有这些注意点


```js
// 挂载，传递的是方法
app.use(router.routes());

// 这个方法的作用是什么?
router.allowedMethods()
```

对于例子[routerb.js](single-example/routerb.js) ，了解到，可以怎么给路由加上中间件

**路由前缀**

这一行代码就实现了路由前缀，并且这个构造方法接收的是一个对象`{}`
```js
const router = new Router({ prefix: '/user' });
```

**路由模块化**

`koa_index.js`包含着`router`下面的`site.js`和`user.js`

总的来说，利用export和require就可以实现模块化

**模板渲染**

暂时跳过

