export default async function ({ app, store, redirect }) {
  // set store user
  if (app.$auth.loggedIn && !store.state.user) {
    // first see if user exists
    let response = await app.$api.getPerson({
      id: app.$auth.user.sub,
      instance: store.state.instance.id
    })

    // if not, create user
    if (!response.data.data.person) {
      response = await app.$api.createPerson({
        id: app.$auth.user.sub,
        instance: store.state.instance.id,
        username: app.$auth.user.name,
        avatar: app.$auth.user.picture,
        raw: JSON.stringify(app.$auth.user)
      })
    }

    // store user
    const person = response.data.data.person
    store.commit('SET_USER', person)
  }

  // clear store user
  if (!app.$auth.loggedIn && store.state.user) {
    store.commit('SET_USER', null)
  }
}
