<template>
  <div class="tmpl">
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section" v-if="info.goodsinfo">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <div class="images-cover">
                      <img src="http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg">
                    </div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for="item in info.imglist" :key="item.id">
                          <div class="small-img">
                            <img :src="item.original_path" />
                          </div>
                        </li>

                      </ul>
                    </div>
                    <!--缩略图-->
                  </div>
                  <div class="magnifier-view"></div>
                  <!--经过放大的图片显示容器-->
                </div>
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec">
                <h1 v-text="info.goodsinfo.title"></h1>
                <p class="subtitle" v-text="info.goodsinfo.sub_title"></p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo" v-text="info.goodsinfo.goods_no"></dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{info.goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥{{info.goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <el-input-number v-model="num1" @change="buyCount" :min="1" :max="info.goodsinfo.stock_quantity">

                      </el-input-number>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{info.goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <!-- <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                        <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button> -->
                        <button class="buy">立即购买</button>
                        <button ref="btnaddcar" class="add" @click="addcar">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <Affix>
                <!--选项卡-->
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li @click="istabshow=true">
                      <a href="javascript:;" v-bind="{class:(istabshow?'selected':'')}">商品介绍</a>
                    </li>
                    <li @click="istabshow=false">
                      <a href="javascript:;" v-bind="{class:(istabshow?'':'selected')}">商品评论</a>
                    </li>
                  </ul>
                </div>
                <!--/选项卡-->
              </Affix>


              <!--选项内容-->
              <div class="tab-content entry" style="display:block;">

              </div>

              <div class="tab-content" style="display: block;">
                <!--网友评论-->
                <div class="comment-box">
                  <!--取得评论总数-->
                  <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea id="txtContent" name="txtContent" sucmsg=" " v-model="commentTxt" datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" name="submit" type="button" @click="postComment" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </form>
                  <ul id="commentList" class="list-box">
                    <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in commentList">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | datefmt}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <!--放置页码-->
                  <div class="page-box" style="margin:5px 0 0 62px">
                    <!-- <div id="pagination" class="digg">
                      <span class="disabled">« 上一页</span>
                      <span class="current">1</span>
                      <span class="disabled">下一页 »</span>
                    </div> -->
                    <!-- 使用elementUI的分页组件替代 -->

                    <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="pageIndex" :page-sizes="[2,5,10,15,20]"
                      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                    </el-pagination>
                  </div>
                  <!--/放置页码-->
                </div>

                <!--/网友评论-->
              </div>

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">

                  <li v-for="item in info.hotgoodslist">
                    <div class="img-box">
                      <!-- <a href="/goods/show-94.html"> -->
                      <router-link v-bind='{to:"/site/goodinfo/" + item.id}'>
                        <img :src="item.img_url">
                      </router-link>
                      <!-- </a> -->
                    </div>
                    <div class="txt-box">
                      <!-- <a href="/goods/show-94.html"> -->
                      <router-link v-bind='{to:"/site/goodinfo/" + item.id}'>
                        {{item.title}}
                      </router-link>
                      <!-- </a> -->
                      <span>{{item.add_time | datefmt}}</span>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>

    <!-- 定义一个div是用来展示图片的 -->
    <transition @before-enter="benter" @enter="enter" @after-enter="aenter">
      <div v-if="info.imglist" class="img" ref="img" v-show="isshow">
        <img :src="info.imglist[0].thumb_path" alt="" width="50" height="50">
      </div>
    </transition>
  </div>
</template>

<script>
  import '../../../statics/jqplugins/jqimgzoom/js/magnifier.js';
  // 导入事件总线的相关数据
  import {vm,KEY} from '../../kits/bus.js'

  // 导入localStorageHelper.js
  import {setItem} from '../../kits/localStoragehelper.js'

  export default {
    data() {
      return {
        id: this.$route.params.goodid,
        info: {},
        istabshow: true,
        commentTxt: "",
        pageIndex: 1,
        pageSize: 5,
        commentList: [],
        totalcount: 0,
        currentBuyCount: 1,
        isshow:false,
        offsetObj:{},
        lbcOffset:{},
      }
    },
    mounted() {
      this.getinfo();
      this.getComment();

      // 利用jq获取这个对象的offset
      setTimeout(() =>{
        // 获取当前页面上的加入购物车按钮的位置
        var offsetObj = $(this.$refs.btnaddcar).offset();
        // console.log(222);
        // console.log(offsetObj);
        this.offsetObj = offsetObj;
        
        // 将加入购物车按钮的位置赋值给图片div
        $(this.$refs.img).css("left",offsetObj.left).css("top",offsetObj.top);

        // 获取layout.vue组件中的id=layoutbuycar 这个dom对象
        var lbcOffset = $("#layoutbuycar").offset();
        this.lbcOffset = lbcOffset;
        // console.log(this.lbcOffset);
        // 
      }, 800);
    },
    watch: {
      '$route': function () {
        this.getinfo();
      }
    },
    methods: {
      // 7.0定义动画进入的三个钩子函数
      benter(el){
        // 设定动画的开始位置
        el.style.left = this.offsetObj.left + 'px';
        el.style.top = this.offsetObj.top + 'px';
      },
      enter(el,done){
        // 设定动画的结束位置，同时要调用el.offsetWidth来达到刷新的目的
        // 调用done来触发aenter的执行
        el.offsetWidth;
        // console.log(this.lbcOffset);
        el.style.left = this.lbcOffset.left+'px';
        el.style.top = this.lbcOffset.top+'px';
        done();
      },
      aenter(el){
        this.isshow = false;
      },
      // 6.0加入购物车
      addcar() {
        // 1.0利用vm.$emit()触发事件，将购买数量传入layout.vue组件
        vm.$emit(KEY, this.currentBuyCount);

        // 获取到当前商品id和购买的数量调用localStroagehelper.js这个文件中的setItem方法来存储值
        var goodsobj = {gid:this.id,count:this.currentBuyCount};
        // 将当前购买商品的数量存储到localStorage中
        setItem(goodsobj);

        // 显示图片
        this.isshow  =true;
      },
      // 5.0分页
      sizeChange(size) {
        this.pageSize = size;
        this.getComment();
      },
      pageChange(currentIndex) {
        this.pageIndex = currentIndex;
        this.getComment();
      },
      // 4.0提交评论
      postComment() {
        // console.log(111);
        var url = "/site/validate/comment/post/goods/" + this.id;
        this.$ajax.post(url, { commenttxt: this.commentTxt }).then(res => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
          } else {
            this.getComment();
            this.commentTxt = "";
          }
        })
      },
      // 3.0得到评论数据
      getComment() {
        var url = "/site/comment/getbypage/goods/" + this.id + "?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize;
        this.$ajax.get(url).then(res => {
          this.commentList = res.data.message;
          this.totalcount = res.data.totalcount;
        })
      },
      // 2.0 elelentUI的inputnumber组件的触发事件
      // val:代表的是最新的这个数字
      buyCount(val) {
        // console.log(val);
        this.currentBuyCount = val;
      },
      // 1.0  定义方法去根据url传入的商品id获取到商品的详情数据
      getinfo() {
        var url = "/site/goods/getgoodsinfo/" + this.id;
        this.$ajax.get(url).then(res => {
          // console.log(res);
          this.info = res.data.message;
          if (!this.info.goodsinfo) {
            this.$message.error("传入的商品id非法");
          }
        });
      }
    }
  }
</script>
<style scoped>
  @import url('../../../statics/jqplugins/jqimgzoom/css/magnifier.css');

  .img {
        border: 1px solid red;
        width: 50px;
        height: 50px;
        position: absolute;      
        transition: all 0.3s; 
    }
</style>