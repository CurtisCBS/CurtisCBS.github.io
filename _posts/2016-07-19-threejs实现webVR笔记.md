---
title:  "threejs实现webVR笔记"
date:   2016-07-19 00:00:00
categories: [前端]
tags: [webVR,js,threejs]
---


在2016年最火的15款HTML5游戏引擎排行榜中,threejs已经登顶了 [排行榜](http://www.diycode.cc/topics/16)

看看threejs官网的各种炫酷demo知道为什么这么火了 [官网](http://threejs.org/)

three.scene
---

使用threejs实现各种动画效果,主要是通过三个部分:场景,镜头,渲染器

官方文档给出的例子

创建场景:

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

以上代码声明了threejs实现的三个部分,并添加到html的body中

创建物体:

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

BoxGeometry是three创建一个立方体的方法

MeshBasicMaterial是渲染材质,如颜色,材质的方法

Mesh是将MeshBasicMaterial的材质渲染到BoxGeometry生成的立方体上,并被插入到scene中

渲染:

复制以上代码并不看到实际效果,因为并没有真正渲染

    function render() {
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
    render();

这里的渲染方法,是个循环渲染。1s执行六十次渲染(60fps)

旋转:

    setInterval(function(){
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;
    },100);

修改cube对象的rotation的值,会让渲染的立方体转动

如同上面的修改camera.position.z的值一样,修改camera.position改变的是视图角度的位置

矩阵变换(Matrix transformations)
---
threejs使用矩阵来实现3D动画的变化.每个Object3D对象都有一个matrix,存储包含位置,旋转,缩放等数据

实现3D变化的方法有两种:

1.使用Object3D对象(以下简称O3D)的方法,如:

    var pos = {
        x:1,
        y:1,
        z:1
    }
    cube.position.copy(pos);

这样就实现了对象的位移

O3D的matrixAutoUpdate默认为true,所以使用方法改变了matrix的值,就会立即渲染出效果;

如果希望手动更新视图,只要把自动更新设为false,在需要重新渲染的时候调用O3D的updateMatrix方法就行了

2.直接修改O3D的matrix

    var pos = {
        x:1,
        y:1,
        z:1
    }
    cube.matrixAutoUpdate = false;
	cube.matrix.setPosition(start_position);

使用这个方法进行变换时matrixAutoUpdate必须为false


视角:

[欧拉角(Euler angles)](http://threejs.org/docs/index.html#Reference/Math/Euler) 和 [四元数(Quaternions)](http://threejs.org/docs/index.html#Reference/Math/Quaternion)

threejs使用了如上两种听起来很高端听都没听过的方法来表示3d旋转

材质(texture)
---

上面的例子创建了一个立方体,现在来实现材质渲染

    var loader = new THREE.TextureLoader();
	loader.load('texture.png', textureLoad);

首先创建一个加载器,在加载完图片后进行材质渲染

	function textureLoad(texture){
        texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 1,1);
    }

如果在本地调试或者跨域请求资源导致js error(Tainted canvases may not be loaded),可以参考如下方法解决[传送门](https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally)


