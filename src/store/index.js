import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions/'
import getters from './getters'
import mutations from './mutations/'
import state from './state'

Vue.use(Vuex)

const store = {
  strict: process.env.NODE_ENV === 'production',
  actions,
  getters,
  mutations,
  state
}

export default new Vuex.Store(store)
