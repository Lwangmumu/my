<template>
  <div class="tmpl">
    <div class="center">
      <div class="el-row">
        <div class="el-col el-col-24">
          <div class="comp">
            <div class="tmpl routeanimate">
              <div class="section">
                <div class="location">
                  <span>当前位置：</span>
                  <a href="/index.html">首页</a> &gt;
                  <a href="#/site/member/center" class="">会员中心</a>&gt;
                  <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                </div>
              </div>
              <div class="section clearfix">
                <div class="left-260">
                  <div class="bg-wrap">
                    <div class="avatar-box">
                      <a href="/user/center/avatar.html" class="img-box">
                        <i class="iconfont icon-user-full"></i>
                      </a>
                      <h3>

                        ivanyb

                      </h3>
                      <p>
                        <b>注册会员</b>
                      </p>
                    </div>
                    <div class="center-nav">
                      <ul>
                        <li>
                          <h2>
                            <i class="iconfont icon-order"></i>
                            <span>订单管理</span>
                          </h2>
                          <div class="list">
                            <p>
                              <a href="#/site/member/orderlist" class="router-link-exact-active ">
                                <i class="iconfont icon-arrow-right"></i>交易订单</a>
                            </p>
                          </div>
                        </li>
                        <li>
                          <h2>
                            <i class="iconfont icon-user"></i>
                            <span>账户管理</span>
                          </h2>
                          <div class="list">
                            <p>
                              <a href="#/site/member/center" class="">
                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                            </p>
                            <p>
                              <a href="#/site/member/center" class="">
                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                            </p>
                            <p>
                              <a href="#/site/member/center" class="">
                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                            </p>
                            <p>
                              <a href="javascript:void(0)">
                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="right-auto">
                  <div class="bg-wrap" style="min-height: 765px;">
                    <div class="sub-tit">
                      <ul>
                        <li class="selected">
                          <a href="/user/order-list.html">交易订单</a>
                        </li>
                      </ul>
                    </div>
                    <div class="table-wrap">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                        <tbody>
                          <tr>
                            <th width="16%" align="left">订单号</th>
                            <th width="10%">姓名</th>
                            <th width="12%">订单金额</th>
                            <th width="11%">下单时间</th>
                            <th width="10%">状态</th>
                            <th width="12%">操作</th>
                          </tr>
                          <tr v-for="item in orders" :key="item.id">
                            <td>{{item.order_no}}</td>
                            <td align="left">{{item.accept_name}}</td>
                            <td align="left">
                              <strong style="color: red;">￥{{item.order_amount}}</strong>
                              <br> 在线支付
                            </td>
                            <td align="left">{{item.add_time | datefmt}}</td>
                            <td align="left">
                              {{item.statusName}}
                            </td>
                            <td align="left">
                              <!-- <a href="#/site/member/orderinfo/12" class="">查看订单</a> -->
                              <router-link v-bind="{to:'/site/orderinfo/'+item.id}">查看订单</router-link>
                              <br>
                              <a href="#/site/goods/payment/12" class="">|去付款</a>
                              <br>
                              <!-- <a href="javascript:void(0)">|取消</a> -->
                              <a href="javascript:void(0)" v-show="item.status==1" @click="cancelConfirm(item.id)">|取消</a>
                              <br>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="page-foot">
                        <!-- 放上elementUI中的分页组件 -->
                        <el-pagination @size-change="sizechange" @current-change="indexchange" :current-page="pageIndex" :page-sizes="[1,10, 20, 30, 40]"
                          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                        </el-pagination>
                      </div>
                    </div>
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
  export default {
    data() {
      return {
        pageIndex:1,
        pageSize:1,
        totalcount:0,
        orders:[]
      }
    },
    mounted(){
      this.getorder();
    },
    methods: {
      // 取消订单
      cancelConfirm(orderid){
        this.$confirm('您确定要取消此订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 用户点击确定的时候，调用cancelOrder执行真正的删除操作
            this.cancelOrder(orderid);
        }).catch(() => {         
        });
      },
      cancelOrder(orderid){
        // 1.0请求接口完成取消操作
        this.$ajax.get('/site/validate/order/cancelorder/'+orderid)
        .then(res=>{
          if(res.data.status==0){
            // 2.0调用getorder方法重新将订单数据取回
            this.getorder();
          }else{
            this.$message.error(res.data.message);
          }
        })
      },
      // 定义分页的方法
      sizechange(size){
        this.pageSize = size;
        this.getorder();
      },
      indexchange(index){
        this.pageIndex = index
        this.getorder();
      },
      // 分页获取我的订单
      getorder() {
        this.$ajax.get('/site/validate/order/userorderlist?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize)
        .then(res=>{
          // 1.0 将服务器返回的真正的总数据赋值给data中定义好的totalcount
          console.log(res);
          console.log(111);
          this.totalcount = res.data.totalcount;
          // 2.0将message数组复制给this.orders
          this.orders = res.data.message;
        })
      }
    }
  }
</script>
<style scoped>
</style>