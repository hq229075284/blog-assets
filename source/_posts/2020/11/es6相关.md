---
title: es6相关
date: 2020-11-10 10:14:44
categories:
tags:
    - es6
---

<!-- TOC -->

- [super在babel中的实现](#super在babel中的实现)
- [迭代器规范](#迭代器规范)
- [可迭代协议](#可迭代协议)
  - [可迭代对象特征](#可迭代对象特征)
- [迭代器协议](#迭代器协议)
  - [迭代器对象特征](#迭代器对象特征)

<!-- /TOC -->

## super在babel中的实现

```javascript
class a {
    constructor(){
        this.a=1
    }
}

class b extends a {
    constructor(){
        super()
    }
}

```

编译后

```javascript
// ...some helper function
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct()
    return function _createSuperInternal() {
        // 在调用前，_inherits函数中已将父类函数挂到子类函数的原型链上，即b.__proto__===a
        // 所以这个的Super就是b.__proto__，即父类a
        var Super = _getPrototypeOf(Derived), result
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        } return _possibleConstructorReturn(this, result)
    }
}

var a = function a() {
  _classCallCheck(this, a);

  this.a = 1;
};

var b = /*#__PURE__*/function (_a) {
  // b的prototype的__proto__指向a的prototype，属性调用时：检查b实例的属性=>检查b的prototype的属性=>检查a的prototype的属性
  // 其中会调用_setPrototypeOf函数,将a挂到b的原型链上，b.__proto__===a
  _inherits(b, _a);

  // 创建super函数，内部存储b为Derived参数
  var _super = _createSuper(b);

  function b() {
    _classCallCheck(this, b);

    return _super.call(this);
  }

  return b;
}(a);
```

## 迭代器规范

> 参考
> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols>

## 可迭代协议

要成为可迭代对象，一个对象（或原型链上）必须实现`@@iterator`方法，当一个对象需要被迭代的时候（比如被置入一个 for...of 循环时），首先，会不带参数调用它的`@@iterator`方法，然后使用此方法返回的迭代器获得要迭代的值。

内置类型拥有默认的迭代器行为:

- Array.prototype\[@@iterator]()
- TypedArray.prototype\[@@iterator]()
- String.prototype\[@@iterator]()
- Map.prototype\[@@iterator]()
- Set.prototype\[@@iterator]()

### [可迭代对象特征](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)

1. 此对象实现了可迭代协议——拥有`@@iterator`函数（即`typeof fn[Symbol.iterator]==='function'`），且`@@iterator`函数执行后返回一个迭代器对象。
2. `@@iterator`函数的`this`默认指向该可迭代对象

## 迭代器协议

### [迭代器对象特征](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE)

1. 此对象实现了迭代器协议——拥有`next`函数，且执行`next`函数后返回`{done:Boolean,value:any}`这样的对象（可在其上加另外的对象属性）
2. `for-of`中`done`为`true`时，`value`属性的值会被忽略

```javascript
const obj2={
    [Symbol.iterator](){
        let i=-1
        const txt=[
            'this will output in both case',
            'just output in call `next` by hand'
        ]
        return {
            next(){
                i++
                return {done:i===txt.length-1,value:txt[}
            }
        }
    }
}
const obj1={
    [Symbol.iterator]:function* (){
        yield 'this will output in both case'
        return 'just output in call `next` by hand'
    }
}
console.log('obj1 output')
var g=obj1[Symbol.iterator]()
console.log(g.next().value)
console.log(g.next().value)
console.log('----')
for(let i of obj1){
    console.log(i)
}
console.log('obj2 output')
var g=obj2[Symbol.iterator]()
console.log(g.next().value)
console.log(g.next().value)
console.log('----')
for(let i of obj2){
    console.log(i)
}
// => 输出结果：

// obj1 output
// this will output in both case
// just output in call `next` by hand
// ----
// this will output in both case

// obj2 output
// this will output in both case
// just output in call `next` by hand
// ----
// this will output in both case
```

<!-- ```javascript
function* a(){
    console.log(this) // {x:1}
    const rec=yield 'abc'
    console.log(rec) // abc1
    yield 123
    console.log('done')
}
const g=a.call({x:1})
const y=g.next()
const n=g.next(y.value+'1')
console.log(n.value) // 123
``` -->
