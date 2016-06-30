---
title:  "js节流throttle函数"
date:   2016-06-30 10:00:00
categories: [前端]
tags: [throttle,节流]
---

节流函数
---

在前端页面,常出现用户频繁操作dom元素导致需要频繁更新视图或者发送请求。

如果是后者的话,还可能会出现异步请求结果返回与发送时间的不顺序。

常用于解决这种问题的一个方法就是通过节流函数,把用户短时间内的频繁操作进行累加,最后一次执行

这样不仅提高性能而且更防止了上面提到的异步请求时间不同步的问题

在前端实现节流函数一般是使用定时器实现

最简单的节流函数
---

    function throttle(){
        if(timer){
            clearTimer(timer)
        }
        timer = setTimeout(function(){},delay);
    }

这是最简单的节流函数。通过判断是否已经存在定时器,过滤掉用户之前的操作,直到delay计时完才进行函数执行

underscore的throttle
---

underscore是一个又好又快又小的库,快主要是因为他是采用函数式编程(来源于一位老师的话)

underscore也听过了如上的throttle函数([英文文档](http://underscorejs.org/#throttle),[中文文档](http://www.css88.com/doc/underscore/#throttle))

来自官方的一个使用例子

    var throttled = _.throttle(updatePosition, 100);
    $(window).scroll(throttled);

window的resize和scroll都是会频繁触犯事件的。

所以通过throttle函数加以过滤可以大大提高渲染性能

vue的debounce
---

vue框架自带的input的debounce实现也是节流函数的一种。([文档](https://vuejs.org/guide/forms.html#debounce))

并且对于点击等用户主动触发的事件同样可以通过设置debounce来实现。