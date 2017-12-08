<template>
  <div class="tmpl">
    {{orderid}}
    <input type="text" v-model="amount">
    <el-button type="success" size="small" @click="pay">支付</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderid:this.$route.params.orderid,
        amount:0
      }
    },
    mounted(){
      this.getorderInfo();
    },
    methods: {
      // 根据订单id获取订单金额
      getorderInfo(){
        this.$ajax.get('/site/validate/order/getorderdetial/'+this.orderid)
        .then(res=>{
          this.amount = res.data.message.orderinfo.order_amount;
        });
      }
    }
  }
</script>
<style scoped>
</style>