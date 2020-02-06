export default function ({ app, store, redirect }) {
  if (!app.$auth.loggedIn) {
    app.$auth.loginWith('auth0')
  }
}
