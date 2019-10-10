/**
 * Created by Hou on 2019/8/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 注册模块
export default new Vuex.Store({
  // 首先声明一个状态 state
  state: {
    tabModule: 'index'
  },
  mutations: {
    setTabModule (state, tabModule) {
      state.tabModule = tabModule
    }
  }
})
