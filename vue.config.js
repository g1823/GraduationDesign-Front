const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭语法检查
  devServer:{//开启服务器代理，避免同源策略
    port:9999,//修改默认8080端口为9999
  }
})
