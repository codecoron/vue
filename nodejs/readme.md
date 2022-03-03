# node.js

> 基于《Node.js+Webpack开发实战》和Nodejs官网学习nodejs


简单监听一个http服务
```js
const http = require('http')

const hostname = '127.0.0.1'
const port = 9090

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})
```

因为在学nodejs的过程也是学习js的过程，也许我会提一下一些js语法上的认识。

1. 这里用const的原因
2. 导入一个模块的对象、函数等，可以使用`require`，或者后续的`import`
3. 获取到`http`对象后，创建了一个服务器`server`，顺理成章地监听ip:port

## **模块系统**

### `export`

下面两段代码就展示了`exports`的作用，通过exports就可以把一个文件的变量、函数导出
```js
//Mathexport.js
function sum(a, b) {
    return a + b;
}

exports.sum = sum
```
```js
//Mathrequire.js
const exp = require('./Mathexports')
sum = exp.sum
console.log(sum(1, 2))
```



### **`exports`和`module.exports`**

其实`exports`是一个变量，是`module`的一个属性
```js
module.exports.sum = sum

exports.sum = sum
```

假如突然改变了`exports`的指向，`module.exports`就不会到处js的东西
```js
//a.js
exports = 'hello world'

//b.js
module.exports = 'hello world'

//c.js
const hello = require('./a')
console.log(hello) //{}

const hello2 = require('./b')
console.log(hello2) // hello world
```

```js
//类似于
var exports = module.exports
```



**加载规则**

1. 绝对路径`/home/math`
2. 相对路径`./math`
3. 全局路径模块或当前的node_module`math`(没有`/`或者`./`)
4. 如果都没有找到





## **`nodejs`的异步编程**

书上说这个算使用了回调函数，但是不算异步编程(**我也不清楚**)
```js
function test(callback){
    callback(1);
}

test (function(data){
    console.log(data);
})
```



**在了解async时了解到的几种函数**

1. 普通函数
2. 箭头函数
3. 类函数

```js
// 普通函数
async function doSomething(a,b){
    return a+b;
}

// 箭头函数
const doSomething - async (a,b)=>{
    return a+b
}

// 类函数
class Demo{
    async test(a,b){
        return a+b
    }
}
```



**异步函数的函数签名**

```js
func(param..., callback(Error, data))
```



### **`Promise`**

这个函数签名有需要注意，它可以用来new，并且会返回promise对象之类的东西
```js
function Promise(function(resolve, reject): Promise {
 // 原来的异步逻辑
});
```
一旦Promise发生状态变化，就会触发then方法，then方法签名
如下：
```js
Promise.prototype.then = function(onFulfilled[, onRejected]):
Promise
```
虽然语法上这么写，我也没有太懂



catch方法的签名

```js
Promise.prototype.catch = function(onRejected): Promise
```



**所以说什么是异步?**

一般的回调函数
```js
const fs = require('fs')

fs.readFile('./README.md', function (err, data) {
    if (err) {
        console.log('读取出错', err);
        return;
    }
    console.log(data)
})
```



**使用promise**

1. then和catch也是需要接收一个函数(但是不知道如何跟函数签名对应上)
2. then和catch中的函数的参数，是可以从resolve和reject中传进来

```js
const fs = require('fs')
function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

readFileAsync('./README.md')
    .then(function (data) {
        console.log(data)
    }).catch(function (err) {
        console.error(err)
    })
```



**作者对比一下使用普通的回调和promise的差异**
```js
// callback.js回调风格
const fs = require('fs')
fs.readFile('./README.md', function (err, data) {
    if (err) {
        console.log('读取README.md出错', err);
        return;
    }
    console.log('读取README.md成功', data)
})

fs.readFile('./README.md', function (err, data) {
    if (err) {
        console.log('读取README.md出错', err);
        return;
    }
    console.log('读取README.md成功', data)
})
```

**我本来想改成这样，但是发现行不通，有几点引起了我的思考**

1. 不行是因为err和data传不进去，又或者说是直接在括号内定义一个函数与定义好了函数再传进来，有很大差别?
```js
const fs = require('fs')

function read (err, data) {
    if (err) {
        console.log('读取README.md出错', err);
        return;
    }
    console.log('读取README.md成功', data)
}

fs.readFile('./README.md',read(err,data))
fs.readFile('./README.md',read(err,data))
```

