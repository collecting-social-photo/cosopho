const utilsFactory = store => ({
  profileIsReady () {
    const user = store.state.user

    if (user.slug && user.name && user.username && user.email && user.gender && user.dateOfBirth && user.placeOfBirth) {
      return true
    }

    return false
  }
})

export default ({ store }, inject) => {
  const utils = utilsFactory(store)
  inject('utils', utils)
}
