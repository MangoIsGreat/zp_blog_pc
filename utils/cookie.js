// 设置cookie
export function setCookie(app, key, value) {
  app.$cookies.set(key, value);
}

// 获取cookie
export function getCookie(app, key) {
  return app.$cookies.get(key);
}

// 移除cookie
export function removeCookie(app, key) {
  app.$cookies.remove(key);
}
