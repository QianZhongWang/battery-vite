// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import enhance from './modules/enhance'
import getters from './getters'

// Vue.use(Vuex)

export default createStore({
  modules: {
    app,
    user,
    permission,
    enhance
  },
  state(){
    return {
      basicURL: process.env.VUE_APP_BASE_API,
      isDebug: false,
      utils: ['general', 'c_vue', 'c_ant']
    }
  },
  mutations: {
  },
  actions: {
  },
  getters
})
