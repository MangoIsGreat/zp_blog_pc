// 设置localStorage
export const setLocalStorage = (key, value) => {
  if (!process.browser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

// 获取localStorage
export const getLocalStorage = key => {
  if (!process.browser) return;
  return JSON.parse(window.localStorage.getItem(key));
};

// 移除localStorage
export const removeLocalStorage = key => {
  if (!process.browser) return;
  window.localStorage.removeItem(key);
};
