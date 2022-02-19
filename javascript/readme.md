# 第三章JQuery和DOM

## 预备知识

> html、css、js



**css定义方式** 

- **标签选择器**：直接覆盖原有的标签样式
- **类选择器：**通过.来写一个样式，然后通过class引用
- **ID选择器：**通过`#ID`选择器来直接定义某个标签的样式

```html
<style>
    h1{font-size:180px;color:green}
    .line {font-size: 40px;color: orange}
    #title {color: blue;font-weight: 600;}
</style>

<body>
    <div id="title">你好呀，欢迎来学习CSS!</div>
    <h1>静夜思</h1>
    <p class="line">床前明月光</p>
</body>
```



## Jquery

**原生js与Jquery获取DOM对象**

```js
// 原生js
document.getElementById('ID的值');
//Jquery
$('#ID的值');
```



**原生js和Jquery实现Ajax**

```js
//原生js实现
var Ajax = {
    get: function (url, fn) {
        //XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            //readyState==4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                //从服务器获取数据
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
    //data应为 'a=a1&b=b1' 这种字符串格式，在jQuery里，如果data为对象，则会自动将对象转换成这种字符串格式
    post: function (url, data, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        //添加http头，发送消息至服务器时的内容编码类型
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}
```



```js
//JQuery实现
$.ajax({
    url: "",
    type: '',
    dataType: '',
    data: {

    },
    success: function () {

    },
    error: function () {

    }
})
```



其实我对原生的实现还是挺好奇，比如

- `var Ajax = {}` 这个对象会被谁调用？
- ` get: function (url, fn) {}` 这句话中的`fn`是个啥？
- `XMLHttpRequest`是一个怎样的对象？



**群组选择器**

```js
.a,b,c {
    width: 200px;
    height: 200px;
    background-color: #666;
}

<div class="a"></div>
<div class="b"></div>
<div class="c"></div>
```



**后代选择器**

```js
.outer {
    width: 200px;height: 200px;border: 1px solid #666;
}

.outer.inner {
    height: 30px;display: block;background-color: pink;
}

<div class="outer">
    <span class="inner"></span>
</div>
```



**通配符选择器**

```js
*{padding:0;margin:0;}
```



上面这些选择器的作用都很容易理解，其次便是一些写法上的问题。



后来想了想，为啥名字叫选择器?

选择器是提供了一种方式，说明哪种HTML元素会被应用对应的CSS样式。说到底也就是说如何去选择HTML元素。



**Jquery这样使用选择器**

```html
<ul>
    <li>天马</li>
    <li>流魂</li>
    <li>天网</li>
    <li>混沌</li>
    <li>昊天</li>
</ul>
```

```js
//版本1
var ul = $('ul');
var lis = ul.find('li');
var li = lis.eq(1);
alert(li.text());

//版本2
var text = $('ul li:eq(1)').text();
或者
var text = $('ul li').eq(1).text();
```



1. 首先要知道Jquery如何使用选择器

`$('keyword')`比如上面最简单的标签选择器。但是有多个ul标签会怎么样？比如上面有两个ul呢？只会选中第一个。

2. jquery里面还可以添加其它选择器，比如后代选择器

`$('ul li').eq(1)`作用还是能理解的，只是写法上有点不熟悉。



**`$()`除了可以放选择器，还可以放html代码变成对应的DOM节点**

```js
var newLi = $("<li id='a5'>新的法宝</li>")

//然后你就可以想办法把DOM节点挂载上去
```



# Vue

`v-model`与`v-text`分别与`span`的应用

```html
<div id='app'>
    <input type="text" v-model='input'>
    <!-- <span v-model='text'></span> -->
    <span v-text='text'></span>
    <span>{{text}}</span>
</div>
```

```js
var vue = new Vue({
    el: '#app',
    data: {
        text: "hello span",
        input: "hello input"
    }
})
```

`v-model`对span不起作用



`v-model`直接绑定DOM元素的values属性和Data对象的内容。(**适用于表单元素，有value属性**)

`v-text`就为那些没有value属性的元素，提供一个插入Data对象内容的机会。就像是直接使用双花括号。**但是这并没有双向绑定的感觉**





