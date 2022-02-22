// // setTimeout
// let gift = null
// setTimeout(() => {
//     gift = 'gift'
//     console.log('我收到了' + gift)
// }, 2000)

// console.log("end")


// // 使用Proxy
// let gift = null
// let obj = { gift }
// let objProxy = new Proxy(obj, {
//     set(target, key, value) {
//         if (key == 'gift') {
//             target[key] = value
//             console.log('我收到' + target[key])
//             return true
//         }
//     },
//     get(target, key) {
//         return target[key]
//     }
// })

// setTimeout(() => {
//     objProxy.gift = '竹蜻蜓'
// }, 2000)


// let gift = null
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         gift = '竹蜻蜓'
//         resolve(gift)
//     }, 2000)
// }).then((gift) => {
//     console.log('我收到了' + gift)
// })


let gift = null
new Promise((reject) => {
    setTimeout(() => {
        if (Math.random() < 0.2) {
            gift = '竹蜻蜓'
            // console.log(resolve)
            resolve(gift)
        } else {
            gift = '空空如也'
            // console.log(reject)
            reject(gift)
        }
    }, 100)
}).then((gift) => {
    console.log('then' + gift)
}).catch((gift) => {
    console.log('catch' + gift)
})

// let getGiftAsync = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (Math.random() < 0.2) {
//                 let gift = '竹蜻蜓'
//                 resolve(gift)
//             } else {
//                 let gift = '空空如也'
//                 reject(gift)
//             }
//         }, 2000)
//     })
// }

// async function executeAsyncFunc() {
//     let gift = await getGiftAsync();
//     console.log('我收到了' + gift);
// }

// executeAsyncFunc();
// console.log('end')