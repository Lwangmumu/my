<template>
  <div class="tmpl">
    <!-- 商品列表 -->
    <!-- 面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="abread bt-line">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item>内容分类</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <!-- 按钮控件 -->
    <el-row>
      <el-col :span="24">
        <div class="abread bt-line">
          <el-row>
            <el-col :span="6">
              <el-button size="small">全选</el-button>
              <router-link to="/admin/goodadd">
                <el-button size="small">新增</el-button>
              </router-link>
              <el-button size="small">删除</el-button>

            </el-col>
            <el-col :offset="12" :span="6">
              <el-input placeholder="请输入内容" icon="search" v-model="searchValue" :on-icon-click="getlist">
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- table表格内容区 -->
    <el-row>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column label="标题">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                <div slot="content">
                    <img height="200" width="200" :src="scope.row.imgurl" alt="">
                </div>
                <a href="#">{{scope.row.title}}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="categoryname" label="所属类别" width="100">
          </el-table-column>
          <el-table-column prop="stock_quantity" label="库存" width="100">
          </el-table-column>
          <el-table-column prop="market_price" label="市场价" width="100">
          </el-table-column>
          <el-table-column prop="sell_price" label="销售价" width="100">
          </el-table-column>
          <el-table-column label="属性" width="100">
            <template scope="scope">
              <i v-bind="{class:'el-icon-menu '+(scope.row.is_slide==0?'unlight':'')}"></i>
              <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==0?'unlight':'')}"></i>
              <i v-bind="{class:'el-icon-star-on '+(scope.row.is_hot==0?'unlight':'')}"></i>
            </template>
          </el-table-column>
          <el-table-column label="修改" width="80">
            <template scope="scope">
              <a href="#">修改</a>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 分页搜索功能 -->
    <el-row>
      <el-col :span="24">
        <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :current-pag="pageIndex" :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize" layout="sizes, prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 导入axios
  import axios from 'axios';
  export default {
    data() {
      return {
        searchValue: "",
        pageSize: 10,
        pageIndex: 1,
        totalCount: 0,
        list: []
      }
    },
    methods: {
      // 获取当前页容量
      pageSizeChange(size1) {
        console.log(size1);
        this.pageSize = size1;
        // 重新获取数据
        this.getlist();
      },

      // 获取当前页索引
      pageIndexChange(currentIndex1) {
        console.log(currentIndex1);
        this.pageIndex = currentIndex1;
        // 重新获取数据
        this.getlist();
      },

      getlist() {
        // var url = 'http://127.0.0.1:8899/admin/goods/getlist?pageIndex=1&pageSize=10&searchvalue='+this.searchValue;
        var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;
        this.$ajax.get(url)
          .then(res => {
            this.list = res.data.message
            this.totalCount = res.data.totalcount;
            // console.log(res);
          })
      }
    },
    mounted() {
      this.getlist();
    }
  }
</script>
<style scoped>
  .unlight {
    color: rgba(0, 0, 0, 0.3);
  }
</style>