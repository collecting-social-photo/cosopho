const apiFactory = ($axios, app, store) => ({

  async makeRequest (payload) {
    const hostname = store.state.hostname
    return await $axios.post(
      `${hostname}/api`,
      payload
    )
  },

  getPerson (variables) {
    const payload = {
      query: `query person($id: String, $slug: String, $instance: String!) {
        person(id: $id, slug: $slug, instance: $instance) {
          id
          name
          slug
          username
          avatar
        }
      }`,
      variables
    }

    return this.makeRequest(payload)
  },

  createPerson (variables) {
    const payload = {
      query: `mutation ($id: String!, $instance: String!, $username: String!, $avatar: String!, $raw: String!) {
        createPerson(id: $id, instance: $instance, username: $username, avatar: $avatar, raw: $raw) {
          id
          name
          slug
          username
          avatar
        }
      }`,
      variables
    }

    return this.makeRequest(payload)
  },

  getPhotos (variables) {
    const payload = {
      query: `query photos($instance: String, $per_page: Int, $page: Int, $initiatives: [String], $peopleSlugs: [String], $archived: Boolean) {
        photos(instance: $instance, per_page: $per_page, page: $page, initiatives: $initiatives, peopleSlugs: $peopleSlugs, archived: $archived) {
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
      variables
    }

    return this.makeRequest(payload)
  },

  getPhoto (variables) {
    const payload = {
      query: `query photo($instance: String, $id: String!) {
        photo(instance: $instance, id: $id) {
          id
          title
          date
          license
          story
          initiative
          tags
          location
          socialMedias
          otherSM
          make
          model
          aperture
          shutterSpeed
          ISO
          focalLength
          license
          approved
          archived
          person {
            id
            username
            name
            slug
            avatar
          }
          data {
            height
            width
            public_id
            version
          }
        }
      }`,
      variables
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
      variables
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
      variables
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
      variables
    }

    return this.makeRequest(payload)
  },

  createPhoto (variables) {
    const payload = {
      query: `mutation (
        $instance: String!,
        $personSlug: String!,
        $title: String!,
        $story: String,
        $initiative: String!,
        $tags: [String],
        $location: String,
        $date: String,
        $socialMedias: [String],
        $otherSM: String,
        $make: String,
        $model: String,
        $aperture: Float,
        $shutterSpeed: Float,
        $ISO: Int,
        $focalLength: Int,
        $license: String,
        $approved: Boolean,
        $archived: Boolean,
        $data: String,
        $notes: String,
        ) {
        createPhoto(
          instance: $instance,
          personSlug: $personSlug,
          title: $title,
          story: $story,
          initiative: $initiative,
          tags: $tags,
          location: $location,
          date: $date,
          socialMedias: $socialMedias,
          otherSM: $otherSM,
          make: $make,
          model: $model,
          aperture: $aperture,
          shutterSpeed: $shutterSpeed,
          ISO: $ISO,
          focalLength: $focalLength,
          license: $license,
          approved: $approved,
          archived: $archived,
          data: $data,
          notes: $notes) {
          id
        }
      }`,
      variables
    }

    return this.makeRequest(payload)
  },

  async deletePhoto (id) {
    const hostname = store.state.hostname
    const response = await $axios.delete(
      `${hostname}/cloudinary?id=${id}`
    )
    return response
  }

})

export default ({ $axios, app, store }, inject) => {
  const api = apiFactory($axios, app, store)

  // $axios.onError(error => {
  //   app.$toast.error('There was an error loading this page. Please try again later.', { duration : 5000 })
  // })

  inject('api', api)
}
