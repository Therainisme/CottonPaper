# 闭包

## 问题产生

你现在想实现一个计数器！于是开始开始捣鼓代码。

```js
var times = 0;
function inc () {
    times ++;
    return times;
}
```

接下来如果调用`inc()`，一个简易的计数器就做好了！此时你的小伙伴来找你合并代码，她的代码中也有一个`times`，另一个问题因此而产生。这个`times`变量在全局变量中，不同逻辑代码因此共用了同一个变量。为了正常运行代码，你俩其中一个必须把变量给改名了......

改来改去是个人都会烦。闭包可以解决这个问题，所以为了与她解决冲突，你一定要把它学会！

## 闭包思想

来看一些代码吧
```js
var outer = 1;
function that () {
    var inner = 0;
}
```
可以自己试试看，在`that`函数外部，无法调用`inner`变量，但是在`that`函数内部，调用外部的`outer`变量。而且函数`that()`运行结束后，其内部的变量`inner`会被释放。

那有没有一种方法，在调用函数后，内部的变量还能保存在内存中且能被外部的程序语句调用呢？

这稍微有点像是面向对象中类的实例所拥有的私有变量了，可以自己感受一下。

```java
class Person {
    private int age = 18;
    public int getAge () {
        return this.age;
    }
}
```

现在开始感受闭包的魅力吧！

这是是一个用闭包方式写的一个定时器，它会返回一个它的子函数，子函数中返回的是`createCounter()`中的变量`times`，而`times`并不是全局变量，`createCounter()`函数外部的语句无法调用局部`times`，所以不会污染代码。

```js
function createCounter () {
    var times = 0;
    return function () {
        times ++;
        return times;
    }
}
var inc = createCounter();
// 接下来不断调用 inc() 看看吧
```

闭包用起来简单，实现起来可不容易！有一个值得注意的问题，当闭包的返回函数引用了循环变量之后，可能会出现一些意外。

接下来这个函数并没有什么实际的意义，只是为了举例说明。`that`函数会返回一个数组，这个数组中存放着三个子函数。每个子函数会返回当前循环变量`i`的值。

```js
function that () {
    var res = [];
    for (var i = 1; i <= 3; ++ i) {
        res.push(function () {
            return "i = " + i;
        });
    }
    return res;
}

var example = that();
example[0](); // 4
example[1](); // 4
example[2](); // 4
```

运行结果全是4！子函数虽然存放在了数组中，但是并没有立即调用。等你调用子函数时，循环已经停止，`i`的值已经是`4`了。

解决方案肯定是有的，会稍微有点绕。我们需要一个不变的东西去替代`i`。那么再搞一个函数吧，把`i`作为它的参数。

```js
function that () {
    var res = [];
    for (var i = 1; i <= 3; ++ i) {
        res.push((function (n) {
            return function () {
                return "i = " + n;
            }
        })(i)); // 注意这里，把i作为参数传入！
    }
    return res;
}

var example = that();
example[0](); // 1
example[1](); // 2
example[2](); // 3

```

运行试试看！此时问题就解决了。注意这里用了一个“创建一个匿名函数并立刻执行”的语法：

```js
(function (x) {
    return x * x;
})(3); // 9
```

你已经学会了闭包，和她上个号庆祝一下吧！

## 复述指引
* 当内部函数被保存到外部时，将会生成闭包。
* 可以读取到其他函数内部的变量
* 可以将变量保存在内存中
* 闭包会导致原有作用域链不释放，造成内存泄漏（内存占用）
