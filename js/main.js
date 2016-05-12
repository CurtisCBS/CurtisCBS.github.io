$(document).ready(function () {
  $('a.blog-button').click(function (e) {
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return
    currentWidth = $('.panel-cover').width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
      $('.content-wrapper').addClass('animated slideInRight')
    } else {
      $('.panel-cover').css('max-width', currentWidth)
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
    }
  })

  if (window.location.hash && window.location.hash == '#blog') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  if (window.location.pathname !='/' 
    && window.location.pathname !== '{{ site.baseurl }}' 
    && window.location.pathname !== '{{ site.baseurl }}index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

});



var Blog = {
    init:function(){
        this.formatDate();
        this.initGreetings();
        this.pvCount();
    },

    /**
     * 初始化问候语
     */
    initGreetings:function(){
        var now = new Date();
        var hour = now.getHours();
        var greetingPrefix = "";
        if(hour < 6){
            greetingPrefix = "凌晨好！";
        }
        else if (hour < 9){
            greetingPrefix = "早上好！";
        }
        else if (hour < 12){
            greetingPrefix = "上午好！";
        }
        else if (hour < 14){
            greetingPrefix = "中午好！";
        }
        else if (hour < 18){
            greetingPrefix = "下午好！";
        }
        else {
            greetingPrefix = "晚上好！";
        }
        showCurrentTime();
        setInterval(function(){
            showCurrentTime();
        },1000*60);
        function showCurrentTime(){
            $(".js_des_under_user").html(greetingPrefix+'<br>'+(new Date()).format("yyyy-MM-dd hh:mm"));
        }
    },

    formatDate:function(){
        Date.prototype.format=function(time){
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(time)){
                time = time.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o){
                if (new RegExp("(" + k + ")").test(time)){
                    time = time.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return time;
        };
    },

    pvCount:function(){
        var pageName = "主页";
        if (window.location.pathname != '/'
            || window.location.hash) {
            pageName = document.title;
        };
        this.postTrack({
            category:pageName,
            action:"访问",
            label:"浏览页面"
        });
    },

    postTrack:function(params){
        params.category = params.category || "主页";
        params.action = params.action || "点击";
        params.label = params.label || "";
        _hmt.push(['_trackEvent', params.category, params.action, params.label]);
    }
};
Blog.init();
