const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭语法检查
  devServer:{//开启服务器代理，避免同源策略
    proxy:{
      'api':{//表示匹配所有以'temp'开头的请求(就是在localhost:8080后面的第一个路径)
        target:'http://localhost:8888',//代理目标的基路径
        changeOrigin:false,//不开启改变请求头
        pathRewrite: {
          '^/api': '/' 
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://localhost:8888/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://localhost:8888/api/xxxx
        }
      }
    }
  }
})
