// 设置localStorage
export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

// 获取localStorage
export const getLocalStorage = key => {
  return JSON.parse(window.localStorage.getItem(key));
};

// 移除localStorage
export const removeLocalStorage = key => {
  window.localStorage.removeItem(key);
};
