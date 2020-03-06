import axios from 'axios'

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

export const actions = {
  async nuxtServerInit ({ commit }, { req, redirect }) {
    let currentHostname = `https://www.collectingsocialphoto.com`
    const subdomains = req.headers.host.split('.')
    let subdomain = null
    if (subdomains && subdomains.length) {
      subdomain = subdomains[0]
    }

    if (req.path === '/home') {
      return
    }

    if (subdomain === 'www') {
      redirect('/home')
    }

    const payload = {
      query: `query instances($id: String) {
        instance(id: $id){
          id
          title
          colour
          logo
          languages
          defaultLanguage
          userFields
          initiatives {
            id
          }
        }
      }`,
      variables: {
        id: subdomain
      }
    }

    const response = await axios.post(
      process.env.API_ENDPOINT,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`,
          'content-type': 'application/json'
        }
      }
    )

    if (response.data.data.instance) {
      const languages = response.data.data.instance.languages || []

      languages.push('en')
      response.data.data.instance.languages = _.union(languages)

      if (process.env.NODE_ENV !== 'production') {
        currentHostname = `http://${response.data.data.instance.id}.cosopho.com:3000`
      }

      commit('SET_INSTANCE', response.data.data.instance)
      commit('SET_HOSTNAME', currentHostname)
    }
  }
}
