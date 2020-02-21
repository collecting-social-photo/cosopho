const apiFactory = ($axios, app, store) => ({

  async makeRequest (payload) {
    const hostname = store.state.hostname
    return await $axios.post(
      `${hostname}/api`,
      payload
    )
  },

  getPhotos (variables) {
    const payload = {
      query: `query photos($instance: String, $per_page: Int, $page: Int, $initiatives: [String]) {
        photos(instance: $instance, per_page: $per_page, page: $page, initiatives: $initiatives) {
          id
          title
          data {
            height
            width
            public_id
            version
          }
          _sys {
            pagination {
              page
              total
              maxPage
            }
          }
        }
      }`,
      variables: variables
    }

    return this.makeRequest(payload)
  },

  getPhoto (variables) {
    const payload = {
      query: `query photo($instance: String, $id: String!) {
        photo(instance: $instance, id: $id) {
          id
          title
          location
          date
          license
          person {
            id
            username
            name
          }
          data {
            height
            width
            public_id
            version
          }
        }
      }`,
      variables: variables
    }

    return this.makeRequest(payload)
  },

  getInstances (variables) {
    const payload = {
      query: `query instances($per_page: Int) {
        instances(per_page: $per_page) {
          id
          title
        }
      }`,
      variables: variables
    }

    return this.makeRequest(payload)
  },

  getInitiatives (variables) {
    const payload = {
      query: `query initiatives($instance: String!, $per_page: Int, $isFeatured: Boolean) {
        initiatives(instance: $instance, per_page: $per_page, isFeatured: $isFeatured) {
          id
          slug
          title
          photos {
            id
            data {
              height
              width
              public_id
              version
            }
          }
        }
      }`,
      variables: variables
    }

    return this.makeRequest(payload)
  },

  getInitiative (variables) {
    const payload = {
      query: `query initiative($instance: String!, $slug: String) {
        initiative(instance: $instance, slug: $slug) {
          id
          slug
          title
        }
      }`,
      variables: variables
    }

    return this.makeRequest(payload)
  }

})

export default ({ $axios, app, store }, inject) => {
  const api = apiFactory($axios, app, store)

  // $axios.onError(error => {
  //   app.$toast.error('There was an error loading this page. Please try again later.', { duration : 5000 })
  // })

  inject('api', api)
}