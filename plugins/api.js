const apiFactory = ($axios, app, store) => ({

  async makeRequest (payload) {
    return await $axios.post(
      '/api',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.apiKey}`,
          'content-type': 'application/json'
        }
      }
    )
  },

  getPhotos (variables) {
    const payload = {
      query: `query photos($instance: String, $per_page: Int, $page: Int) {
        photos(instance: $instance, per_page: $per_page, page: $page) {
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
  }

})

export default ({ $axios, app, store }, inject) => {
  const api = apiFactory($axios, app, store)

  // $axios.onError(error => {
  //   app.$toast.error('There was an error loading this page. Please try again later.', { duration : 5000 })
  // })

  inject('api', api)
}