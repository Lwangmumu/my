<template>
  <div class="tmpl">
    <div class="subtmpl">
      <ul>
        <li @click="substract">-</li>
        <li>{{count}}</li>
        <li @click="add">+</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count:1
      }
    },
    // obj的格式:{gid:商品id,count:当前商品的购买数量}
    props:['obj'],
    mounted(){
      console.log(this.obj);
      this.count = this.obj.count;
    },
    methods: {
      add(){
        this.count++;
        // 将最新的数量传递给父组件
        this.notice();
      },
      substract(){
        if(this.count<=1){
          this.count = 1;
          return;
        }
        this.count--;
        // 将最新的数量传递给父组件
        this.notice();
      },
      notice(){
        // 调用$emit触发事件
        this.$emit('msg',{gid:this.obj.gid,count:this.count});
      }
    }
  }
</script>
<style scoped>
  .subtmpl ul {
    width: 120px;
  }

  .subtmpl li {
    list-style: none;
    display: inline-block;
    width: 30px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
    padding: 2px;
    cursor: pointer;
  }
</style>