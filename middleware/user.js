export default async function ({ app, store, redirect }) {
  // set store user
  if (app.$auth.loggedIn && !store.state.user) {
    let response = await app.$api.getPerson({
      id: app.$auth.user.sub
    })

    const person = response.data.data.person
    store.commit('SET_USER', person)
  }

  // clear store user
  if (!app.$auth.loggedIn && store.state.user) {
    store.commit('SET_USER', null)
  }

}
