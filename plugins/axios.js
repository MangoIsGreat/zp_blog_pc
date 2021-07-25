import { getLocalStorage } from "@/utils/store";
import { encode } from "@/utils/encode";

export default ({ $axios }) => {
  // 设置基地址
  // $axios.defaults.baseURL = 'http://XXX/api';
  // 请求拦截器
  $axios.onRequest(config => {
    const token = getLocalStorage("user_token");
    // 将获取到token加入到请求头中
    if (token) {
      config.headers.common["Authorization"] = encode(token);
    }

    return config;
  });

  // 响应拦截器
  $axios.onResponse(response => {
    return response.data;
  });

  $axios.onRequestError(err => {
    return Promise.reject(err);
  });
  $axios.onResponseError(err => {
    return Promise.reject(err);
  });

  $axios.onError(err => {
    return Promise.reject(err);
  });
};
