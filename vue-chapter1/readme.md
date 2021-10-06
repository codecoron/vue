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





# 这就是Vue.js吗

### 创建一个Vue对象

创建一个Vue对象是通过一个Json对象来创造，并且这个Json可以有很多属性，你可以添加，也可以不添加。

Key | 作用
-----|----|
el   | 
data |
methods|
