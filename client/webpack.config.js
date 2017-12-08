// 1.0导入node.js的path这个核心包
var path = require('path');

// 导入：html-webpack-plugin
var htmlwp = require('html-webpack-plugin');

// 导入webpack这个包
var webpack = require('webpack');

// 分离css的1步配置
var csstck = require('extract-text-webpack-plugin');

module.exports = {
  // 1.0指定webpack的打包的入口文件
  // 打包分离公共组件的第一步
  // entry: './src/main.js',
  entry: {
    build: './src/main.js',
    vendor1: ['vue', 'vue-router', 'vuex', 'axios'],
    vendor2: ['element-ui'],
    vendor2: ['v-distpicker'],
    vendor4: ['jquery']
  },

  // 2.0指定打包完成的以后的输出文件
  output: {
    // 指定的是build.js要生成的目录，注意：一定是一个绝对路径，写相对路径会报错
    path: path.join(__dirname, '/dist'),
    // 这个文件名称可以自定义
    filename: '[name].js'
  },
  // 导入jquery这个包
  resolve: {
    alias: {
      //   导入node_modules文件夹中的jquery这个包
      'jquery': 'jquery'
    }
  },
  // 3.0配置webpack相对于的loader包
  module: {
    // 在这里配置的是具体的某一个的loader
    loaders: [
      // 配置的是用来解析.css文件的loader(style-loader和css-loader)
      {
        // 3.0.1用正则匹配当前访问的文件的后缀名是.css
        test: /\.css$/,
        // loader: 'style-loader!css-loader'
        // use:将除了第一个包之外的其他所有的loader包放到use后面
        // fallback:将第一个包放到fallback的后面
        loader:csstck.extract({fallback:"style-loader",use:"css-loader"})
      },
      {
        // 3.0.2 less
        test: /\.less$/,
        // loader: 'style-loader!css-loader!less-loader'
        loader:csstck.extract({fallback:"style-loader",use:"css-loader!less-loader"})
      },
      {
        // 3.0.3 sass
        test: /\.scss$/,
        // loader: 'style-loader!css-loader!sass-loader'
        loader:csstck.extract({fallback:"style-loader",use:"css-loader!sass-loader"})
      },
      {
        // 3.0.4 配置的是用来解析.png,.jpg,.gif文件的loader(url-loader)
        test: /\.(png|jpg|gif|woff|ttf|eot|svg)$/,
        loader: 'url-loader'
      },
      // 3.0.5 为了兼容在webpack1.x中也能够正常的解析es6语法，所以做一个babel-loader的配置(在webpack2.x和webpac3.x中这个配置是可以省略的)
      {
        test: /\.js$/,//  用正则匹配当前访问的文件的后缀名是.js
        // 可以在url-loader?limit=设定的限定值大小(单位：Byte  1K=1024Byte )
        loader: 'babel-loader',  //注意这个地方不需要使用file-loader
        // node_modules文件夹中的所有.js文件应该排除
        exclude: /node_modules/
      },
      {
        // 3.0.6 配置的是用来解析.vue文件的loader(vue-loader)
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  // webpack需要使用的插件配置在这里
  plugins: [
    new htmlwp({
      filename: 'index.html',
      template: 'index.html'
    }),
    // 将jqeruy对象映射为$和jQuery
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    // 打包分离公共组件的第3步
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor4", "vendor3", "vendor2", "vendor1"],  //注意在调用的地方要和定义的地方顺序相反
      minChunks: Infinity
    }),
    new csstck("[name].css")
  ]
}