**Vue的条件语句**

```js
v-if
v-else
v-else-if
```

这样之后，你能看到html代码的if else用法





**`v-model`与select的联合**

```html
<div id="app">
    <select v-model='selected'>
        <option v-for="role in roleList" :value="role.value">
            {{role.lable}}
        </option>
    </select>
</div>
```

```js
var vue = new Vue({
    el: '#app',
    data: {
        selected: "23",
        roleList: [
            { value: '0', lable: "我是游客" },
            { value: '1', lable: "我是普通用户" },
            { value: '2', lable: '我是管理员' }
        ]
    }
})
```

我觉得select中的`v-model`就是给了select一个初始值，一般来说初始值可以从下面的roleList中去取。如果你写了一个未定义的值，它的选择框就会直接为空。



**注意**

`value`要用Vue的方式来绑定，也就是说一定要写成这样`v-bind:value="role.value"`或者`:value="role.value"`。不能写成`value="role.value"`。

没有用Vue的绑定，就会没有数据的输入，如下。

```html
value="role.value"
<option value="role.value">我是管理员</option>
```

用了Vue绑定

```js
:value="role.value"
<option value="2">我是管理员</option>
```



因为Vue使用规则是这样的。



**局部组件与全局组件**

**局部组件**

```html
<cool-btn></cool-btn>
```

```js
var vue = new Vue({
    el: '#app',
    data: {},
    components: {
        'coolBtn': { template: "<input value='按钮名称' type='button' style=\" backgroud:deepskyblue;color:#fff;\">" }
    }
})a
```

```js
template: `<input value='按钮名称' type='button' style=\" backgroud:deepskyblue;color:#fff;\">` }
```



1. 在使用模板时要注意，出现大写添加横杠的问题。如`coolBtn`变成`cool-Btn`(还有些传闻说，**加横杠的同时要把大写转成小写，但是我实践过后发现不用也行**，总的来说横杠才是必须的。)
2. `template`是一个字符串对象，至于你用什么符号好像区别不大。(单引号、双引号、反引号)



模板本质也是一些DOM元素组成，**所以也可给它们绑定它自己的props的属性。**

```html
<cool-Btn names='hello value'></cool-Btn>
```

```js
var vue = new Vue({
    el: '#app',
    components: {
        'coolBtn': {
            props: ['names'],
            template: '<input :value="names" type="button" style=\" backgroud:deepskyblue; \">'
        }
    }
})
```





**事件与父子组件**

我之所以把代码写全一点，因为很多东西定义在那一层也很重要，我经常搞混就写得清楚一点。

```html
<cool-Btn @btn-click='login' names='hello value'></cool-Btn>
```

```js
var vue = new Vue({
    el: '#app',
    components: {
        'coolBtn': {
            props: ['names'],
            template: `<input @click="defaultClick" :value="names" type="button" style=\" backgroud:deepskyblue; \">`,
            methods: {
                defaultClick: function () {
                    this.$emit('btn-click')
                    // 这个this代表vue这个变量本身
                    console.log(this)
                }
            }
        }
    },
    methods: {
        login: function () {
            alert("outside methods")
        }
    }
})
```



1. 要注意在`this.$emit()`的this是代表了vue这个变量
2. `btn-click`是一个父子组件约定的事件
3. html的Dom是访问不了tmplate的methods，它只能访问vue下面的methods





**Computed属性**

当我发现一个属性需要和函数绑定起来的时候，Computed属性是真的好用。

```html
<div id="app">
    请输入商品价格:
    <input type="number" v-model='price'> <br>
    请输入商品价格:
    <select v-model='discount'>
        <option v-for='item,index in discounts' :value='item.value'>{{item.lable}}</option>
    </select> <br>
    <span style="color: black;">成交价：{{price*discount}}</span>
    <span style="color: black;">成交价：{{payment}}</span>
