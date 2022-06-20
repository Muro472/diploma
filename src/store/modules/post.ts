export default {
  namespaced: true,
  state: {
    postHash: "",
  },
  getters: {
    getPostHash(state: { postHash: string }) {
      return state.postHash;
    },
  },
  mutations: {
    setPostHash(state: { postHash: string }, data: string) {
      state.postHash = data;
    },
  },
};
