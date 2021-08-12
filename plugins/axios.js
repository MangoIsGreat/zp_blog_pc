// import { getLocalStorage } from "@/utils/store";
import { getCookie } from "@/utils/cookie";
import { encode } from "@/utils/encode";

export default ({ $axios, app, store }) => {
  // 设置基地址
  // $axios.defaults.baseURL = 'http://XXX/api';
  // 请求拦截器
  $axios.onRequest(config => {
    const token = getCookie(app, "user_token");
    // 将获取到token加入到请求头中
    if (token) {
      config.headers.common["Authorization"] = encode(token);
    }

    return config;
  });

  // 响应拦截器
  $axios.onResponse(response => {
    // 未登录弹出登录弹框
    if (response.data.error_code === 10006) {
      store.commit("login/toggleOpen", true);
      response.data.error_code = 0;
    }

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