</div>
```

```js
var vue = new Vue({
    el: '#app',
    data: {
        price: 0,
        discount: 0.9,
        discounts: [
            { value: '0.9', lable: '9折' },
            { value: '0.8', lable: '8折' },
            { value: '0.7', lable: '7折' },
            { value: '0.65', lable: '65折' }
        ]
    },
    computed:{
        payment:function(){
            var today = new Date();
            // 1.先获取今天的日期
            var month = today.getMonth()+1;
            var day = today.getDate();
            // 2.根据是否是双十一，获取返利金额
            var rebate = 0;
            if(month==11&&day==11)
                if(this.price>=400)
                    rebate=150;
                else if(this.price>=200)
                    rebate=50;

            return this.price * this.discount - rebate;
        }
    }
})
```



**`watch`属性**

我把业务属性和真正需要被监听的东西分离开来了。`methods`只需要改变业务逻辑的值，而`watch`只需要监听值的变化。



```js
methods:{
    addProgress:function(){
        this.progressNum+=10;
        if(this.progressNum>=100){
            this.progressNum=100;
            this.msg='大功告成，辛苦了';
            return;
        }
        var background = 'red';
        if(this.progressNum>=80){
            background='green';
            this.msg='就差一点点了!';						
        }
        else if(this.progressNum>=50){
            background='orange';
            this.msg='有改善咯'
        }

        this.spanStyle = {
            width:this.progressNum+'px',
            background:background
        }
    }
}
```



**修改之后**

```js
methods:{
    addProgress:function(){
        this.progressNum+=10;
    }
},
    watch:{
        progressNum:function(val){
            if(this.progressNum>=100){
                this.progressNum=100;
                this.msg='大功告成，辛苦了';
                return;
            }
            var background = 'red';
            if(this.progressNum>=80){
                background='green';
                this.msg='就差一点点了!';						
            }
            else if(this.progressNum>=50){
                background='orange';
                this.msg='有改善咯'
            }

            this.spanStyle = {
                width:this.progressNum+'px',
                background:background
            }
        }
    }
```



**`Filter`过滤器**

**局部过滤器**

直接在Vue对象下添加Filter属性即可，并且使用管道符号`|` 来使用过滤器
```js
var vue = new Vue({
	el:'#app',
	data:{
		time:new Date()
	},
	filters:{
		dateFormat:function(val){
			return val.getFullYear()+'-'+(val.getMonth()+1)+'-'+val.getDate();
		}
	}
})
```

```html
		<div id="app">
			{{time|dateFormat}}
		</div>
```

**全局过滤器**

和全局组件用法一样，常用的是输入**名称**和

```js
Vue.filter('dateFormatB',function(val){
	return val.getFullYear()+'-'+(val.getMonth()+1)+'-'+val.getDate();
})
```

**TODO**

**在使用模板的时候，三种引号导致的问题**

- [ ] template反引号，template属性双引号，传入单引号，双引号，双引号包含单引号
- [ ] template反引号，template属性单引号，传入单引号，双引号，双引号包含单引号
- [ ] template双引号，template属性单引号，传入单引号，双引号，双引号包含单引号
- [ ] template单引号



# ES6

**`const`的升级**
const 声明的变量不能改变，如果改变会强制报错

```js
const NAME1 = '张三'; 
NAME1 = '李四'; //这里就会直接报错
console.log(NAME1);
```



**解构赋值**



```js
let Person = {
    eat: function () {
        console.log("我在吃饭!");
    },
    sleep: function () {
        console.log("我在睡觉!");
    }
}
```



es6之前

```js
let eat = Person.eat;
let sleep = Person.sleep;
eat();
sleep();
//可以正确打印
```



es6之后

```js
let { eat, sleep } = Person
//也可以正确输出
```



确实是不太习惯，第一次左边这么多值，右边这么简单



**es6的解构赋值+默认值**

```js
let { eat, sleep, name = '这是默认值' } = Person
```



**字符串的操作**

这样的`of`你用过吗，按照字符遍历字符串，es6新增

```js
let str = '我爱你中国'
for (let s of str) {
    console.log(s);
}
```



以前的`in`用于获取下标

```js
for (let n in str) {
    console.log(n, str[n]);
}
```





**加强版字符串**,反引号

> 有shell那感觉了

```js
let name = '张三';
let sayHi = `你好呀，${name} 一起high`;
console.log(sayHi);
```



可以实现

1. 更方便的实现多行字符串，代码长啥样，打印出来长啥样
2. 插入表达式，和shell很像



**`Proxy`代理**

> proxy是一个浏览器支持的全局对象

构造函数时`proxy(target,handler)`，target是一个对象，handler也是一个对象，但是是一个什么了许多操作属性的对象。



```js
let obj = {
    name: 'keke',
    age: 28
}

