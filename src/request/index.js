import axios from "axios"

// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'http://localhost:8888',
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  if (token != null) {
    config.headers.Authorization = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;