这样使用promise的链式调用

1. 总的来说就是可以不断then，但是一出现一个错误，整个链条都会断掉
```js
const fs = require('fs')
function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

readFileAsync('./README.md')
    .then(function (data) {
        console.log('读取README.md1成功', data)
        return readFileAsync('./README.md');
    }).then(function (data) {
        console.log('读取README.md2成功', data)
    }).catch(function (err) {
        console.error(err)
    })
```



### **`async/await`**

> 本质上是promise的语法糖，可以让写异步的代码像同步一样，但是我还是**没有真正搞懂异步**

```js
const fs = require('fs')
function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

async function readFiles() {
    try {
        const data1 = await readFileAsync('./README.md')
        const data2 = await readFileAsync('./README.md')
        console.log('文件一的内容', data1)
        console.log('文件二的内容', data2)
    } catch (e) {
        console.log('读取失败', e)
    }
}

readFiles();
```



又举了一个例子，对async的印象并没有加深，但是新学了个`XMLHttpRequest`

```js
function ajaxGet(url, timeout) {
    return new Promise(function (resolve, reject) {
        var XMLHttpRequest = require('xhr2');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.timeout = timeout;

        xhr.onload = function () {
            resolve(xhr.responseText);
        }
        // 这里的e从哪里读取?
        xhr.onerror = function (e) {
            reject(new Error('请求失败'));
        }
        xhr.ontimeout = function () {
            reject(new Error('timeout'))
        }
        xhr.send(null);
    })
}

async function getData() {
    try {
        const data = await ajaxGet('https://www.baidu.com', 1000)
        console.log(data)
    } catch (e) {
        console.error(e);
    }
}

getData();
```



### 事件

触发事件

```js
const EventEmitter = require('events')
const emitter = new EventEmitter();

emitter.on('click', function (param1) {
    console.log('触发了点击', param1)
})

emitter.once('clickonce', function (param1) {
    console.log('触发了点击', param1)
})

emitter.emit('click', 'demo')
emitter.emit('clickonce', 'demo')
emitter.emit('clickonce', 'demo')
```





文件操作

```js
const fs = require('fs')
fs.readFile('./README.md', 'utf-8', function (err, data) {
    if (err) {
        console.log(err)
        return
    }
    console.log(data)
})

fs.writeFile('./a.json', "{name:coderon}", { encoding: 'utf-8' }, function (err) {
    console.log(err)
})
```



`readFile`的函数签名

```js
fs.readFile(path[, options], callback)
```

**注意**：个人感觉函数签名跟c语言的函数声明差不多。但是js的函数声明不是那么对称，让我有点不适应。但是能感受到一个**可选参数**的规律，中括号要在固定参数逗号的前面(有点绕)。**总的来说就是，我要把逗号也纳进中括号里面**



**流操作**

```js
const fs = require('fs')
let readdata = '';
const stream = fs.createReadStream('./README.md', 'utf-8')
stream.on('data', (chunk) => {
    readdata += chunk;
})

stream.on('end', () => {
    console.log(readdata)
})

stream.on('error', (err) => {
    console.log('读取错误', err)
})

console.log('执行完毕')
```



流操作的管道

```js
const readStream = fs.createReadStream('./a.json', 'utf-8')
const writeStream = fs.createWriteStream('./b.json', 'utf-8')

readStream.pipe(writeStream)
writeStream.on('finish', () => {
    console.log('写入完成')
})
```



**http的request**

```js
const https = require('https')
const fs = require('fs')

const req = https.request('https://www.baidu.com', (response) => {
    console.log('响应状态码', response.statusCode)
    response.pipe(fs.createWriteStream('baidu.html'));
})

req.end()
```

不调用end()为什么会卡住，在调用request的时候就会阻塞进入一个request的过程，而end()是告诉https结束发送了

感觉javscript的函数声明不是那么对称



**http服务器，一般很少用，但是例子很有意思**

```js
const http = require('http')

const server = http.createServer((req, resp) => {
    resp.end(JSON.stringify(req.headers) + 'codeorn')
})

server.listen(8080, () => {
    console.log('listen on 8080')
})
```

