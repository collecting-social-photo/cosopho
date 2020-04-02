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
    let currentHostname = `https://${req.headers.host}`
    const subdomains = req.headers.host.split('.')
    let subdomain = null
    let nordicHack = false
    if (subdomains && subdomains.length) {
      subdomain = subdomains[0]
    }

    // TODO GROSS! Remove this once we have domains in the database
    if ((req.headers.host).includes('stockholmslansmuseum.collectingsocialphoto.org')) {
      subdomain = 'stockholm-co-fafaf0da5a71f82d'
      nordicHack = true
    } else if ((req.headers.host).includes('aalborgstadsarkiv.collectingsocialphoto.org')) {
      subdomain = 'aalborg-city-ed1393df5c4099e5'
      nordicHack = true
    } else if ((req.headers.host).includes('valokuvamuseo.collectingsocialphoto.org')) {
      subdomain = 'the-finnish--d7330c10c367d4fd'
      nordicHack = true
    } else if ((req.headers.host).includes('nordiskamuseet.collectingsocialphoto.org')) {
      subdomain = 'nordic-museu-76ba77f9ebd5d275'
      nordicHack = true
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
