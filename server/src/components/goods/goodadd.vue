<template>
  <div class="tmpl">
    <!-- 面包屑 -->
    <el-row>
      <el-col :span="24">
        <div class="abread bt-line">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">返回上一层</el-breadcrumb-item>
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>新增内容</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>

    <!-- 表单验证区域 -->
    <el-row>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 第一行 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="商品标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="副标题" prop="sub_title">
              <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row>
          <el-col :span="9">
            <el-form-item label="所属类别">
              <el-select v-model="ruleForm.category_id">
                <el-option v-for="item in catalist" :value="item.category_id">
                  <span v-for="sub in (item.class_layer -1)">&nbsp;</span>
                  <span v-if="item.class_layer>1">-|</span>
                  <span>{{item.title}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否发布">
              <el-switch v-model="ruleForm.status" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="推荐类型">
              <el-switch v-model="ruleForm.is_slide" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
              <el-switch v-model="ruleForm.is_top" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
              <el-switch v-model="ruleForm.is_hot" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="上传封面">
              <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" list-type="picture"
                :on-success="imgUploaded">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="图片相册">
              <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :file-list="ruleForm.fileList" list-type="picture"
                :on-success="fileUploaded">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="商品货号" prop="goods_no">
              <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库存数量" prop="stock_quantity">
              <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="市场价格" prop="market_price">
              <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="销售价格" prop="sell_price">
              <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第五行 -->
        <el-row>
          <el-col :span="22">
            <el-form-item label="内容摘要" prop="zhaiyao">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.zhaiyao">
              </el-input>
              <el-input type='hidden' name='point' value=' '></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第六行  富文本编辑器 -->
        <el-row>
          <el-col :span="22">
            <el-form-item label="详细内容" prop="content">
              <quill-editor :content="ruleForm.content" @change="onEditorChange($event)">
              </quill-editor>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提交按钮 -->
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-row>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor';
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        // 表单元素的双向数据绑定元素
        ruleForm: {
          title: "",
          category_id: '',
          "goods_no": "",
          "stock_quantity": 200,
          "market_price": 1000,
          "sell_price": 800,
          "status": true,
          "is_slide": true,
          "is_top": false,
          "is_hot": true,
          "zhaiyao": "为不凡而生",
          "content": "<p><strong>产品参数：</strong></p>",
          "imgList": [
            {
              // "name": "wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
              // "url": "http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
              // "shorturl": "/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"
            }
          ],
          "point":1,
          "fileList": [
            {
              // "name": "HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
              // "url": "http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
              // "shorturl": "/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
            }
          ]
        },
        // 表单元素的验证规则
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          category_id: [
            { required: true, message: '请选择类别', trigger: 'blur' }
          ],
          zhaiyao: [
            { required: true, message: '请输入摘要', trigger: 'blur' }
          ],
        },
        catalist: []
      }
    },
    methods: {
      // 定义一个方法imgUploaded（当服务器成功响应以后回调）
      imgUploaded(response, file, fileList) {
        // console.log(response);
        this.ruleForm.imgList = [response];
      },
      // 定义一个方法fileUploaded（当服务器成功响应以后回调）
      fileUploaded(response, file, fileList) {
        // console.log(response);
        this.ruleForm.fileList = [response];
      },
      // 4.0 注册富文本编辑器的内容改变事件onEditorChange

      onEditorChange(ev) {

        console.log(ev);

        this.ruleForm.content = ev.html;

      },

      // 获取商品分类数据
      getcatelist() {
        var url = "/admin/category/getlist/goods";
        this.$ajax.get(url)
          .then(res => {
            // console.log(res);
            this.catalist = res.data.message;
          })
      },
      // 提交保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            var url = "/admin/goods/add/goods";
            this.$ajax.post(url, this.ruleForm)
              .then(res => {
                // console.log(111);
                console.log(res);
                if (res.data.status == 1) {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: 'error',
                    duration: 1000
                  });
                } else {
                  this.$router.push({ name: "goodlist" });
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.getcatelist();
    }
  }
</script>
<style scoped>
</style>