export default function ({ app, store, redirect }) {
  if (!app.$auth.loggedIn && !store.state.user) {
    app.$auth.loginWith('auth0')
  }
}
