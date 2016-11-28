---
title:  "轻松在服务器搭建shadowsocks"
date:   2016-11-25 16:00:00 +0800
categories: [前端]
tags: [centos,翻墙]
---

对于码农，需要经常翻*墙查bug，看文档。如果自己去购买vpn服务，一年差不多也要一百来块。如果自己买个国外的服务器也贵不了多少。而且自己还能在服务器上搞点东西玩玩。对于大部分新手，bandwagon上的服务器还是比较便宜的。能满足大部分人的需求。最便宜只要3美刀一个月，一顿饭的钱。[bandwagon服务器购买链接](https://bandwagonhost.com/aff.php?aff=9537)

shadowsocks一句话简介
---

shadowsocks是开源socks5 proxy(以下简称ss),作者是个中国人[clowwindy](https://github.com/clowwindy) ，自己去网站购买服务的话，个人服务是16美刀[链接](https://shadowsocks.com/)。

如何服务器上搭建一个ss服务器呢?
---

Debian/Ubuntu系统

    sudo apt-get install python-pip python-m2crypto
    sudo pip install shadowsocks

CentOS/RHEL系统

    sudo yum install m2crypto python-setuptools
    sudo easy_install pip
    sudo pip install shadowsocks

创建一个ss的配置文件

    sudo vi /home/ss.json

把下面的内容拷贝到ss.json文件

    {
      "server":"服务器ip",
      "server_port":服务端口,
      "local_port":1080,
      "password":"密码",
      "timeout":600,
      "method":"aes-256-cfb"
    }

其中上面的服务器ip需要根据自己当前服务器的ip来设置，服务端口,密码可以随意设置，如果local_port在启动时报端口占用，可以改成其他未被占用的端口。method是加密编码方法,有如下“bf-cfb”, “aes-256-cfb”, “des-cfb”, “rc4”等，推荐上述的aes-256-cfb方法加密。

启动服务

    sudo ssserver -c /home/ss.json -d start

关闭服务

    sudo ssserver -d stop

重启服务

    sudo ssserver -c /etc/shadowsocks.json -d restart

日志存放位置

    /var/log/shadowsocks.log

执行启动服务命令行后，一个ss服务就起好了

接下来用户根据自己的操作系统下载对应的[gui客户端](https://shadowsocks.org/en/download/clients.html),然后填入对应的参数就可以了。

![image]({{"images/post/20161128/ss.png" | prepend: site.baseurl }})
