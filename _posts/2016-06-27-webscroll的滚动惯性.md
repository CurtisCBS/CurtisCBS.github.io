---
title:  "web scroll的滚动惯性"
date:   2016-06-27 00:00:00
categories: [前端]
tags: [scroll,惯性]
---

在上个公司的最后一个版本。( [传送门](http://ichuanyi.com/m/page/tomorrow_recommend/))

入口放在app的主页,所以对页面的动画效果和性能(流畅度)有较大的要求

页面的在交互上做了较多动画,属于交互比较复杂的单页应用

其中用户在点击顶部的"地址栏",底部的"再推荐",以及无推荐次数之后点击"再推荐" 这三部分弹出来的页面

是显示在原本主要内容层级之上的,position值为fixed

在提测时候发现在native内滚动这种长页面的时候,当用户手一离开屏幕时就会停止滚动

该开始以为是用户的一系列touch事件在dom冒泡了。

然后在滚动的元素容器设置了event.stopPropagation()事件阻止所有事件的冒泡

发现并没有什么乱用

最后在mozilla的开发者文档找到了-webkit-overflow-scrolling

然后通过设置该属性值为touch竟然生效了!!!!!!!

!!!!!

mozilla对该属性是这么描述的

       The -webkit-overflow-scrolling CSS property controls whether or not touch devices use momentum-based scrolling for the given element.

该css属性控制是否滚动是基于动量的。。。这翻译听不下去了

就是看你滚动是否是需要滚行吧!!这么翻译果然好多了

该属性可设置两种值

    auto:设置为auto时,用户的手离开屏幕即停止滚动

    touch:设置为touch时,用户手离开屏幕时会基于之前的动量递减(即保持一定的惯性)

( [官方解释](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling))