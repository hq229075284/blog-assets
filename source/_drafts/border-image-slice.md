---
title: border-image-slice
tags: css
categories: css
banner:
---

![img](IMG_0452.JPG)

border-image-slice将元素区域（border-box）分割成9个区域，其中8个区域分别对应构成border的8个区域。
每个由borderr-image-slice划分的区域内的图像将被渲染到对应的border区域中。

如上图，
假如border-image-slice的值为`40 60`，表示垂直距离为40px，水平距离为60px，区域`1`的大小为60*40（长*宽），内中渲染对应区域的图像
假如border的值为`20`，表示border-top-width为20px，border-left-width为20px，区域`1`的大小为20*20（长*宽），内中渲染border-image-slice划分的区域内的图像