export default async function ({ app, store, redirect }) {
  // set store user
  if (app.$auth.loggedIn && !store.state.user) {
    // first see if user exists
    let response = await app.$api.getPersonAdmin({
      id: app.$auth.user.sub,
      instance: store.state.instance.id
    }, process.env.SIGNATURE)

    if (response.data.data.person && response.data.data.person.suspended) {
      store.commit('SET_USER', null)
    }

    if (response.data.data.person && response.data.data.person.deleted) {
      console.log('Deleted account found. Reactivating.')
      response = await app.$api.updatePerson({
        id: app.$auth.user.sub,
        avatar: app.$auth.user.picture,
        deleted: false
      }, process.env.SIGNATURE)
    } else
    if (!response.data.data.person) {
      console.log('New user! Creating.')
      response = await app.$api.createPerson({
        id: app.$auth.user.sub,
        instance: store.state.instance.id,
        username: app.$auth.user.username || app.$auth.user.name,
        avatar: app.$auth.user.picture,
        raw: JSON.stringify(app.$auth.user)
      }, process.env.SIGNATURE)
    }

    // store user
    if (response.data.data.person) {
      const person = response.data.data.person
      store.commit('SET_USER', person)
    } else {
      console.log(`Not able to fetch user id: ${app.$auth.user.sub} for instance: ${store.state.instance.id}`, response.data)
      app.$auth.logout()
    }
  }

  // clear store user
  if (!app.$auth.loggedIn && store.state.user) {
    store.commit('SET_USER', null)
  }
}
