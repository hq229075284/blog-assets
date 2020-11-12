---
title: es6-es11
date: 2020-11-11 13:28:10
categories:
tags:
    - es
---
<!-- markdownlint-disable MD025-->
# ECMAScript版本

|编年版|简版|描述|
|-|-|-|
|ECMAScript2015|ECMAScript6|-|  
|[ECMAScript2016](#ECMAScript2016)|[ECMAScript7](#ECMAScript2016)|-|  
|[ECMAScript2017](#ECMAScript2017)|[ECMAScript8](#ECMAScript2017)|-|  
|[ECMAScript2018](#ECMAScript2018)|[ECMAScript9](#ECMAScript2018)|-|  
|[ECMAScript2019](#ECMAScript2019)|[ECMAScript10](#ECMAScript2019)|-|
|[ECMAScript2020](#ECMAScript2020)|[ECMAScript11](#ECMAScript2020)|-|
|[ECMAScript2021](#ECMAScript2021)|[ECMAScript12](#ECMAScript2021)|-|

## ECMAScript2016

- Array.prototype.includes
- `**`替代`Math.pow`实现指数的计算

## ECMAScript2017

- Object.values()
- Object.entries()
- String.prototype.padStart
- String.prototype.padEnd
  (⚠️ padStart and padEnd on Emojis and other double-byte chars)
- Object.getOwnPropertyDescriptors([参考](https://es6.ruanyifeng.com/#docs/object-methods#Object-getOwnPropertyDescriptors))
- 允许在函数入参的末尾添加`,`,比如`function a(a1,a2,){...}`
- Async/Await

## ECMAScript2018

- js引擎主进程和worker进程间可使用`SharedArrayBuffer`进行数据共享，并通过`Atomics`来管理共享内容数据
- 允许模板字符串和函数组合使用
  
  ```javascript
    function fn(staticStr,...dynamicParams){
        console.log(staticStr)// ['static1 ',' static2 ','']
        console.log(dynamicParams)// [1,2]
    }
    fn`static1 ${1} static2 ${2}`
  ```

- 正则表达式中`.`可以在`s`模式下匹配所有字符（包括`\n`、`\r`、`\f`等）

  ```javascript
  //Before
  /first.second/.test('first\nsecond'); //false

  //ECMAScript 2018
  /first.second/s.test('first\nsecond'); //true
  // Notice: /s
  ```

- 正则表达式中可以对匹配组合进行命名，格式为：`(?<name>...)`

  ```javascript
  (/(?<cname>abc)/.exec('testabc'))
  /*
    输出:
    [
      'abc',
      'abc',
      groups:{ cname: 'abc' },
      index: 4,
      input: 'testabc'
    ]
  */

  // \k使用之前组合名称匹配到的内容
  let sameWords=/(?<fruit>apple|orange)===\k<fruit>/
  sameWords.test('apple===apple') // true
  sameWords.test('apple===orange') // false

  // 在replace函数中使用组合命名
  let replaceReg=/(?<firstName>[a-zA-z]+) (?<secondName>[a-zA-z]+)/
  'abc def'.replace(replaceReg,'$<secondName> $<firstName>') // 'def abc'
  ```

- 在解构中用`...varName`的方式提取对象中未被指定的属性，重组为一个新的对象，记为`varName`

- 对象可使用`...`进行扩展

- 正则表达式可以使用`向前查找`,查找时消耗查询字符

  ```javascript
  // ['winning',groups:undefined,index:1,input:'#winning']
  (/(?<=#).*/.exec('#winning'))
  
  // 反向
  // ['inning',groups:undefined,index:2,input:'#winning']
  (/(?<!#)[a-z]+/.exec('#winning'))
  // ['',groups:undefined,index:0,input:'#winning']
  (/(?<!#)[a-z]*/.exec('#winning'))

  // PS: (?<!...)会去匹配行首空字符，当匹配到第一个符合匹配规则的，就直接输出
  // 比如：`/(?<!#)[a-z]*/.exec('#winning')`中，(?<!#)匹配的是行首空字符，[a-z]*匹配的是空字符，因为规则无法匹配首字符`#`
  ```

- 在正则表达式中添加`Script`或`Script_Extensions`来扩展`Unicode`的匹配范围

  ```javascript
  //The following matches a single Greek character
  /\p{Script_Extensions=Greek}/u.test('π'); // true
  // 等价于
  /\p{Script=Greek}/u.test('π'); // true
  
  // 反向
  /\P{Script=Greek}/u.test('π'); // false
  ```

- Promise.prototype.finally()
- for-of中使用await，在for循环中，上一个promise resolve后，才会执行下一个promise

  ```javascript
  const promises=[...] // Promise数组
  async function a(){
      for await (const p of promises){
          console.log(p)
      }
  }
  a()
  ```

## ECMAScript2019

- String.prototype.trimStart()
- String.prototype.trimEnd()
- Object.fromEntries()
- Array.prototype.flat()
- Array.prototype.flatMap()
- try-catch中`catch`的参数改为可选
- Symbol.prototype.description输出`Symbol`类型变量的描述
- Array.prototype.sort()，在原来的基础上使用稳定的排序算法，尤其在对象数组中，会根据给定的键之间比较进行排序，同键值的多个对象的顺序与这些对象在原数组中的顺序一致
- Function.prototype.toString(),将返回函数的注释、空格和语法详细信息
- JSON成为ECMAScript的完全子集，可解析之前解析不了的JSON字符串：行分隔符（`\u2028`）和段分隔符（`\u2029`）
- JSON.stringify()输出进行了优化，原来显示未知的字符，现在在字符代码之前插入`\`字符后仍能保持可读性
  
  ```javascript
  // before
  JSON.stringify('\uD83D');// '"�"'
  
  // after
  JSON.stringify('\uD83D');// '"\\ud83d"'
  ```
  
## ECMAScript2020

- 在变量名前加`#`，来定义类私有变量
  
  ```javascript
  class a{
    #p='private'
    print(){
      console.log(this.#p)
    }
  }
  
  var aa=new a

  // 正常
  aa.print() // 'private
  
  // 异常
  // Uncaught SyntaxError: Private field '#p' must be declared in an enclosing class
  console.log(aa.#p)
  ```

- `?.`可选链运算符,符号左侧的值为`undefined`或`null`时，运算表达式返回`undefined`,否则继续执行后续的操作

  ```javascript
  // 形式：
  obj?.prop
  obj?.[expr]
  arr?.[index]
  func?.(args)
  ```

- `??`空值合并运算符,运算符左侧为`undefined`或`null`时，取符号右侧的值，否则取左侧的值
- 动态引入，`import('some.js').then(...)`
- Promise.allSettled，处理多个Promise对象的集合，无论这些Promise对象的状态怎么变化，都会被记录下来，并在所有Promise状态发生变化后，执行then回调，入参为每个Promise状态的集合
- globalThis
- BigInt，通过在数字后面添加`n`来指定数的类型为BigInt,此类型用于处理大于(2^53 - 1)的整数，不可与普通number类型的数据进行操作，但可比较大小

  ```javascript
  11n+11 // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
  ```

- String.prototype.matchAll，返回的是一个可迭代对象，可以通过for-of访问每一个匹配组的结果（包含使用括号定义的捕获组信息）

## ECMAScript2021

- String.prototype.replaceAll
- Promise.any

  ```javascript
  Promise.any(promises).then(
    (first) => {
      // 任何一个 Promise 完成了
    },
    (error) => {
      // 所有的 Promise 都拒绝了
    }
  )
  ```

- 数字分隔符`_`,`let x=2_3333`等价于`let x=23333`
- [Intl](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl).ListFormat，国际化格式化
