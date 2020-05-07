import axios from 'axios'

const https = require('https')

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
  async nuxtServerInit ({ commit }, { req, redirect, $sentry }) {
    let currentHostname = `https://${req.headers.host}`
    const subdomains = req.headers.host.split('.')
    let subdomain = null
    if (subdomains && subdomains.length) {
      subdomain = subdomains[0]
    }

    // TODO GROSS! Remove this once we have domains in the database
    if ((req.headers.host).includes('stockholmslansmuseum.collectingsocialphoto.')) {
      subdomain = 'stockholm-co-fafaf0da5a71f82d'
    } else if ((req.headers.host).includes('aalborgstadsarkiv.collectingsocialphoto.')) {
      subdomain = 'aalborg-city-ed1393df5c4099e5'
    } else if ((req.headers.host).includes('valokuvamuseo.collectingsocialphoto.')) {
      subdomain = 'the-finnish--d7330c10c367d4fd'
    } else if ((req.headers.host).includes('nordiskamuseet.collectingsocialphoto.')) {
      subdomain = 'nordic-museu-76ba77f9ebd5d275'
    } else if ((req.headers.host).includes('cosopho.collectingsocialphoto.')) {
      subdomain = 'connect-to-c-5f0ff3a2fc4cd1fe'
    }

    // if (req.url.includes('/home') || req.url.includes('/about-cosopho')) {
    //   return
    // }

    if (subdomain === 'www' && !req.url.includes('/about-cosopho')) {
      redirect('/en/home')
    }

    if (subdomain === 'www') {
      subdomain = 'connect-to-c-5f0ff3a2fc4cd1fe'
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

    let response = null
    try {
      response = await axios.post(
        `${process.env.apiEndpoint}?cache=${Math.random()}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${process.env.apiKey}-${process.env.signature}`,
            'content-type': 'application/json'
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
      )
    } catch (error) {
      console.log('ServerInit Error', error)
      $sentry.captureException(error)
    }

    if (response && response.data && response.data.data.instance) {
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
