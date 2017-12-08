<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->

          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <el-button type="success" size="small" @click="selectAll">{{selectTxt}}</el-button>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>

                <tr v-show="goodslist.length<=0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- 遍历goodlist数组生成数据 -->
                <tr v-for="(item,index) in goodslist" :key="item.id">
                  <td width="48" align="center">
                    <el-switch v-model="values[index]" on-text="已选" on-color="#13ce66"  off-color="#ff4949" off-text="未选"></el-switch>
                  </td>
                  <td align="left" colspan="2">
                    <img :src="item.img_url" alt="item.title" width="50" height="50"> {{item.title}}
                  </td>
                  <td width="84" align="left">{{item.sell_price}}</td>
                  <td width="104" align="center">
                    <!-- 使用自己定义好的组件 -->
                    <inputnumber v-bind:obj="{gid:item.id,count:item.buycount}"
                     @msg = "getinputnumber"
                    ></inputnumber>
                  </td>
                  <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                  <td width="54" align="center">
                    <a href="javascript:void(0)" @click="delData(item.id)">删除</a>
                  </td>
                </tr>


                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{getAmount}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <button class="submit" @click="shopping">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getItem,setItemReplace,removeItem } from '../../kits/localStoragehelper.js';
  // 导入自己编写好的inputnumber.vue组件
  import inputnumber from '../subcom/inputnumber.vue';
  export default {
    // 注册子组件
    components:{
      inputnumber
    },
    data() {
      return {
        goodslist: [],
        selectTxt: "全选",
        values:[],  //控制每行数据的选择状态
        isselected:false,
        selectedCount:0
      }
    },
    mounted() {
      this.getgoodlist();
    },
    computed:{
      getAmount(){
        // 1.0计算出当前选中的商品总件数
        // 特点：计算属性所依赖的this.values数组中的值发生改变就会自动重新执行
        var trueArr = this.values.filter(item=>item);
        this.selectedCount = trueArr.length;

        // 2.0统计选中商品的总金额
        var totalcount = 0;
        this.values.forEach((item,index)=>{
          if(item){
            totalcount += this.goodslist[index].buycount * this.goodslist[index].sell_price;
          }
        })
        return totalcount;
      }
    },
    methods: {
      // 获取当前商品的id
      shopping(){
        var goodsid = [];
        this.values.forEach((item,index)=>{
          if(item){
            goodsid.push(this.goodslist[index].id);
          }
        });
        // 至少选择一条
        if(goodsid.length<=0){
          this.$message.error("请至少选择一件商品");
          return;
        }
        this.$router.push({name:"shopping",params:{ids:goodsid.join(",")}});
      },
      // 删除操作
      delData(goodsid){
        // 1.0根据传入的商品id从this.goodslist中查找出索引
        var index = this.goodslist.findIndex(item=>{item.id == goodsid});
        // 2.0根据找到的索引删除goodlist中对应的数据
        this.goodslist.splice(index,1);
        // 3.0删除values中对应的索引
        this.values.splice(index,1);
        // 4.0修改localStorage中的数据
        removeItem(goodsid);
      },
      // 接收子组件中传回来的值
      getinputnumber(obj){
        // 修改locaStorage中当前商品对应的购买数量
        // 获取当前localStorage中当前商品对应的购买数量
        setItemReplace(obj);
        // 只需要将goodslist中的当前商品对应的buycount值更新即可
        var index = this.goodslist.findIndex(function (item) {
          return item.id == obj.gid;
        });
        // console.log(index);
        // console.log(this.goodslist);
        this.goodslist[index].buycount = obj.count;
        console.log(obj);
      },
      // 全选与反选
      selectAll(){
        this.isselected = !this.isselected;
        if(this.isselected){
          this.selectTxt = '反选'
        }else{
          this.selectTxt = '全选'
        }

        for(var i=0;i<this.values.length;i++){
          // console.log(11);
          this.values[i] = this.isselected;
        }
        // 这两段代码就是用来触发vue中的视图刷新的
        this.values.push(false);
        this.values.pop();
      },
      // 获取购物车商品数据
      getgoodlist() {
        // 1.0从localStorage中获取到用户购买的商品id
        // goodsObj的格式：{商品id:购买数量,92:1} 
        var goodsObj = getItem();
        // 遍历goodsObj对象中的key，变成一个字符串用逗号分隔
        var idArr = [];
        for (var key in goodsObj) {
          idArr.push(key);
        }
        var ids = idArr.join(',');
        var url = "/site/comment/getshopcargoods/" + ids;
        this.$ajax.get(url).then(res => {
          // console.log(res);
          // 发现接口中返回的对象中有一个属性buycount，但是这个值是存储在客户端的
          // 所以应该手动的将goodsObj中的对应的商品购买数量赋值过去
          res.data.message.forEach((item,index) => {
            item.buycount = goodsObj[item.id];
            this.values[index] = false;
          });
          // 赋值
          this.goodslist = res.data.message;
        })
      },
    }
  }
</script>
<style scoped>
</style>