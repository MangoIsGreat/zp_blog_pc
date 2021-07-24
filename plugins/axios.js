export default ({ $axios }) => {
  // 请求拦截器
  $axios.onRequest(config => {
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
