export default async function ({ app, store, redirect }) {
  if (app.$auth.loggedIn && !store.state.user) {
    console.log('user not set but it should!', app.$auth.user.sub)

    let response = await app.$api.getPerson({
      id: app.$auth.user.sub
    })

    const person = response.data.data.person
    store.commit('SET_USER', person)
  }
}
