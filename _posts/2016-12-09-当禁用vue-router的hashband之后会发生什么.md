---
layout: post
title:  "当禁用vue-router的hashband之后会发生什么"
date:   2016-12-09 9:15
categories: [前端]
---

### [vue-router](https://router.vuejs.org/)是为vue提供的官方路由，对于单页应用项目构建很方便

# hashband是什么?

当创建一个vue-router实例时，可以定义某些特定参数来改变路由的行为及表现。hashband就是vue-router的一个可以配置参数。用的vue-router的都知道，在项目中使用了vue-router，url就会变成诸如下面的样子

> http://localhost:8080/#!/dashboard

其中#!就是vue-router的hashband。这是在hashband设置为true(默认为true)时的样式

当hashband设为false时,url链接就变成了类似下面的样子

> http://localhost:8080/dashboard

设置完之后，整个链接也美观许多。

# 引发问题

在本地调试时，一般不会引发问题。当项目部署到服务器时，可能会引发诸如404 not found,或者跳转到一个奇怪的页面

##引发原因

项目部署到服务器后,当你输入链接(如 http://xurtis.com/),服务(这里以nginx为例)会解析路径并返回 location / 下面的index配置页,这时候一般不会引发问题,当输入如 http://xurtis.com/dashboard 时访问时，页面就会出现404或者被重定向到另一个莫名其妙的页面去了。这是因为去掉了hashband(#!)之后，服务对于url的解析发生了变化。

当原本hashband为默认值(true)时，对于此类路径的解析 http://xurtis.com/#!/dashboard 是这样的，路径跳转到 location / 配置下的index，#!之后作为该页面的hash参数。当能正确定位到location ／ 下的index时，后面的hash就由页面自己来解析了，也就是vue-router来做页面的显示控制。

当禁用到hashband之后，对接路径 http://xurtis.com/dashboard 的解析就变成了 以http://xurtis.com/dashboard 为资源路径，也就是定位到location /dashboard下面的index,此时dashboard不是作为hash之后的参数来解析，此时如果项目release目录不是单纯的平铺，就会找不到文件发生404错误，或者跳转到服务器设置了未找到文件时的重定向页。

##解决方法

服务器nginx新增如下配置

    location ^~ /web {
      try_files $uri $uri/ @router;
      root /xxx/xxx;
      index index.html;
    }

    location @router {
      rewrite ^.*$ /web/index.html last;
    }


*该配置中的/web是该项目的文件夹路径，可能未根目录，根据项目情况配置。

该配置主要是做了当在/web下面找不到文件时,会走@router，把路径的解析定位到web项目的index，之后的由vue-router解析了。
