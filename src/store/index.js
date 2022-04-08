import { createStore } from 'vuex'

export default createStore({
  state: {
    articleIndex:1,
    userToken:''
  },
  mutations: {
    getIndex (state, index) {
      state.articleIndex=index
    },
    setUserToken (state, token) {
      state.userToken = token;
    }
  },
  actions: {
  },
  modules: {
  }
})
