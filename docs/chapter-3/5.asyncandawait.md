# async 和 await 

学好这篇，你必须理解了`Promise`的用法。特别是`Promise`的`then`链处理

## async 起什么作用

我们声明一个`async`函数，直接输出它的返回值，看看会发生什么事。

```js
async function testAsync() {
    return "hello async";
}
 
const result = testAsync();
console.log(result);
```

看到输出你就会悟了，它返回了一个`Promise`对象

## await 到底在等啥

如果`xxx()`是一个返回`Promise`对象的函数，那么await是等待该`Promise`对象中调用`resolve(x)`或`reject(x)`中的参数`x`
```js
let n = await xxx()
```


## 如何使用

现在开始制作一个延时计算器，它可能在世纪的工作中并没有什么用处，但是用来演示该篇是再好不过了。

定义一个`multiply`函数，它返回一个`Promise`对象，这个`Promise`对象调用的函数，将在1秒后返回`reslove(input*input)`的值。

```js
function multiply(input) {
    return new Promise(function (reslove, reject) {
        console.log(input * input);
        setTimeout(reslove, 1000, input * input);
    });
}
```

再定义一个`add`函数，它返回一个`Promise`对象，这个`Promise`对象调用的函数，将在1秒后返回`reslove(input+input)`的值。

在`Promise`中我们知道，`Promise`中的函数调用了`resolve`，那么会将`reslove`中的参数传到`then`中。

```js
let p = new Promise(function (resolve, reject) {
    reslove(666)
})
p.then(function (x) {
    console.log(x); // 666
})
```

现在我们定义一个使延时计数器开始的`start`函数，仔细理解这一段代码，它并不是很难。他将从10开始，先对自身乘一次，再与自身相加三次。

```js
let start = new Promise(function (reslove, reject) {
    reslove(10);
})

start.then(multiply)
    .then(add)
    .then(add)
    .then(add)

start(10)
console.log("那么，我现在要开始吟唱了！")
```

现在将上述代码贴到浏览器中运行试试吧！

## 实操

如果我们使用 `async` 和 `await` 看看会发生什么事情吧。

我先入为主的告诉你，如果改写的话，他将长成这个样子。

```js
async function start(a) {
    let b = await multiply(a);
    let c = await add(b)
    let d = await add(c)
    let e = await add(d)
}

start(10)

console.log("那么，我现在要开始吟唱了！")
```

好的，你会发现会稍微比之前的写法好看那么一点。在运行的过程中，你也可以不断的将`a`、`b`、`c`、`d`的方式中打印出来，你会发现他们的值，全是`reslove(x)`函数中的`x`。

你恍然大雾！原来`await`函数，等待的值，是`reslove`中的参数啊！

那如果调用的是`reject`呢？很可惜，如果按照上面的写法，在`reject`过后将`reject(x)`的参数`x`作为错误抛出来。

恩，得`try/catch`。或者使用`Promise`的`catch`也可以。

```js
async function start(a) {
    let b = await multiply(a).catch((error) => {
        console.log(error)
    });
    console.log(b)
    let c = await add(b)
    let d = await add(c)
    let e = await add(d)
    console.log('结束啦')
}

start(10)

console.log("那么，我现在要开始吟唱了！")
```

好了，我不想写了，已经知道大致的用法了。

## 复述指引

* 把上面的代码关掉丢掉这张纸后再敲一遍。