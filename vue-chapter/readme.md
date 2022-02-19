> 基于Vue2.x

> [Vue-api](https://cn.vuejs.org/v2/api/#全局配置)
>
> [在线Vue.js文件](https://unpkg.com/vue)

# 起步
## Vue实例
a
### 第一个Vue程序

1. Vue变量通过 元素的id联系起来
2. 元素通过双花括号{{ }},取出Vue变量的data值。(并且这个值是绑定起来的，Vue变量的data发生改变，花括号的取值也会发生改变)
3. **data可以是Json格式，如果我的Json较为复杂一点，那应该如何解决?**

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});
```

```js
//然后你可以这样在控制台使用js

app.message='Hello coderon'

然后可以看到，div的值发生变化(不用刷新页面)

```
注意:这里不需要``app.data.message`` 而是直接``app.message``


### Vue绑定元素的attribute

#### v-bind

``v-bind``给这个title属性，绑定了一个**Vue变量**。

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```



注意`v-bind`也可以绑定**自定义属性**

这里的应用主要在于`v-for`的应用。



#### v-if

```html
<p v-if="seen">现在你看到我了</p>
```


#### v-on

```html
<a v-on:click="doSomething">...</a>
```

#### Vue指令修饰符

这些指令的修饰符，给V指令又多了选择。

```html
<div id="app">
	<p v-if="seen">现在你看到我了</p>
	<a v-bind:href="url">...</a>
	<div @click="click1">
		<div @click.stop="click2">
			click me
		</div>
	</div>
</div>
```

```js
var vm = new Vue({
	el : "#app",
	data : {
		seen : false,
		url : "https://cn.vuejs.org/v2/guide/syntax.html#%E6%8C%87%E4%BB%A4"
	},
	methods:{
		click1 : function () {
			console.log('click1......');
		},
		click2 : function () {
			console.log('click2......');
		}
	}
});
```

### Vue自定义的属性

Vue中的自定义属性是用``$``符号进行引用。


#### ``vm.$data``

#### ``vm.$el``

其实之前对data里面键值的引用，应该写成``vm.$data.message``。我猜是因为有data是默认的，缺省则直接默认是data。所以可以简洁写成``vm.message``。


```html
<div id="example">
	{{a}}
</div>
```

```js
	var data = {a:1}
	var vm = new Vue({
		el:'#example',
		data:data
	})
	vm.$data === data
	vm.$el === document.getElementById('example')
	
	vm.$watch('a',function(newVaule,oldValue){
		
	})
```

#### watch 方法

``$watch()``
从上面的例子可以看到，watch的基本用法，观察一个key是否发生变化，来决定是否执行回调函数。

**第一次见Vue的函数原型，不太习惯**

```js
-$watch(source: [String, vueDataString,Function],
callback:[Function( vue, object), Object],
options :[watchOptions])
: Function

-source
-callback
-options
```

### 生命周期钩子

> [选项-生命周期钩子](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)

创建一个Vue对象的过程很神奇，各种Json对象。

**注意:**

生命周期的钩子函数，不能使用箭头函数(我也还没有搞清楚什么是箭头函数)


```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

name | 作用
-----|-----
beforeCreate |
created |
beforeMount |
mounted|
beforeUpdate |
updated |

---
![lifecycle](./resources/lifecycle.png)

---

## 模板语法

### v-声明

#### v-once

> 用了``v-once``，那么这个标签的值只会一次性插值。

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```



#### vbind和v-on简写

原来还有缩写

``v-bind``简写成  ``:``

```js
v-bind:[attribute]
:[attribute]
```



```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```



``v-on``简写成``@``

```html

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>

```



## Class与Style绑定

