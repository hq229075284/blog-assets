---
title: glob_match
categories: shell
tags: glob
banner: https://i.postimg.cc/9XBBfbx8/oh-my-glob.gif
date: 2021-05-13 12:50:08
---


# glob match总结（bash下）

- `*`匹配任意数量的非`/`字符
- `?` 仅匹配一个非`/`字符
- `**`匹配任意数量的非`/`字符，而且当它独立构成匹配模式中的一段时，也可以匹配`/`，在`bash`下要开启`globstar`,`shopt -s globstar`
- `[...]`匹配`[]`之间的字符，存在范围匹配时，需要在bash下需开启`globasciiranges`，保证大小写匹配的正常；\[^...] 或 \[!...]匹配不包括在`[]`内的字符；可以通过`[:class:]`使用POSIX标准的匹配关键词：`alnum` 、`alpha`、`ascii` 、`blank`、`cntrl`、`digit`、`graph`、`lower`、`print`、`punct`、`space`、`upper`、`word`、`xdigit`，`word` 匹配字符、数字和`_`
- 多模式匹配及反选
  - ?(pattern|pattern|...)：匹配0个或1个pattern
  - *(pattern|pattern|...)：匹配0个或以上的pattern
  - +(pattern|pattern|...)：匹配1个或以上pattern
  - @(pattern|pattern|...)：匹配其中1个pattern，测试效果和`+(pattern|pattern|...)`相似（**需进一步研究区别**）
  - !(pattern|pattern|...)：不匹配任一pattern

> 参考：`man bash`下的**Pattern Matching**部分
