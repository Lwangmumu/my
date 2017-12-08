<template>
  <div class="tmpl">
    {{this.$route.params.orderid}}
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderinfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderinfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderinfo.area}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderinfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderinfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>{{orderinfo.message}}</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div id="container">
                  二维码图片
                  <canvas width="300" height="300"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  // 导入二维码插件的js文件
  import '../../../statics/jqplugins/qr/jqueryqr.js';
  export default {
    data() {
      return {
        orderid: this.$route.params.orderid,
        orderinfo: {}
      }
    },
    mounted() {
      //二维码生成jq代码
      $("#container").erweima({
        
        label: 'wangmumu',
        // text:'http://127.0.0.1:7076/index.html#/payamount/21'  //改为支付的页面
      });
      this.getorderinfor();

      // 进入页面的时候开启定时器去服务器查找当前订单的状态，如果为2则跳转到支付成功页面
      this.intervalObj = setInterval(()=>{
        // ajax请求/site/validate/order/getorder/:orderid
        this.$ajax.get('/site/validate/order/getorderdetial/'+this.orderid)
        .then(res=>{
          if(res.data.message.orderinfo.status==2){
            // 关闭定时器
            if(this.intervalObj){
              clearInterval(this.intervalObj);
            }
            // 利用编程式导航跳转到支付成功页面，路由规则的名称：pcpaysuccess
            this.$router.push({name:'pcpaysuccess'});
          }
        })
      },3000)
    },
    // 表示当准备销毁组件的时候被触发执行(离开这个组件页面就会执行)
    beforeDestroy(){
      // 清除定时器
      clearInterval(this.intervalObj);
    },
    methods: {
      getorderinfor() {
        var url = "/site/validate/order/getorder/" + this.orderid;
        this.$ajax.get(url).then(res => {
          console.log(res);
          this.orderinfo = res.data.message[0];
        })
      }
    }
  }
</script>
<style scoped>
</style>