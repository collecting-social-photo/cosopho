import axios from 'axios'

export const state = () => ({
  instance: null,
  user: null
})

export const mutations = {
  SET_INSTANCE (state, instance) {
    state.instance = instance || null
  },
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    const subdomains = req.subdomains
    console.log(subdomains)
    var subdomain = null
    if (subdomains && subdomains.length) {
      subdomain = subdomains[0]
    } else {
      console.log("Invalid instance!")
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
      commit('SET_INSTANCE', response.data.data.instance)
    } else {
      console.log("Invalid instance!")
      return
    }
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
