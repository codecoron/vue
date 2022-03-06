**node.js**

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

# **模块系统**

## `export`

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



## **`exports`和`module.exports`**

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





# **`nodejs`的异步编程**

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



## **`Promise`**

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



## **`async/await`**

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



## 事件

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

# `express`

快速尝试了一下`express`框架，发现与直接使用`http`的相同与不同

1. 相同的：在require之后，都需要再创建一个Server。比如`express()`和`http.createServer((req, resp)`
2. 传统http很难设置不同的访问路径。而express可以直接通过方法设置
3. 传统的http需要**主动使用**`resp.end()`才会返回数据，`express`则直接解析一下便会顺便返回调用`end()`返回数据.

**注意**:
这里发现了`req.headers`和`req.header`的不同，`headers`是属性，`header`是一个函数。

```js
// 导入express 模块
const express = require('express')
// 创建应用
const app = express();

// 设置路由
app.get('/', (req, resp) => {
    resp.json(req.headers)
    // console.log(req.header)
    console.log(req.headers)
});

app.listen(8080, () => {
    console.log('listen on 8080')
})
```

## `express`路由

路由的函数的统一写法`app.METHOD(PATH, HANDLER)`

如果你希望使用一个函数处理一个路径的所有请求，那么可以使用`app.all()`

**路由参数**
> 主要说一下,get方法中的参数如何传递

1. 需要使用占位符这样的东西，**冒号+键**
2. 然后key与value会以json的格式被存到`req.params`中

```js
app.get('/users/:userId/timelines/:timelineId', (req, resp) => {
    resp.json(req.params);
});
```
还可以给`key`加一些正则表达式匹配，注意一下规则，括号以及双斜杠(我也不知道为什么是双斜杠)

```js
app.get('/users/:userId(\\d+)/timelines/:timelineId(\\d+)', (req, resp) => {
    resp.json(req.params);
});
```

**路由函数**

```js
function(request, response, next)
```

多个路由函数，需要在前一个函数的内部调用`next()`，并且`req`和`resp`会自动传给`next()`

```js
app.get('/', (req, resp, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
}, (req, resp) => {
    resp.send('首页');
});
```

感觉next不常用

**函数数组**

还真没见过，而且居然能够自动解析
```js
function logger(req, resp, next) {
    console.log(`${req.method} ${req.path}`);
    next();
}
function home(req, resp) {
    resp.send('首页');
}
// 设置路由
app.get('/', [logger, home]);
```


**公共路由路径**

感觉差别不大，会少写一点代码吧。

```js
app.get('/user/login', (req, resp) => {
    resp.send('登录页面');
});
app.post('/user/login', (req, resp) => {
    resp.send('登录处理');
});
```

```js
app.route('/user/login')
    .get((req, resp) => {
        resp.send('登录页面')
    })
    .post((req, resp) => {
        resp.send('登录处理')
    })
```

**模块化的路由**

关键是可以把路由规则当作一个对象给导出来

```js
// user.js
const express = require('express');
const router = express.Router();
router.get('/login', (req, resp) => {
    resp.send('登录');
});
router.get('/register', (req, resp) => {
    resp.send('注册');
});
// 导出路由对象
module.exports = router;
```
```js
// timeline.js
const express = require('express')
const router = express.Router();

router.get('/list', (req, resp) => {
    resp.send('动态列表')
});

module.exports = router
```

```js
// index.js
const express = require('express')
const app = express()

const user = require('./user')
const timeline = require('./timeline')

app.use('/user', user);
app.use('./timelin', timeline);

app.listen(8080, () => {
    console.log('listen on 8080')
})
```

**`req`的属性与方法**

属性名 | 说明 | 备注
------|------|-----
method | 请求方法 | 
path | 请求路径
url | 请求url
query | GET参数对象 | 与params有啥不同??
params | 路由参数对象
headers | 请求报头 
cookies | 请求cookie | 需要使用cookie-parser插件
ip | 客户端ip
body | post请求数据 | 需要使用body-parser插件

```js
// npm install body-parser –save
// 导入express模块
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//解析 body 
// 这是新版使用bodyParser的方法
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/', (req, resp) => {
    resp.json(req.body);
});
// 开启监听
app.listen(8080, () => {
    console.log('listen on 8080');
})

```

**`resp`的属性与方法**

函数 | 作用 | 备注
-----|------|----
`resp.send()` | 发送文本 |
`resp.status(statusCode);` | 设置响应码
`resp.set(field[, value])` <br>  `resp.set({ [field]: value })`| 设置响应报头 
`resp.end([chunk][, encoding][, callback])` | 结束响应过程


## 中间件

**全局中间件**

看了下面代码之后，有些惊奇和疑问

1. 中间件居然可以是个函数
2. `app.use()`还可以加函数
3. `app.use()`是怎么知道`logger`需要什么参数? (感觉是默认潜规则)

```js
const express = require('express')
const app = express()

function logger(req, resp, next) {
    console.log(`${req.method} ${req.path} "${req.headers['user-agent']}"`)
    next()
}

app.use(logger)
app.get('/', (req, resp) => {
    resp.send('hello world')
})
app.get('/user', (req, resp) => {
    resp.send('user')
})

app.listen(8080, () => {
    console.log('listen on 8080')
})
```

**路由中间件**

原来`app.get()`还可以接受这个参数

```js
// app.use(logger)
app.get('/',logger,(req,resp)=>{
    resp.send('hello world')
})

// 未使用中间件
app.get('/user',(req,resp)=>{
    resp.send('user')
})
```

**可配置的中间件**

为什么这两种有这两种的差别呢，直接写函数名不写括号，就会自动填上参数。写了括号，就不会自动填充参数
```js
app.use(cookieParser());

app.use(logger);
```

这是`cookieParser`的函数大概结构，这样就实现可以传参进来，然后又返回真正有`req resp next`的函数
```js
function cookieParser(options) {
    return function (req, resp, next) {
    };
}
```
这样写的中间件可以配置
```js
const express = require('express')
const app = express()

function logger(options) {
    return function (req, resp, next) {
        const logs = [];
        if (options.method)
            logs.push(req.method)
        if (options.path)
            logs.push(req.path)
        if (options['user-agent'])
            logs.push(req.headers['user-agent'])
        console.log(logs.join(' '))
        next();
    }
}

app.use(logger({ method: true, path: true }))//使用中间件，并传入配置
app.get('/', (req, resp) => {
    resp.send('hello world')
})

// 未使用中间件
app.get('/user', (req, resp) => {
    resp.send('user')
})

app.listen(8080, () => {
    console.log('listen on 8080')
})

```

## **`app`的属性与函数**
> 也就是 `express()`
