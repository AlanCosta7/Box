import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import user from './user/index-firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    loading: false,
    error: null,
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error,
  },
  mutations: {
    ...firebaseMutations,
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    APP_INIT({ commit }, payload) {
      commit('setLoading', false)
    },
    clearError({ commit }) {
      commit('clearError')
    },
    clearState({ commit }) {
      commit('setLoading', false)
      commit('setError', null)
      // commit('user/clearState', null)
    }
  }
})
