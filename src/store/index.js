/* eslint-disable eol-last */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notify: { color: 'error', message: '', type: '' },
    refresh: { isall: false, view: '' },
    reload: 'false',
    clear: 'false',
  },
  getters: {
    getNotify(state) {
      return state.notify
    },
    getRefresh(state) {
      return state.refresh
    },
    getClear(state) {
      return state.clear
    },
  },
  mutations: {
    showNotify(state, value = { color: 'info', message: '' }) {
      state.notify = value
    },
    alertWarn(state, message = '') {
      state.notify = { color: 'warning', message: message }
    },
    alertError(state, message = '') {
      state.notify = { color: 'error', message: message }
    },
    alertInfo(state, message = '') {
      state.notify = { color: '', message: message }
    },
    alertSuccess(state, message = '') {
      state.notify = { color: 'info', message: message }
    },
    refresh(state, view = '') {
      state.refresh = { isall: false, view: view }
    },
    refreshAll(state, isall = true) {
      state.refresh = { isall: isall, view: '' }
    },
    clear(state, isclear = 'true') {
      state.clear = isclear
      setTimeout(() => (state.clear = 'false'), 100)
    },
    reload(state) {
      state.reload = 'true'
      setTimeout(() => (state.reload = 'false'), 100)
    },
  },
  actions: {
    // setNotify({ commit, state }, value = { color: 'error', message: '' }) {
    //   console.dir({ state, value })
    //   return commit('showNotify')
    // },
  },
})
