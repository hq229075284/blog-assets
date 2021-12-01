---
title: css主题化
date: 2021-12-01 16:10:24
categories:
tags:
banner:
---


# css主题化（use Less）

1. 使用css var（全局变量）

   ```less
   // 当给定值未定义时将会用备用值替换
   @font-size:var(--theme-font-size,36px);
   
   :root{
   
   }
   /* 
   https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties#%E6%9C%89%E6%95%88%E6%80%A7%E5%92%8C%E5%80%BC
   计算时有效性
   1. 检查属性 color 是否为继承属性。是，但是 <p> 没有任何父元素定义了 color 属性。转到下一步。
   2. 将该值设置为它的默认初始值，比如 black。
   */
   body{
     font-size:20PX;
   }
   #app{
     font-size:@font-size !important;
   }
   ```
   
   脚本改变css变量的值

   ```javascript
   function changeTheme(n){
     document.documentElement.style.setProperty('--theme-font-size',n+'px')
   }
   ```

   

2. 多套样式

   ```less
   // 公共部分，theme.less
   // #region 主题变量
   @themes: primary, dark, light;
   
   @colors: #00f, #000, #fff;
   
   @primary-color: #00f;
   @dark-color: #000;
   @light-color: #fff;
   // #endregion
   
   // 在调用该mixin的地方，循环每个主题，生成每个主题对应的样式
   .createThemeStyle(@index) when (@index <= length(@themes)) {
     @theme: extract(@themes, @index);
     .themeStyle(@theme, @index);
     .createThemeStyle(@index+1);
   }
   
   // 开始创建
   .createThemeStyle(1);
   
   // 创建主题下的变量
   .createThemeVar(@theme) {
     @_theme-color: "@{theme}-color";
     @theme-color: @@_theme-color;
   }
   
   // --------------------------
   // 业务部分
   // 引入主题变量
   @import "theme.less";
   // 模式匹配，生成对应的主题样式
   .style-mixin(primary,@index) {
     &.module1 {
       background-color: extract(@colors, @index);
     }
   }
   .style-mixin(dark,@index) {
     &.module2 {
       background-color: extract(@colors, @index);
     }
   }
   .style-mixin(light,@index) {
     &.module3 {
       background-color: extract(@colors, @index);
     }
   }
   // 公共样式
   .style-common() {
     font-size: 16px;
   }
   
   .themeStyle(@theme,@index) {
     // 此mixin在createThemeStyle中会循环调用
     .@{theme} {
       // 注入主题变量
       .createThemeVar(@theme);
       // 使用主题变量
       color: @theme-color;
       // 注入公共样式
       .style-common();
       // 调用对应主题的样式生成mixin
       .style-mixin(@theme, @index);
     }
   }
   ```

   >  精简版

   ```less
   // -----------------------------
   // 公共部分，theme.less
   // #region 主题变量
   @themes: primary, dark, light;
   
   @colors: #00f, #000, #fff;
   
   @primary-color: #00f;
   @dark-color: #000;
   @light-color: #fff;
   // #endregion
   
   // 在调用该mixin的地方，循环每个主题，生成每个主题对应的样式
   .createThemeStyle(@index) when (@index <= length(@themes)) {
     @theme: extract(@themes, @index);
     .themeStyle();
     .createThemeStyle(@index+1);
   }
   
   // 开始创建
   .createThemeStyle(1);
   
   // 创建主题下的变量
   .createThemeVar() {
     @_theme-color: "@{theme}-color";
     @theme-color: @@_theme-color;
   }
   
   // --------------------------
   // 业务部分
   
   // 注入公共样式
   .common {
     font-size: 16px;
   }
   
   // 引入主题变量
   @import "./theme.less";
   
   // 模式匹配，生成对应的主题样式
   .style-mixin(primary) {
     &.module1 {
       font-size: 14px;
       background-color: @theme-color;
     }
   }
   .style-mixin(dark) {
     &.module2 {
       font-size: 15px;
       background-color: extract(@colors, @index);
     }
   }
   .style-mixin(light) {
     &.module3 {
       font-size: 16px;
       background-color: extract(@colors, @index);
     }
   }
   
   .themeStyle() {
     // 此mixin在createThemeStyle中会循环调用
     .@{theme} {
       // 注入主题变量
       .createThemeVar();
       // 使用主题变量
       color: @theme-color;
       // 调用对应主题的样式生成mixin
       .style-mixin(@theme);
     }
   }
   ```

   