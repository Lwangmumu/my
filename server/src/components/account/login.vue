<template>
  <div class="tmpl">
    <ul>
      <li>
        <input type="text" v-model="user.uname"> </li>
      <li>
        <input type="password" v-model="user.upwd"> </li>
      <li>
        <el-button @click="login">登录</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
            "uname":"admin",
            "upwd":"123456"
        }
      }
    },
    methods: {
      login(){
        var url = "/admin/account/login";
        this.$ajax.post(url,this.user)
        .then(res=>{
          // console.log(res);
          if(res.data.status==1){
            this.$message.error(res.data.message);
            return;
          }
          this.$router.push({name:'goodlist'});
        })
      }
    }
  }
</script>
<style scoped>
  .tmpl {
    width: 300px;
    height: 200px;
    margin: 20px auto;
    border: 1px solid #000;
    padding: 5px;
  }

  .tmpl li {
    list-style: none;
    padding: 5px;
    text-align: center;
  }
</style>