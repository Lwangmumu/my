<template>
  <div class="tmpl">
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>vue2.0单页应用</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <a href="/login.html">登录</a>
            <a href="/register.html">注册</a>
            <strong>|</strong>
            <!-- <a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a> -->
            <a href="/cart.html" id="layoutbuycar"><i class="iconfont icon-cart"></i>
              购物车(<span id="">{{buyTotalCount}}</span>)</a>
          </div>
        </div>
      </div>
      <div class="head-nav">
        <div class="section">
          <!-- <div class="logo">
                             <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                         </div>-->
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="/index.html">
                  首页
                </a>
              </li>
              <li class="news">
                <a href="/news.html">
                  学员问题汇总
                </a>
              </li>
              <li class="photo">
                <a href="/photo.html">
                  重难点专区
                </a>
              </li>
              <!--<li class="goods"><a href="">就业阶段</a></li>-->
              <li class="video">
                <a href="/video.html">
                  前端常用功能
                </a>
              </li>
              <li class="down">
                <a href="/down.html">
                  资源下载
                </a>
              </li>
              <li>
                <!-- <a target="_blank" href="/admin/index.aspx">
                  问题提交
                </a> -->
                <router-link to="/site/goodinfo">
                  购物商城
                </router-link>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间内容占位 -->
    <router-view></router-view>
  </div>
</template>

<script>
  // 导入bus.js文件中的vm对象
  import {vm,KEY} from '../kits/bus.js';
  export default {
    data() {
      return {
        buyTotalCount:0
      }
    },
    mounted() {
      // jquery的实现应该要能够找到dom对象     

      $("#menu2 li a").wrapInner('<span class="out"></span>');
      $("#menu2 li a").each(function () {
        $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
      });

      $("#menu2 li a").hover(function () {
        $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
        $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

      }, function () {
        $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
        $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
      });

      // 2.0将曾经购买的总数加载回来
      var countStr = localStorage.getItem('buyTotalCount');
      // console.log(countStr);
      if(countStr && countStr!='NaN'){
        this.buyTotalCount  = parseInt(countStr);
      }

      // 3.0利用vm中的$on方法完成事件的监听
      vm.$on(KEY,(buyCount)=>{
        // 1.0改变的是内存中的变量值
        this.buyTotalCount += buyCount;
// console.log(this.buyTotalCount);
        // 2.0将总数存储起来(选择localStorage)
        localStorage.setItem('buyTotalCount',this.buyTotalCount);
      })
    },
    methods: {
    }
  }
</script>
<style scoped>
  /* 导入样式 */
  @import url('../../statics/jqplugins/jqhovernav/jqhoverNav.css');
</style>