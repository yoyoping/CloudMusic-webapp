import axios from "axios";
// import Router from "../router";
import qs from "qs";
import ApiUrl from "./api";
import { Toast } from "vant";

// 创建axios实例
const Axios = axios.create({
  // timeout: 5000
});

Axios.defaults.baseURL =
  process.env.NODE_ENV === `production` ? `http://121.196.110.187:3000` : ``;
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
      return Promise.reject(data);
    }
  },
  error => {
    if (error.response.status === 500) {
      Toast.fail(error.response.statusText);
    } else if (error.response.status === 404) {
      Toast.fail(`资源未找到`);
    } else if (error.response.status === 301) {
      Toast.fail(error.response.data.msg);
    } else {
      Toast.fail(error.response.data.msg);
    }
    return Promise.reject(error);
  }
);

/**
 * 判断请求的类型
 */
// export default (url, Data_, method = `GET`) => {
//   let Data = Data_ ? Data_ : {};
//   if (method === `GET`) {
//     return Axios.get(
//       url,
//       Data.params
//         ? Data : {
//             params: Data
//           }
//     );
//   }
//   return Axios.post(url, Data);
// };

export default params => {
  // 请求的url
  let url_ = ApiUrl[params[`urlCode`]].url;
  // 请求的方法类型
  const method_ = params.method || `GET`;
  // 获取传给后端的参数
  let param = JSON.parse(JSON.stringify(params));
  delete param[`urlCode`];
  delete param.method;
  if (method_ === `GET`) {
    return Axios.get(
      url_,
      param.params
        ? param
        : {
            params: param
          }
    );
  }
  return Axios.post(url_, param);
};
