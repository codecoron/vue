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
