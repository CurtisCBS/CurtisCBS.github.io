---
title:  "Performance Api在网页性能监测的使用和表现差异"
date:   2016-05-10 10:10:11
categories: [前端]
tags: [性能监测,performance,兼容]
---

### 为什么要做性能监测?

著名的谁说过一句话，如果连性能问题在哪里都不知道，如何做优化？所以，性能监测很明显是为了性能优化！

### Performance对象

html5提供了很多有利于前端攻城狮的webapi[(技术文档)](https://developer.mozilla.org/zh-CN/docs/Web/API)
以下内容主要讲的是webapi的performace接口及相关使用

在chrome控制台打印window.performance,可查看performance提供的api,如图:

![image]({{"images/post/20150510/obj.png" | prepend: site.baseurl }})

**memory**	提供了3个参数

	* jsHeapSizeLimit js内存使用大小限制
	* totalJSHeapSize js总内存？？
	* usedJSHeapSize  js已使用内存

**navigation**对象提供了2个参数

	* redirectCount
	* type

redirectCount表示到达当前页面的重定向次数

type

* 0:正常的url访问或点击跳转
* 1:刷新页面
* 2:通过历史纪录访问当前页面

**onresourcetimingbufferfull**属性是一个事件监听函数，当**resourcetimingbufferfull**事件被触发的时候调用。而
**resourcetimingbufferfull**是在浏览器资源缓冲区蛮的时候触发


	performance.onresourcetimingbufferfull = function(){};
**timing** 对象提供了一组页面资源加载过程中的用时参数,也是网页性能监测主要要用到的api


	* 	connectEnd:1462861568320
	* 	connectStart:1462861568320
	* 	domComplete:1462861569995
	* 	domContentLoadedEventEnd:1462861569578
	* 	domContentLoadedEventStart:1462861569528
	* 	domInteractive:1462861569528
	* 	domLoading:1462861568659
	* 	domainLookupEnd:1462861568320
	* 	domainLookupStart:1462861568320
	* 	fetchStart:1462861568320
	* 	loadEventEnd:1462861570046
	* 	loadEventStart:1462861569995
	* 	navigationStart:1462861567902
	* 	redirectEnd:0
	* 	redirectStart:0
	* 	requestStart:1462861568322
	* 	responseEnd:1462861569171
	* 	responseStart:1462861568656
	* 	secureConnectionStart:0
	* 	unloadEventEnd:0
	* 	unloadEventStart:0

以下是来找磨叽啦（[mozilla](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)）的一张关于这些参数的计时起止点:
![image]({{"images/post/20150510/illustration.png" | prepend: site.baseurl }})



具体资源的性能监测方法 getEntries():
通过该方法，可以获取到所有资源的加载用时等参数
var sourceEntries = window.performance.getEntries();
打印一下sourceEntries数组，可以获取到其成员包含以下属性

	connectEnd:119.33500000000001
	connectStart:119.33500000000001
	domainLookupEnd:119.33500000000001
	domainLookupStart:119.33500000000001
	duration:106.41499999999999
	entryType:"resource"
	fetchStart:119.33500000000001
	initiatorType:"link"
	name:"http://****/m/css/common_lib_****/less/common/***.css"
	redirectEnd:0
	redirectStart:0
	requestStart:206.28000000000003
	responseEnd:225.75
	responseStart:215.60000000000002
	secureConnectionStart:0
	startTime:119.33500000000001
	workerStart:0

该方法能够获取到的资源有css,js,img,xmlhttprequest。这个方法基本能满足网页性能监测的要求。

**打点方法:performance.now()**

当然，如果以上的timing对象提供的参数不能满足你的特殊监测要求，你还可以使用performance的now方法来定制时间监测点；
如:

	var startTime = performance.now();
	<script src='http://*****.js'></script>
	var endTime = performance.now();
	var jsLoadTime = endTime - startTime;
可以大致统计到js资源加载的时间

### 3. 浏览器支持&兼容

![image]({{"images/post/20150510/support.png" | prepend: site.baseurl }})
在用于项目中使用的时候，发现getEntries方法紧在chrome支持，用于移动端性能监测时候，getEntries也只能在安卓手机获取到资源的时间参数，具体的资源还是只能靠打点来实现。我有什么办法呢？没有。做到后面发现主要的群体ios不能监测到。。。。白做了！！！