> `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。
>
> [Vue.js官网对Class与Style绑定的讲解](https://cn.vuejs.org/v2/guide/class-and-style.html)



### v-bind与Class

#### 对象语法

当`isActive ` 为真时，`active` 样式生效。(外表看起来像Key-Value，但又不完全是Key-Value)

**注意**

这里不能少了**花括号** 

```html
<div v-bind:class="{ active: isActive }"></div>
```

```js
data: {
  isActive: true,
  hasError: false
}
```



#### 数组语法

> 个人感觉数组语法，并没有对象语法来得灵活。但是可以同时应用几个JS对象，可能是不同层面上的灵活，一个是对一个JS对象不同样式的灵活，一个是对不同JS对象的灵活。

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```



### v-bind与Style

#### 对象语法

这里不像与Class绑定，根据true或者false去选择Style了。**而是直接用起了Style中的各种属性。** Key-Value，左边是**属性名**，右边是**属性值**。



注意：这里不能少了**花括号** 

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```





**其实花括号里面就是一个JS对象** ，所以还可以这么写。

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```



还没有搞清楚的是，单引号和双引号应该如何使用。感觉是交叉使用。

1. Style后面跟双引号
2. 正常的Style后面的Key-Value都是不用引号



#### 数组语法

> 应该主要是为了可以同时应用几个js对象

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

```js
data: {
  baseStyles: {
    color: 'red',
    fontSize: '13px'
  },
   overridingStyles:{
       color:'black'
   }
}
```

---

