import { createStore } from 'vuex'

export default createStore({
  state: {
    userToken:'',
    currentPage:1,
    currentPage1:1,
  },
  mutations: {
    setUserToken (state, token) {
      state.userToken = token;
    },
    setCurrentPage (state, page) {
      state.currentPage = page;
    },
    setCurrentPage1 (state, page) {
      state.currentPage1 = page;
    }
  },
  actions: {
  },
  modules: {
  }
})
