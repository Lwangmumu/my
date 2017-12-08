// 1.0导入vue.js
import Vue from 'vue';

// 2.0导入app.vue组件对象
import App from './App.vue';

// 3.0导入vue-router这个路由模块进行整个系统的路由控制
// 导入vue-router这个包
import VueRouter from 'vue-router';
// 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);
// 导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';

// 商品相关的组件
import goodlist from './components/goods/goodlist.vue';
import goodadd from './components/goods/goodadd.vue';



// 实例化对象并且定义路由规则
var router = new VueRouter({
  routes: [
    { name: 'default', path: '/', redirect: '/admin' },
    { name: 'login', path: '/login', component: login,meta:{nologin:true}},
    {
      name: 'layout', path: '/admin', component: layout,
      children: [
        { name: "goodlist", path: 'goodlist', component: goodlist },
        { name: "goodadd", path: 'goodadd', component: goodadd }
      ]
    }

  ]
})


// 4.0导入vue的一个组件库：element-ui
import elementUI from 'element-ui';
// 导入默认样式
// import 'element-ui/lib/theme-default/index.css';
import '../staic/theme_rms/index.css'

// 导入自己编写的全局样式
import '../staic/css/site.css'
// 绑定到vue中
Vue.use(elementUI);

// 5.0导入axios
import axios from 'axios';
// 5.0.1 设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名
axios.defaults.baseURL = "http://127.0.0.1:8899";
// 配置axios在请求数据服务接口的时候，允许带cookie（凭证）
axios.defaults.withCredentials = true;
// 5.0.2 将axios对象绑定到vue的原型属性$ajax上,将来在任何组件中均可通过this.$ajax中的get(),post()就可以发出ajax请求了
Vue.prototype.$ajax = axios;


// 6.在vue-router对象上添加一个全局守卫，在任何组件渲染出来之前都需要先执行这个守卫函数
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);

  // 判断如果进入的是登录页面，由于登录的路由规则上有一个meta：{nologin:true}而其他规则上没有
  if (to.meta.nologin) {
    next();
    // 阻断下面代码的继续执行
    return;
  }
  // 进入任何组件都会触发这个请求，进行登录判断
  axios.get('/admin/account/islogin')
    .then(res => {
      if (res.data.code == 'nologin') {
        // 表示没有登录，则跳转到登录页面
        router.push({ name: 'login' });
      } else {
        // 登录成功
        next();
      }
    })
})

// 3.0实例化vue对象
new Vue({
  el: "#app",
  render: create => create(App),
  router,  //绑定路由对象使它生效
});






// var addFun = require("./cals.js");
// console.log('输出的结果=',addFun(1,2));

// // 2.0导入一个css
// require("./staic/css/site.css");

// // 3.0导入一个less
// require("./staic/css/site.less");

// // 3.0导入一个sass
// require("./staic/css/site.scss");

// // 
// window.onload = function () {
//   // 获取dom对象
//   var txtObj = document.getElementById("txt");
//   var txtObj2 = document.getElementById("txt2");
//   var btn = document.getElementById("btn");
//   var res = document.getElementById("res");

//   // 注册点击事件
//   btn.onclick = function () {
//     var v1 = txtObj.value - 0;
//     var v2 = txtObj2.value - 0 ;

//     // 调用加法运算
//     res.value = addFun(v1,v2);
//   }
// }