## 计算属性和侦听器
> [Vue.js官网对计算属性的描述](https://cn.vuejs.org/v2/guide/computed.html



### 计算属性

#### 基本语法

就是Vue的``Computed``属性，``Computed``属性里面再加上 key-value，Vaule可以换成一个方法。

```htm
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```



```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```



#### 计算属性缓存VS方法

我们发现不使用``Computed``属性，换成methods也可以达到同样的效果。



```js
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```



计算属性会进行一个缓存，**只要相关的依赖**没有发生改变就会直接返回缓存。而methods是每次都会执行一遍。

下面这个例子是``Computed``但是并不存在相关依赖，所以``now``这个属性永远不会发生改变.

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```



#### 计算属性与侦听属性

计算属性在有依赖时,自带侦听功能,而不需要手动Watch



```html
<div id="demo">{{ fullName }}</div>
```



使用Watch

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```



使用Computed依赖自动侦听

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```



#### 计算属性的Setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter(更加细分的写法出现了)

目前我觉得,有了setter,``Computed``属性可以被随意改变了,我也不知道是好是坏.

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```



### 侦听器

> 待


## 条件渲染

### `v-if` 和 `v-if-else` 和 `v-else`

`v-if` 用于条件性地渲染一块内容(一个元素，当然元素也可以嵌套元素)，只有在指令表达式返回truthy时，内容才会被渲染。

```js
<h1 v-if="awesome">Vue is awesome!</h1>
```

**`v-if` 与`v-else` 联合** 

```js
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

注意：这两个元素必须连在一起才能被解释为一个 if-else 结构。可以看出这是脚本语言地一大特点。

**还有`v-if-else``**
这样就成了真正地if-else-if结构

```js
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

注意:v-之后后面双引号括起来的是表达式，js表达式，可以代表着变量，运算式。可以注意到，双引号内嵌套单引号来表达字符串。

### `v-show`
**表面上** 跟`v-if`的作用类似。

```html
<h1 v-show="ok">Hello!</h1>
```

不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display。

就是`v-if`中如果为false，元素是不会存在于源代码中了，也即从DOM树中剔除。但是`v-show`只是通过设置`display:none`把元素隐藏起来，其实元素还是在源代码中，还在DOM树中。

`v-if`像是真正的条件渲染，`v-show`其实是一直都会渲染(加载到DOM树上)，只是通过css隐藏起来。



## 列表渲染

### `v-for` 与数组

同样这些，这些语法也符合脚本语言的简洁。`item`遍历数组时的值，`index`是遍历数组时的下标。**而且它们两个的顺序是固定的**，第一个参数是值，第二个参数是index(想一想有没有可能直接取下标而不取值)

```html
<ul>
    <li v-for="item ,index in items">
        {{item.message}},{{index}}
    </li>
</ul>
```

```js
var vm = new Vue({
    el:"#app",
    data:{
        items:[
            {message:"Foo"},
            {message:"Bar"}
        ]
    }
})
```



### `v-for` 与对象

基本的，同样可以对一个对象内的元素进行遍历。此外，还可以获取对应元素的key。

```html
<li v-for="value , key in object">
    {{value}},{{key}}
</li>
```



```js
var vm = new Vue({
    el:"#app",
    data:{
        object:{
            title:"How to do list in Vue",
            author:"coderon",
            publishAt:"2021-10-13"
        }
    }
})
```



还可以用第三个参数哦 `index`

```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```



### 维护状态

有没有考虑过，当你使用`v-for`后，也就是对象被渲染成了一些DOM节点。那如果，对象发生了变化呢？DOM节点应该如何发生变化？

Vue默认是，如果对象的顺序发生了变化，那就直接DOM节点的内容转换一下，而不是转换DOM节点的顺序。**那如果你想重新排序每个DOM节点呢？** 就应该给节点加上一个key。

```html
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```



### 数组更新检测

#### 变更方法

> 当你想对数组进行处理的时候，Vue方便快捷的函数

- `push()`
- `pop()`
- `shift()`  //左移
- `unshift()` //右移
- `splice()`  //拼接删除等处理
- `sort()`
- `reverse()`



### 显示过滤/排序后的结果

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

例如：

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```



这里说一下 `filter`的原型。可以参考一下这里[filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 

```js
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```

主要需要注意的是，传入一个函数，函数里面传入一个数组，然后对数组每一个元素执行函数，如果返回值为真，则用这个元素来创建新数组。



**如果不用计算属性，还可以用methods** 

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```

```js
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```



### `v-for` 使用里值范围

`v-for`还可以这么写

```js
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

结果:

```html
1 2 3 4 5 6 7 8 9 10
```



### `v-for`与template使用

> 反正就是起到一个，模板化的作用

比如

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```



### `v-for`与`v-if` 

> 官方很**不推荐**`v-for` 与`v-if`一起使用，具体我也说不清。主要考虑到性能问题，如果你硬是要用`v-for`和`v-if`，可以通过下面的例子来优化。

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。** 

[官方对于`v-for`和`v-if`的描述](https://cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起必要)



- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。
- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)。



#### 例子一

**修改前**

> 本质上，**每一次** 刷新网页都会遍历所有元素

```html
<ul>
    <li v-for="user in users" v-if="user.isActive">
        {{user.id}}:{{user.name}}		
    </li>
</ul>
```



```js
data:{
    users:[
        {id:1,name:'coderon',isActive:true},
        {id:2,name:'jinlong',isActive:false}
    ]
}
```



**修改后**

> 使用computed 缓存下来需要展示的元素，并且如果users数组没有发生变化，便不会去遍历数组。这样就解决了，之前每次刷新都要遍历数组的问题。

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```



#### 例子二

> 对官网中，第二个例子不是很理解。因为没有完整的data举例子。



## 事件处理

> 事件主要就是指DOM的一些事件，这里做了关于鼠标点击还有键盘的笔记。(DOM事件还有很多)



### 监听事件`v-on`

监听事件，就用`v-on`来绑定。后面还可以跟具体的类型，比如点击事件用`v-on:click`，键盘可以用`v-on:keyup`。**这样的统一性就很强。** 



示例

>  click事件除了可以绑定一些js代码，还可以绑定一些方法。

```html
<div id='app'>
    <div id="example-1">
        <button v-on:click="counter+=1">数值:{{counter}}</button>
        <button v-on:click="greet('abc',$event)">Greet</button>
    </div>
</div>
```



```js
var vm = new Vue({
    el:'#app',
    data:{
        counter:0,
        name:"Vue"
    },
    methods:{
        greet:function(str,e){
            alert(str);
            console.log(e);
        }
    }
})
```



**补充**

说真的，绑定事件后跟的一些js代码，真的不是很多。比如下面这样就不行。

```html
 <button v-on:click="console(count)">数值:{{counter}}</button>
```

就好像绑定一个Vue对象之后，只能执行一些**加减乘除** ，或者Vue对象methods中的函数，而不能直接执行js的一些库函数。





### 事件修饰符

在捕获到某种事件之后，我们还希望有更细致的划分，所以就有了事件修饰符。



- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`



```js
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```



但是就我个人来说，我对DOM事件处理的需求不多，因此这里只是简单做个笔记，没有深刻了解。



## 表单输入绑定

> 主要就是`v-model`的使用



### 基础用法

`v-model`是用于双向绑定的，html控件的value会和js对象进行绑定。事实上`v-model`只是语法糖，等于`v-bind`加上事件监听，到底是哪种事件，Vue也会自动判断。应用的表单包括`<input>`、`<textarea>` 、`<select>`、`checkbox `和`radio`。

**注意：** 

>  `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。



#### 文本

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```



注意：这时候value属性已经不能像以前一样声明控制了。**(就是这个值在代码里面还是有的，但是不会展现出来)** 

```html
<input v-model="message" value="initValue" placeholder="edit me">
//这段代码的value并不会起作用
```



#### 多行文本

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```



注意：对于`<textarrea>`下面代码的`{{message}}`也不会起作用了。**(就是这个值在代码里面还是有的，但是不会展现出来)** 

```html
<textarea v-model="message2">{{message}}</textarea>
```



#### 复选框

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```

```js
new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
```



对于单选框或者复选框，`<label for=""></label>`我是第一次见，但是可以理解，主要是通过for和input联系起来。



#### 单选按钮

```html
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
```

```js
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```



#### 单选框

```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```



**option可以编程动态的**

```html
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```

```js
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

#### `v-bind` 与 `v-model`区别？

`v-bind`是一种单向绑定，Vue对象发生变化，html的value才会发生变化，而html发生变化，Vue不会变化。

```html
<input v-bind:value="message" placeholder="edit me" />
```



`v-model`则是双向绑定，本质是`v-bind`加上`v-on`

```html
<div>
     <input type="text" @input="handleInput" :value="message" />
     <div>{{message}}</div>
     
</div>
```

```js
new Vue({
  el: '...',
  data: {
    message: ''
  },
  methods:{
      handleInput(e){
      	this.message = e.target.value;
       }
  }
})
```



## 组件基础



### 基础示例

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: `<button v-on:click="count++">You clicked me {{ count }} times.</button>`
})
```

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
new Vue({ el: '#components-demo' })
```



