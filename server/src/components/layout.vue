<template>
  <div class="tmpl">
    <el-row>
      <el-col :span="4">
        <!-- 1.0左边菜单 -->
        <img src="../../staic/imgs/logo.png" alt="">
        <div class="layout menu">
          <el-menu default-active="1-1" class="el-menu-vertical-demo" background-color="#0094ff" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>购物商城
              </template>
              <el-menu-item-group>
                <router-link to="/admin/goodlist">
                  <el-menu-item index="1-1">内容分类</el-menu-item>
                </router-link>
                <el-menu-item index="1-2">类别管理</el-menu-item>
                <el-menu-item index="1-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-message"></i>订单管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">订单列表</el-menu-item>
                <el-menu-item index="2-2">类别管理</el-menu-item>
                <el-menu-item index="2-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>

      <el-col :span="20">
        <el-row>
          <el-col :span="24">
            <div class="topbg">
              <el-row>
                <!-- 左边的图标 -->
                <el-col :span="1">
                  <i class="el-icon-menu"></i>
                </el-col>
                <!-- 右边的登录信息和相关操作 -->
                <el-col :span="23">
                  欢迎xxx登录
                  <el-dropdown size="medium" split-button type="primary">
                    更多菜单
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>修改密码</el-dropdown-item>
                      <el-dropdown-item>注销</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
</style>