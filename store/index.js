import axios from 'axios'

export const state = () => ({
  instance: null
})

export const mutations = {
  SET_INSTANCE (state, instance) {
    state.instance = instance || null
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
      commit('SET_INSTANCE', response.data.data.instance)
    } else {
      redirect('/home')
      return
    }
  }
}
