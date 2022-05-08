# `vue-router`
> 跟随[vue-router官网](https://router.vuejs.org/zh/guide) 学习vue-router


[chapter1](./chapter1)有这么个例子

我只是会配置`routes`给`router`，至于为什么这么创建router，我也不太清楚。
```js
 // 3. 创建路由实例并传递 `routes` 配置
  // 你可以在这里输入更多的配置，但我们在这里
  // 暂时保持简单
  const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
```

这里创建的实例，和`nodejs`很像，虽然它不是常写的，通过new来生成一个`Vue`对象，但它本质上还是一个`Vue`对象。
```js
// 5. 创建并挂载根实例
const app = Vue.createApp({})
```