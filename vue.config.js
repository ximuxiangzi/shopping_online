const path = require('path')
module.exports = {
  //只要修改 要重新npm run dev
  //关闭语法检查
  lintOnSave: false,

  //开启代理服务器（方式一）
  // devServer:{
  //   proxy:'http://localhost:5000'
  // },
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite:{'^/api':''},//把请求里/api转换为空字符串
        ws: true,//用于支持websocket
        changeOrigin: true//用于控制请求头中的host值
      },
      '/foo': {
        target: 'http://localhost:5001',
        pathRewrite:{'^/foo':''},
      }
    }
  },

  pluginOptions: {
    // 'style-resources-loader': {
    //   preProcessor: 'scss',
    //   patterns: []
    // },
    "style-resources-loader": {
      preProcessor: "less",
      // patterns: [],
      patterns: [path.join(__dirname, "./src/assets/style/index.less")],
    },
  }
}
