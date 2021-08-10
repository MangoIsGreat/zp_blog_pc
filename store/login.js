export const state = () => ({
  isLogin: false, // 是否打开登录弹框
  isShowInfo: false, // 是否打开用户信息浮窗面板
  userinfo: null // 用户信息
});

export const mutations = {
  toggleOpen(state, isOpen) {
    state.isLogin = isOpen;
  },
  toggleInfoOpen(state, isOpen) {
    state.isShowInfo = isOpen;
  },
  saveUserInfo(state, data) {
    state.userinfo = data;
  },
  clearUserInfo(state) {
    state.userinfo = null;
  }
};
