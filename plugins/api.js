const apiFactory = ($axios, app, store) => ({

  async makeRequest (payload, session) {
    let defaultHostname = `https://www.collectingsocialphoto.com`

    if (process.env.NODE_ENV !== 'production') {
      defaultHostname = `http://www.cosopho.com:3000`
    }

    const hostname = store.state.hostname || defaultHostname
    let path = `${hostname}/api`

    if (session) {
      path = `${hostname}/api?session=${session}`
    } else if (store.state.user && store.state.user.sessionId) {
      path = `${hostname}/api?session=${store.state.user.sessionId}`
    }

    const response = await $axios.post(
      path,
      payload
    )
    return response
  },

  getPerson (variables) {
    const payload = {
      query: `query person($id: String, $slug: String, $instance: String!) {
        person(id: $id, slug: $slug, instance: $instance, deleted: false, suspended: false) {
          id
          name
          slug
          username
          avatar
        }
      }`,
      variables
    }

    return this.makeRequest(payload, false)
  },

  getPersonAdmin (variables, session) {
    const payload = {
      query: `query person($id: String, $instance: String!) {
        person(id: $id, instance: $instance) {
          id
          name
          slug
          username
          avatar
          instance
          deleted
          suspended
          sessionId
        }
      }`,
      variables
    }

    return this.makeRequest(payload, session)
  },

  getPersonFull (variables) {
    const payload = {
      query: `query person($id: String, $slug: String) {
        person(id: $id, slug: $slug, deleted: false, suspended: false) {
          id
          instance
          slug
          username
          avatar
          name
          gender
          facebook
          instagram
          twitter
          personalSite
          bio
          email
          dateOfBirth
          placeOfBirth
        }
      }`,
      variables
    }

    return this.makeRequest(payload, false)
  },

  createPerson (variables, session) {
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

    return this.makeRequest(payload, session)
  },

  updatePerson (variables, session) {
    const payload = {
      query: `mutation ($id: String!, $instance: String!, $username: String, $avatar: String, $name: String, $gender: String, $facebook: String, $instagram: String, $twitter: String, $personalSite: String, $bio: String, $email: String, $dateOfBirth: String, $placeOfBirth: String, $deleted: Boolean) {
        updatePerson(id: $id, instance: $instance, username: $username, avatar: $avatar, name: $name, gender: $gender, facebook: $facebook, instagram: $instagram, twitter: $twitter, personalSite: $personalSite, bio: $bio, email: $email, dateOfBirth: $dateOfBirth, placeOfBirth: $placeOfBirth, deleted: $deleted) {
          id
          name
          slug
          username
          avatar
          email
        }
      }`,
      variables
    }

    return this.makeRequest(payload, session)
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

    return this.makeRequest(payload, false)
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

    return this.makeRequest(payload, false)
  },

  getInstances (variables) {
    const payload = {
      query: `query instances($per_page: Int) {
        instances(per_page: $per_page) {
          id
          title
          logo
          colour
          defaultLanguage
        }
      }`,
      variables
    }

    return this.makeRequest(payload, false)
  },

  getInitiatives (variables) {
    const payload = {
      query: `query initiatives($instance: String!, $per_page: Int, $isFeatured: Boolean, $photos_archived: Boolean) {
        initiatives(instance: $instance, per_page: $per_page, isFeatured: $isFeatured, photos_archived: $photos_archived) {
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
            archived
            person {
              name
              username
            }
          }
        }
      }`,
      variables
    }

    return this.makeRequest(payload, false)
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

    return this.makeRequest(payload, false)
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

    return this.makeRequest(payload, false)
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