**注意点**

1. 如何定义一个组件？(Vue的静态方法，参数有componentName，Vue对象)
2. template之后接着的是**反引号**
3. 定义了组件之后，需要把它挂载到某个与Vue绑定的html元素内



### 组件复用

定义好组件之后，其实就可以直接复用，就是代码一样。但是需要注意，组件的所有数据是不是都是**每次都会新创建**

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```



#### 注意data的形式

在创建组件时，数据使用的是函数，而不是直接定义一个对象。可能是Vue设计出组件，就是希望互不影响吧，如果直接给data一个对象，其它组件可能都共享这个data了，所以直接在语法层面就规定了必须使用function且有return。

```js
  data: function () {
    return {
      count: 0
    }
```



这样会报错

```js
data:{
    count:0
}
//The "data" option should be a function that returns a per-instance value in component definitions
```



**如果你想组件共享data，还可以有这种骚操作**

在外面定义一个变量，再返回。

```js
var buttonCounter2Data2 = {count : 0}

Vue.component('button-counter',{
    data:function(){
        return buttonCounter2Data2;
    }
    template: `<button @click="$emit('clickhere',count++)">You click me</button>`,
})
```



### 组件的组织



#### 全局注册

> 像上面例子提到的，就是全局注册



#### 局部注册

> 还没学到



### 自定义attribute和Prop

> 示例组件

```js
Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})
```





```js
<div id="app">
    <blog-post title="My journey with Vue"></blog-post>
	<blog-post title="Blogging with Vue"></blog-post>
	<blog-post title="Why Vue is so fun"></blog-post>
