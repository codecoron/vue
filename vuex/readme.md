# `vuex`
> 基于[vuex官网](https://vuex.vuejs.org/zh/guide/#%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84-store)学习vuex

这两个例子都跑不起来，暂时忽略
- [chapter1](./chapter1)
- [chapter2](./chapter2)


## `chapter3`
```js
const Vue = require('vue')
const Vuex = require('vuex')

// 有这个反而会失效
// Vue.use(Vuex)

const store = new Vuex.Store({
    state: { count: 0 },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

console.log(store.state.count)
store.commit('increment')
console.log(store.state.count)
```