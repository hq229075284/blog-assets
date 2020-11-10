---
title: es6相关
date: 2020-11-10 10:14:44
categories:
tags:
    - es6
---

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

### 可迭代协议

要成为可迭代对象，一个对象（或原型链上）必须实现`@@iterator`方法，当一个对象需要被迭代的时候（比如被置入一个 for...of 循环时），首先，会不带参数调用它的`@@iterator`方法，然后使用此方法返回的迭代器获得要迭代的值。
