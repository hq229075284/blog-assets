---
title: css-grid
tags:
categories:
banner:
---

# css-grid

## 网格

> :warning:  :arrow_down: 以下显式网格、隐式网格暂不考虑溢出的情况

### 显式网格

+ grid-template-columns：指定显式网格列的数量和列宽
+ gird-template-rows：指定显式网格行的数量和行高

grid-template-columns和gird-template-rows所构成的网格为显式网格，其它额外创建的网格为隐式网格

1. 网格容器宽度固定时
   1. 网格宽度为固定值，该列的列宽等于这个固定值
   2. 网格宽度为n`fr`时，该列的列宽为`容器宽度-固定网格宽度`后被列等分后的n份
2. 网格容器高度固定时，
   1. 网格高度为固定值，该行的行高等于这个固定值
   2. 网格高度为n`fr`时，网格的行高为`容器高度-固定网格高度`后被行等分后的n份
3. 网格容器未指定高度时，显式网格内的网格高度由同行内容高度最高的网格决定
4. 网格容器未指定宽度且不超过父级元素宽度时，所有网格宽度由所有网格中内容宽度最大的网格决定

### 隐式网格

+ grid-auto-columns：指定隐式网格的列宽

+ grid-auto-rows：指定隐式网格的行高

1. 容器大小固定时，网格大小按网格容器等分计算，同`显式网格的1和2`
2. 容器大小不固定时，同`显式网格的3和4`

### 显示/隐式混合同时存在于网格容器中

若网格容器内同时存在隐式网格和显式网格：

1. 容器大小固定时，所有网格的宽度计算同`显式网格的1`，隐式网格高度计算同`显式网格的3`，显式网格的高度计算是在网格容器高度减去隐式网格占用高度后剩余高度的基础上，进行同`显式网格的2`
2. 容器大小不固定时，同`显式网格的3和4`

## [fr](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#fr_%E5%8D%95%E4%BD%8D)

`fr`单位表示网格布局前，扣除明确的使用空间（如：500px）后，剩余可用空间被等分后的一份

```css
.grid{
    grid-template-columns: 500px 1fr 2fr; // 计算方式 => (width - 500px)/(1fr + 2fr)
}
```

## minmax

网格行高或列宽的大小限定区间

## 参考

+ [网格布局的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
