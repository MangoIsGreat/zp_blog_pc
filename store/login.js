export const state = () => ({
  isLogin: false
});

export const mutations = {
  toggleOpen(state, isOpen) {
    state.isLogin = isOpen;
  }
};
