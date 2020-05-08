export const state = () => ({
  user: null,
  instance: null,
  hostname: null,
  languagesLoaded: false
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_INSTANCE (state, instance) {
    state.instance = instance || null
  },
  SET_HOSTNAME (state, hostname) {
    state.hostname = hostname || null
  },
  SET_LANGUAGES_LOADED (state, languagesLoaded) {
    state.languagesLoaded = languagesLoaded || false
  }
}
