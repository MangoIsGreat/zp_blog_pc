// const { getLocalStorage } = require("@/utils/store");

export const state = () => ({
  // loginOrNot: getLocalStorage("user_token") ? true : false, //是否登录
  isLogin: false, // 是否打开登录弹框
  isShowInfo: false // 是否打开用户信息浮窗面板
});

export const mutations = {
  toggleOpen(state, isOpen) {
    state.isLogin = isOpen;
  },
  toggleInfoOpen(state, isOpen) {
    state.isShowInfo = isOpen;
  }
  // toggleLogin(state, isLogin) {
  //   state.loginOrNot = isLogin;
  // }
};
