export const state = () => ({
  host: null
})

export const mutations = {
  initHost (state, host) {
    state.host = host
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('initHost', req.headers.host)
  }
}
