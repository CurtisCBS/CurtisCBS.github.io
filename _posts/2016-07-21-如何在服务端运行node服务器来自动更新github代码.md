---
title:  "如何在服务端运行node服务器来自动更新github代码"
date:   2016-07-21 21:00:00 +0800
categories: [前端]
tags: [node,github,webhook,forever]
---

最近自己搭建了个VPS,主要用于存放一些项目。

因为对服务端不太了解,所以学习比较吃力。

而且每次push代码到github还得手动登陆服务器,拉取代码,然后重启服务。

所以就在服务器端搭了个node服务器,弄个请求专门来监听github的代码提交纪录,并作服务器端的代码更新

### work flow

git本地代码提交(push) -> github webhook通知服务器 -> 服务器接收请求并执行代码更新(pull)

### github webhook

github webhook是在你的仓库(repository)发生变动的时候,通知你的服务器,一个仓库

可以设置多个webhook。在仓库的setting中可以设置(如下图)。

![image]({{"images/post/20160721/github-setting.png" | prepend: site.baseurl }})

这里是我某个项目webhook的配置,需要注意的是,如果你起的服务不是默认端口,需要加上端口参数,否则会404报错,

而且用于监听的这个请求接口(如图的listenGithubPush请求)需要是post,否则同样会报错。

这边选项只选择了push事件才会通知服务端,根据需要也可以选择其他选项

![image]({{"images/post/20160721/webhook-config.png" | prepend: site.baseurl }})

### 服务器端监听通知

首先要在服务端上搭建一个node服务器,我是用express框架起了了一个服务器。

创建坚挺服务器 githubListener.js

    var express = require('express');
    var app = express();
    var exec = require('exec');

    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    app.post('/listenGithubPush',function(req,res){
      exec('git checkout master && git pull',function(err, out, code) {
      if (err !== null) {
          console.log('exec error: ' + err);
        }
        process.stderr.write(err);
        process.stdout.write(out);
      // process.exit(code);
      });
      res.send('the server has redeployed!!');
    });

    var server = app.listen(3000, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });

exec用于通过让子进程执行某个命令(这里执行的是切换分支和拉取代码)

这样,接下来只要在服务端运行该node服务就行了

### forever

如何让服务器一只运行node服务器?

网上找到了两种方法:

    1.在后台创建进程,然后执行node

    2.forever

[Keep a node.js server up with Forever](https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/)

只要在服务端

    npm install forever -g

就完成了forever的安装

要启动node服务器只需要

    forever start githubListener.js

这样,就可以在服务端让node服务器一值运行了

最后,只要刚才设置了webhook的仓库push一下代码,就可以完成整个流程了
