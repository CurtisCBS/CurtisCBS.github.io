window.onload = function(){
    var WebVR = {
        room:null,
        roomTexture:null,
        geometry:null,
        scene:null,
        camera:null,
        vrControl:null,
        effect:null,
        renderer:null,
        manager:null,
        lastRender:0,
        init:function(){
            var that = this;
            this.renderer = new THREE.WebGLRenderer({antialias: true});
            this.geometry = new THREE.BoxGeometry( 5, 5, 5 );
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
            this.scene = new THREE.Scene();
            this.vrControl = new THREE.VRControls(this.camera);
            this.vrControl.standing = true;
            this.effect = new THREE.VREffect(this.renderer);
            this.effect.setSize(window.innerWidth, window.innerHeight);
            this.manager = new WebVRManager(this.renderer, this.effect, {
              hideButton: false,
              isUndistorted: false
            });
            this.loadRoomTexture();
            this.setCameraPos();
            this.renderScene();
        },

        loadRoomTexture:function(){
            var that   = this;
            (new THREE.TextureLoader()).load('texture.png', function(texture){
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(5,5);
                that.setMaterial(texture);
                that.createRoom();
                that.addCubeToScene();

                that.setupStage();
            });
        },

        setMaterial:function(texture){
            this.roomTexture = new THREE.MeshBasicMaterial({    
                map: texture,
                color: 0xffffff,
                side: THREE.BackSide
            });
        },

        createRoom: function(){
            this.room = new THREE.Mesh( this.geometry, this.roomTexture );
            this.room.position.y = 5/2;
        },

        addCubeToScene:function(){
            var that = this;
            this.scene.add(that.room);
            setInterval(function(){
                // that.room.rotation.x += 0.1;
                // that.room.rotation.y += 0.1;
            },100);
        },

        setCameraPos:function(){
            // this.camera.position.z = 7;
            // this.camera.position.x = 0;
            // this.camera.position.y = 0;
        },

        renderScene:function(){
            var that = this;
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            (function render() {
                // requestAnimationFrame( render );
                // that.renderer.render( that.scene, that.camera );
                requestAnimationFrame(animate);
                function animate(timestamp) {
                    var delta = Math.min(timestamp - that.lastRender, 500);
                    that.lastRender = timestamp;
                    // cube.rotation.y += delta * 0.0006;
                    that.vrControl.update();
                    that.manager.render(that.scene,that.camera, timestamp);
                    requestAnimationFrame(animate);
                }
            })()
            document.body.appendChild( this.renderer.domElement );
        },

        setupStage:function () {
          var that = this;
          navigator.getVRDisplays().then(function(displays) {
            if (displays.length > 0) {
              display = displays[0];
              if (display.stageParameters) {
                that.setStageDimensions(display.stageParameters);
              }
            }
          });
        },

        setStageDimensions:function (stage) {
            console.log('set staeg dimensions');
          var material = this.room.material;
          this.scene.remove(this.room);
          var geometry = new THREE.BoxGeometry(stage.sizeX, 5, stage.sizeZ);
          this.room = new THREE.Mesh(geometry, material);
          this.room.position.y = 5/2;
          this.scene.add(this.room);
          cube.position.set(0, this.vrControl.userHeight, 0);
        },

        bindWindowResize:function(){
            var that = this;
            window.addEventListener('resize', onResize, true);
            window.addEventListener('vrdisplaypresentchange', onResize, true);

            function onResize(e) {
                effect.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            }
        }
    };
    WebVR.init();
};