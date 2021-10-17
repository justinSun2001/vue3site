import { createStore } from 'vuex'

export default createStore({
  state: {
    likes:0,
    pageIndex:1
  },
  mutations: {
    increment (state) {
      state.likes++
    },
    getIndex (state, index) {
      state.pageIndex=index
    }
  },
  actions: {
  },
  modules: {
  }
})
