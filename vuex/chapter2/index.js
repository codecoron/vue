import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    methods: {
        increment() {
            this.$store.commit('increment')
            console.log(this.$store.state.count)
        }
    }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)

store.commit('increment')

console.log(store.state.count)