import axios from "axios";
import qs from "qs";

// 创建axios实例
const Axios = axios.create({
  // timeout: 15000
});

Axios.defaults.baseURL = process.env.NODE_ENV === `production` ? `` : ``;
// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    if (config.method !== `get`) {
      config.data = qs.stringify(config.data);
    }
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.log(error);
    alert(`网络服务错误，请稍后尝试`);
    return Promise.reject(error);
  }
);
// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.code === 200) {
      return data;
    } else {
      alert(data.msg);
      return Promise.reject(data);
    }
  },
  error => {
    if (error.response.status === 401) {
      alert(`登录失效`);
      window.location.reload();
    } else if (error.response.status === 403) {
      alert(`权限不足`);
    } else {
      alert(error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * 判断请求的类型
 */
export default (url, Data_, method = `GET`) => {
  let Data = Data_ ? Data_ : {};
  if (method === `GET`) {
    return Axios.get(
      url,
      Data.params
        ? Data : {
            params: Data
          }
    );
  }
  return Axios.post(url, Data);
};
