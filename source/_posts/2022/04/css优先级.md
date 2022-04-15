---
title: css选择器和style属性的权值计算和比较
categories: css
tags: css
date: 2022-04-15 16:11:10
banner:
---



[16. Calculating a selector’s specificity](https://drafts.csswg.org/selectors/#specificity-rules)

![](https://s1.ax1x.com/2022/04/15/L8eZRJ.png)

[6.4.3 Calculating a selector's specificity](https://www.w3.org/TR/CSS21/cascade.html#specificity)

![](https://s1.ax1x.com/2022/04/15/L8eqyR.png)

## 误区

[在学习过程中，你可能发现给选择器加权值的说法，即 ID 选择器权值为 100，类选择器权值为 10，标签选择器权值为 1，当一个选择器由多个 ID 选择器、类选择器或标签选择器组成时，则将所有权值相加，然后再比较权值。这种说法其实是有问题的。比如一个由 11 个类选择器组成的选择器和一个由 1 个 ID 选择器组成的选择器指向同一个标签，按理说 110 > 100，应该应用前者的样式，然而事实是应用后者的样式。错误的原因是：权重的进制是并不是十进制，CSS 权重进制在 IE6 为 256，后来扩大到了 65536，现代浏览器则采用更大的数量。。还是拿刚刚的例子说明。11 个类选择器组成的选择器的总权值为 110，但因为 11 个均为类选择器，所以其实总权值最多不能超过 100， 你可以理解为 99.99，所以最终应用后者样式。](https://www.runoob.com/w3cnote/css-style-priority.html)

<!-- more -->

## 其他参考

<div>
<img src="https://s2.loli.net/2022/04/15/u3oljALRWFU9sIz.png"></img>
<img src="https://s2.loli.net/2022/04/15/6hfatsvY8d2lFgK.png"></img>
</div>