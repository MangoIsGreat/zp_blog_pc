export const state = () => ({
  searchValue: []
});

export const mutations = {
  setSearchValue(state, value) {
    state.searchValue = value;
  }
};
