export const state = () => ({
  host: null,
  user: null
})

export const mutations = {
  initHost (state, host) {
    state.host = host
  },
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('initHost', req.headers.host)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}
