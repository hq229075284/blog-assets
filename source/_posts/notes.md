---
title: notes
# date: 2019-02-15 10:52:59
tags:
---

# 杂记
<!-- TOC -->

- [杂记](#%e6%9d%82%e8%ae%b0)
  - [white-space表现形式](#white-space%e8%a1%a8%e7%8e%b0%e5%bd%a2%e5%bc%8f)
  - [terset配置](#terset%e9%85%8d%e7%bd%ae)
  - [MutationObserver注意点](#mutationobserver%e6%b3%a8%e6%84%8f%e7%82%b9)
  - [容器出现滚动条时，子容器的宽度是否因为滚动条而改变](#%e5%ae%b9%e5%99%a8%e5%87%ba%e7%8e%b0%e6%bb%9a%e5%8a%a8%e6%9d%a1%e6%97%b6%e5%ad%90%e5%ae%b9%e5%99%a8%e7%9a%84%e5%ae%bd%e5%ba%a6%e6%98%af%e5%90%a6%e5%9b%a0%e4%b8%ba%e6%bb%9a%e5%8a%a8%e6%9d%a1%e8%80%8c%e6%94%b9%e5%8f%98)
  - [webpack 多线程和cache优化](#webpack-%e5%a4%9a%e7%ba%bf%e7%a8%8b%e5%92%8ccache%e4%bc%98%e5%8c%96)
  - [其他记录-以后分类](#%e5%85%b6%e4%bb%96%e8%ae%b0%e5%bd%95-%e4%bb%a5%e5%90%8e%e5%88%86%e7%b1%bb)

<!-- /TOC -->

## white-space表现形式

| white-space👇 | 空格(` `)                                    | 非断空格(`&nbsp;`) | 换行符(`\n`)                           |
| ------------- | -------------------------------------------- | ------------------ | -------------------------------------- |
| normal        | 保留1个空格，或者在多空格的时候仅保留1个空格 | 全部非断空格都保留 | 表现为1个空格，不换行                  |
| pre           | 保留全部的空格                               | 全部非断空格都保留 | 会换行，但当文本溢出容器时不会自动换行 |
| pre-line      | 保留1个空格，或者在多空格的时候仅保留1个空格 | 全部非断空格都保留 | 会换行                                 |
| pre-wrap      | 保留全部的空格                               | 全部非断空格都保留 | 会换行                                 |
| no-wrap       | 保留1个空格，或者在多空格的时候仅保留1个空格 | 全部非断空格都保留 | 表现为1个空格，不换行                  |

<!-- more -->

## terset配置
```javascript
new TerserPlugin({
    // test: /\.js(\?.*)?$/i,
    // exclude: /node_modules/,
    terserOptions: {
        // ecma: undefined,
        warnings: false,
        parse: {
            ecma: 8
        },
        compress: {
            ecma: 5,// 默认值，防止es5代码被替换成es6+的代码
            passes: 3,
            pure_funcs: ['console.log', 'console.info'],
            toplevel: true
            // https://github.com/terser/terser/issues/120（已修复）
            // inline: 2
        },
        mangle: true, // Note `mangle.properties` is `false` by default.
        output: {
            ecma: 5, // 默认值，防止es5代码被替换成es6+的代码
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
        },
        module: false,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
    },
    // parallel: getCpuCount()
})
```

## MutationObserver注意点

```javascript
observer=new MutationObserver(mutations=>{
console.log('1',mutations)
})

observer2=new MutationObserver(mutations=>{
console.log('2',mutations)
})

observer3=new MutationObserver(mutations=>{
console.log('3',mutations)
})

const input=document.querySelector('input')
observer3.observe(input,{attributes: true})
observer2.observe(input,{attributes: true})
observer.observe(input,{attributes: true})

setTimeout(()=>{
    input.classList.add('a1')
},1000)

// 当监听的元素发生改变时会按new的顺序执行监听回调
// 所以结果为:
//  1 [MutationRecord]
//  2 [MutationRecord]
//  3 [MutationRecord]
```

## 容器出现滚动条时，子容器的宽度是否因为滚动条而改变

> TODO:增加测试数据表格

仅当初次渲染时，子元素的高度超过父元素的高度（此时父元素的`overflow-y`值为`auto`），导致父元素出现滚动条，如果子元素的宽度是一个固定的大小，且在视图上与滚动条有重合，此时滚动条会覆盖在子元素的视图上，当再次触发渲染时，恢复正常（出现横向滚动条），此现象在水平和垂直方向上都存在

## webpack 多线程和cache优化

|                                        | 第一次pack(ms) | 第二次pack(ms) |
| -------------------------------------- | -------------- | -------------- |
| 无优化                                 | 54561          | 53825          |
| cache-loader                           | 52237          | 48472          |
| thread-loader                          | 52445          | 52049          |
| cache-loader & thread-loader           | 55297          | 52036          |
| hard-source-webpack-plugin（缺乏维护） | 54447          | 42747          |

> `cache-loader`、`thread-loader`优化不明显，后期再看看

## 其他记录-以后分类

+ absolute定位将relative定位的父级的padding区域左上角视为原点
+ 在无relaitve父级的情况下，将window窗口的左上角视为原点
+ DOM中ELEMENT元素在动画和过渡的过程中，通过`getClientRects`获取的ELEMENT元素位置信息是实时的，在变化的过程中会持续改变