obj.age = "18"
console.log(obj.age)
//理论上这里会报错的，但是没有报
```



**使用proxy代理，可以这样写代码**



首先比较惊讶的是这个Proxy的用法，有很多约定俗成的事情。

1. 这样写函数对象，{methodA,methodB}
2. `set()`的参数会被自动填充,并且return也是要返回`target`，否则不起作用
3. 在set()中`console.log`可以，但是在`get()`中则不行
4. `get()`中的receiver是什么?

```js
let objProxy = new Proxy(obj, {
    set(target, key, value) {
        if (key == 'age' && typeof value != 'number')
            throw new Error(`Invalid attempt to set ${key} to ${value}:not number`)
        return target[key] = value;
    },
    get(target, key, receiver) {
        return target[key];
    }
})

objProxy.age = "28"
console.log(obj)
```



**数组**

原本创建数组的方法

1. 直接`Array`
2. 使用`Array.of`

```js
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

**你可以注意到，这里的Array是奇奇怪怪的**





**es6**可以使用`Array.from`

可以尽可能地把输入的参数转成**数组**

```js
let listdata = {
    0: 'keke',
    1: 'jerry',
    length: 2
}
console.log(listdata)
//{ '0': 'keke', '1': 'jerry', length: 2 }

listdata = Array.from(listdata)
console.log(listdata)

//[ 'keke', 'jerry' ]
```



经过测试，这个尽可能是主要需要有以下几个点要求

1. 前面属性值的key要是数字开头，并且要连续(不连续就会导致丢失什么的)
2. 并且要有length属性(就是根据这个length属性生成数组的大小)



**`Array.from`的支持回调函数**

```js
listdata = Array.from(listdata, function (item) {
    return item + '-----';
})
```

看到这里的回调函数，我又想到一些注意点

1. 一定要有个参数，因为机制就是会传个参数给你
2. 一定要return，因为机制就是原数据等你的返回值，用来赋值



**`copyWithn`**

> [`copyWithn`](https://www.bookstack.cn/read/es6-3rd/spilt.4.docs-array.md)

将一定范围索引的数组元素修改为此数组另一指定范 围索引的元素。 **会修改当前数组**

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```



**`find`**

> [`find`](https://www.bookstack.cn/read/es6-3rd/spilt.5.docs-array.md)

查找数组中符合条件的元素，若有多个符合条件的元素，则 返回第一个元素。**所以参数要求是一个回调函数**

```js
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

 **注意**

它不需要我们返回这个值，只需要我们返回True或者False



**三个参数的情况**

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

上面代码中，`find`方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。



**两个参数的情况**

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

我挺好奇这个person是怎么传给this的



**我们怎么可以知道，一个方法的全部用法？**而不是要靠一个个的笔记去学习，有没有官方文档?



·**`fill`**

> [`fill`](https://www.bookstack.cn/read/es6-3rd/spilt.6.docs-array.md)

一个参数，数组全部替换为一个值

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]
```



三个参数，指定起始和末尾位置

```js
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```



**还可以填充对象**

```js
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]
let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

这个例子主要说明了fill一个对象，都是同一个对象的内存值，也就是这是浅拷贝对象，而不是深拷贝对象。



**`entries`**

> [`entries`](https://www.bookstack.cn/read/es6-3rd/spilt.7.docs-array.md)

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

`entries()`可以辅助生成一个链表之类的结构，每个节点是数组，数组由index和value组成，然后就可以用`iterator`去访问。





**这样复制数组**

```js
let newListData = [...listData];
console.log(newListData)
```

`...`点点点运算符的作用绝不止这些







**其它**

这么奇葩的代码，真实少见了

```js
let va = ('haha','jerry')
console.log(va)
//输出haha	
```

没有这种小括号赋值变量的形式



