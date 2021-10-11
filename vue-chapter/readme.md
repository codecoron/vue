> 基于Vue2.x

> [Vue-api](https://cn.vuejs.org/v2/api/#全局配置)

# 起步
## Vue实例

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



#### vbind和v-on缩写

原来还有缩写

``v-bind``简写成  ``:``

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



# 这就是Vue.js吗

### 创建一个Vue对象

创建一个Vue对象是通过一个Json对象来创造，并且这个Json可以有很多属性，你可以添加，也可以不添加。

Key | 作用
-----|----
el   |
data |
methods|
computed|