</div>
```

```js
new Vue({
    el:"#app"
})
```





```html
<div id="app-2">
    <blog-post
               v-for="post in posts"
               v-bind:key="post.id"
               v-bind:title="post.title"
               ></blog-post>
</div>
```

```js
new Vue({
    el: '#app-2',
    data: {
        posts: [
            { id: 1, title: 'My journey with Vue' },
            { id: 2, title: 'Blogging with Vue' },
            { id: 3, title: 'Why Vue is so fun' }
        ]
    }
})
```

也许，你又忘记了`v-bind:key`的作用。没关系，以后再想。



### 监听子组件事件



```html
<div id="blog-posts-events-demo">
    <div :style="{ fontSize: postFontSize + 'em' }">
        <blog-post
                   v-for="post in posts"
                   v-bind:key="post.id"
                   v-bind:post="post"
                   v-on:enlarge-text="postFontSize += 0.1"
                   ></blog-post>
    </div>
</div>
```

```js
Vue.component('blog-post', {
    props: ['post'],
    template: `
        <div>
        <h3>{{ post.title }}</h3>
        <button v-on:click='$emit("enlarge-text")'>
        Enlarge text
        </button>
        <div v-html="post.content"></div>
        </div>
        `
})

new Vue({
    el: '#blog-posts-events-demo',
    data: {
        posts: [
            { id: 1, title: 'My journey with Vue' },
            { id: 2, title: 'Blogging with Vue' },
            { id: 3, title: 'Why Vue is so fun' }
        ],
        postFontSize: 1
    }
})
```



#### 在组件上使用`v-model`

想想之前的`v-model`用法，html与Vue变量的双向绑定。

```html
<input v-model="searchText">
```

**等价于**

```js
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```



> 示例

```html
<custom-input v-model="searchText"></custom-input>
```

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

**注意写法**

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出



**想想这里的template为什么不可以直接用`v-model`?或者说可以不写任何东西，而在外面直接`v-model`吗？**

TODO



### 插槽

> 在绑定了Vue之后，html元素就不能随便插值了。但是Vue也提供了方法，插槽来改善这个功能。



```html
<alert-box>
  Something bad happened.
</alert-box>
```

```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```



### 动态组件

> TODO

目的就是可以动态地切换不同组件



```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以包括

- 已注册组件的名字，或
- 一个组件的选项对象



**补充**

第一次见`<component></component>`这个默认标签，第一次见`is`这个属性。



# 这就是Vue.js吗

### 创建一个Vue对象

创建一个Vue对象是通过一个Json对象来创造，并且这个Json可以有很多属性，你可以添加，也可以不添加。

Key | 作用
-----|----
el   |
data |
methods|
computed|
||





## 默认属性



### `emit`

> [vue.js的emit](https://cn.vuejs.org/v2/api/#vm-emit)

`vm.$emit( eventName, […args\] )`

- 参数
  - `{string} eventName`
  - `[...args]`

**作用**

触发当前实例上的事件。附加参数都会传给监听器回调。(就是这个eventName)

可以通过args，传递信息给父组件。**也就是第二个参数是抛出去给父组件的**





- 示例

注意:`template`后用的是反引号 **`**

```html
Vue.component('welcome-button', {
  template: `
    <button v-on:click="$emit('welcome')">
      Click me to be welcomed
    </button>
  `
})
```

```html
<div id="emit-example-simple">
  <welcome-button v-on:welcome="sayHi"></welcome-button>
</div>
```

```js
new Vue({
  el: '#emit-example-simple',
  methods: {
    sayHi: function () {
      alert('Hi!')
    }
  }
})
```

运行逻辑:

1. 通过一个`click`事件，去触发`welcome`事件
2. `welcome`事件，会去调用`sayHi` 函数



**就感觉自定义一个事件也挺随便的。定义好之后，也需要自己来触发，一般是通过原有的事件来触发你的事件。**







### `event`

