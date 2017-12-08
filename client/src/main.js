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

// 商品相关的组件
import goodlist from './components/goods/goodlist.vue';
import goodinfo from './components/goods/goodinfo.vue';
import car from './components/goods/car.vue';
import shopping from './components/goods/shopping.vue';
import pay from './components/goods/pay.vue';
import login from './components/account/login.vue';
import payamount from './components/pay/payamount.vue';
import paysuccess from './components/pay/paysuccess.vue'

import vipcenter from './components/vip/vipcenter.vue'
import myorders from './components/vip/myorders.vue'
import orderinfo from './components/vip/orderinfo.vue'


// 实例化对象并且定义路由规则
var router = new VueRouter({
  routes: [
    { name: 'default', path: '/', redirect: '/site/goodlist' },
    { name: 'payamount', path: '/payamount/:orderid', component: payamount },
    // 不需要头部导航
    {name:'paysuccess',path:'/paysuccess',component:paysuccess},
    {
      name: 'layout', path: '/site', component: layout,
      children: [
        // 登录页面
        { name: "login", path: 'login', component: login,meta:{nosave:'true'}},
        { name: "goodlist", path: 'goodlist', component: goodlist},
        { name: "goodinfo", path: 'goodinfo/:goodid', component: goodinfo},
        { name: "car", path: 'car', component: car,meta:{checklogin:true}},
        { name: "shopping", path: 'shopping/:ids', component: shopping,meta:{checklogin:true}},
        // 支付页面
        { name: "pay", path: 'pay/:orderid', component: pay,meta:{checklogin:true}},
        // 支付成功页面 pc
        {name:'pcpaysuccess',path:'pcpaysuccess',component:paysuccess},
        // 会员中心
        {name:'vipcenter',path:'vipcenter',component:vipcenter,meta:{checklogin:true}},
        // 我的交易订单
        {name:'myorders',path:'myorders',component:myorders,meta:{checklogin:true}},
        // 订单详情
        {name:'orderinfo',path:'orderinfo/:orderid',component:orderinfo,meta:{checklogin:true}}
      ]
    }

  ]
})


// 4.0导入vue的一个组件库：element-ui
import elementUI from 'element-ui';
// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../statics/elementuiCss/index.css';

// 导入自己编写的全局样式
import '../statics/site/css/style.css'
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


// 6.0 全局守卫
/* 
职责一：在localStorage中记录用户访问的最后那个页面（存储一个路由对象），排除登录页面

职责二：进行登录验证
*/
router.beforeEach((to,from,next)=>{
  // 1.0在localStorage中记录用户访问的最后那个页面（存储一个路由对象），排除登录页面
  if(to.meta.nosave !="true"){
    // 保存的是当前路由对象中的path
    console.log(to);
    localStorage.setItem('currentPath',to.path);
  }

  // 2.0进行过登录验证
  if(to.meta.checklogin){
    var url = "/site/account/islogin";
    axios.get(url).then(res=>{
      if(res.data.code=="logined"){
        // 表示已经登录了，则可以成功进入到目标页面
        next();
      }else{
        // 表示未登录，则跳转到登录页面
        router.push({name:"login"});
      }
    })
  }else{
    next();
  }
})

// 7.0定义一个全局过滤器用来格式化日期
Vue.filter("datefmt",(input)=>{
  var date = new Date(input);
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  return y + '-' + m + '-' +d;
})

// 8.0按需导入iview中的affix组件
import { Affix } from 'iview';
Vue.component('Affix',Affix);

// 3.0实例化vue对象
new Vue({
  el: "#app",
  render: create => create(App),
  router,  //绑定路由对象使它生效
});

