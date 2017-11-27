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



// 实例化对象并且定义路由规则
var router = new VueRouter({
  routes: [
    { name: 'default', path: '/', redirect: '/site/goodlist' },
    {
      name: 'layout', path: '/site', component: layout,
      children: [
        { name: "goodlist", path: 'goodlist', component: goodlist},
        { name: "goodinfo", path: 'goodinfo/:goodid', component: goodinfo}
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


// 6.0定义一个全局过滤器用来格式化日期
Vue.filter("datefmt",(input)=>{
  var date = new Date(input);
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  return y + '-' + m + '-' +d;
})

// 7.0按需导入iview中的affix组件
import { Affix } from 'iview';
Vue.component('Affix',Affix);

// 3.0实例化vue对象
new Vue({
  el: "#app",
  render: create => create(App),
  router,  //绑定路由对象使它生效
});

