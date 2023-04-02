import Vue from 'vue'//引入Vue
import App from './App.vue'//引入所有组件的父组件App.vue
import router from './router'//引入自定义的路由，路由router在其内部引用
import store from './store'//引入store，vuex在其内部引用
import axios from 'axios'//引入网络请求axios
import ElementUI from 'element-ui'//引入ElemnetUI组件库
import 'element-ui/lib/theme-chalk/index.css'//引入ElementUI全部样式
import api from '@/api/index'//引入接口文件

Vue.config.productionTip = false
Vue.use(ElementUI)//应用ElemnetUI

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;//配置全局事件总线，类似于vuex的作用
    Vue.prototype.$axios = axios;//将axios挂载到vue实例上，这样在任何组件都可以直接通过this.$axios使用
    Vue.prototype.$api = api;//将api挂载到vue实例上，这样在任何组件都可以直接通过this.$api使用
  }
}).$mount('#app')
