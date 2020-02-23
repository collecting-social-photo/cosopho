import axios from 'axios'

export const state = () => ({
  user: null,
  instance: null,
  hostname: null
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
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, redirect }) {
    const subdomains = req.headers.host.split(".")
    var subdomain = null
    if (subdomains && subdomains.length) {
      subdomain = subdomains[0]
    } else {
      redirect('/home')
      return
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

    if(response.data.data.instance) {

      var languages = response.data.data.instance.languages
      languages.push('en')

      response.data.data.instance.languages = _.union(languages)

      var currentHostname = `https://${response.data.data.instance.id}.collectingsocialphoto.com`

      if (process.env.NODE_ENV !== 'production') {
        currentHostname = `http://${response.data.data.instance.id}.cosopho.com:3000`
      }

      commit('SET_INSTANCE', response.data.data.instance)
      commit('SET_HOSTNAME', currentHostname)
    } else {
      redirect('/home')
      return
    }
  }
}
