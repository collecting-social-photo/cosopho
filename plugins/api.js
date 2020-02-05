const apiFactory = ($axios, app) => ({
  async makeRequest (payload) {
    return await $axios.post(`${process.env.appUrl}/api`, payload)
  }
})

export default ({ $axios, app }, inject) => {
  const api = apiFactory($axios, app)

  // $axios.onError(error => {
  //   app.$toast.error('There was an error loading this page. Please try again later.', { duration : 5000 })
  // })

  inject('api', api)
}