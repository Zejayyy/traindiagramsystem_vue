import axios from "axios";
import store from "@/store";
import router from "@/router";
import { Message } from "element-ui";

import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 注入 token
    // 通过引入的方式拿到vuex中的token，将token放到请求头内
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  (response) => {
    // axios默认在拿到的数据外包裹了一层 data，需要通过 response.data 拿到真实响应的数据
    const { data, message, success } = response.data;
    if (success) {
      return data;

    } else {
      Message({ type: error, message });
      return Promise.reject(new Error(message));
    }
  },
  async (error) => {
    if (error.response.status === 401) {
      Message({ type: "warning", message: "登录超时" })
      // 调用退出登录接口
      await store.dispatch('user/logout');
      // 跳转到登录页
      router.push('/login');
      return Promise.reject(error);
    }
    Message({
      type: error,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default service;
