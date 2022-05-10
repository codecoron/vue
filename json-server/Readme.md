# json-server

主要是学习`json-server`的使用，如何接收请求，get、post

看了一下官网之后，这些json的格式是挺固定的，很容易明白

```shell
get
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile

post
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile

# 注意：posts和comments都是会追加数据，因为他们的values是数组，而profile是会覆盖数据，因为它的value就是个value

```

```json
{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    },
    {
      "title": "title4",
      "author": "author4",
      "id": 2
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

你还可以这么查询(根据id)
```shell
# 访问指定id的
http://localhost:3000/posts/1
http://localhost:3000/posts/2

# 之所以可以这样，是因为posts的value对应一个数组，并且数组中每一个{}都是有id属性的
```

你还可以这么查询(根据某个属性)
```shell
http://localhost:3000/posts/?author=author
# 根据posts数组下面的author属性，它会去遍历所有的{}
```

我发现一个小BUG
```shell
# 如果我条件查询一个不存在的属性 GET /posts/?wwww=www
# 它会把posts的数据全部都返回
```

**route**
```json
{
    "/api/*": "/$1",
    "/:resource/:id/show": "/:resource/:id",
    "/posts/:category": "/posts?category=:category",
    "/articles\\?id=:id": "/posts/:id"
}
```

注意`category`是一个属性，并非一个关键字。所以我也没有搞懂作者写这么一个例子的用途


json-server支持配置，可以把数据写进`json-server.json`，本质上是把json-server选项的数据写进`json-server.json`

```shell
json-server --watch db.json # 如果有json-server.json在同当前目录有没有json-server.json 

json-server --watch ./db/db.json # 同理也是会去读取当前目录有没有json-server.json 

所以重点都是当前目录
```


## 其它

**json-server**首页访问不了

1. 通常我们执行  `json-server --watch ./db.json`

访问`http://localhost:3000` 会跳到`json-server`的首页

2. 但是如果我们执行 `json-server --watch ./db/db.json`(就是在执行命令时，不在db.json所在的目录)

这时候访问`http://localhost:3000` **就找不到**json-server的首页

3. 当我们执行`json-server --watch ./db.json` 

但是，db.json的目录下，有其它目录存在时，也是访问不了`json-server`首页
```shell
--- public/
--- db.json
```

