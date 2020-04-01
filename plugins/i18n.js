import axios from 'axios'

export default function ({ store, app }) {
  axios.defaults.timeout = 10000

  if (!store.state.instance) {
    return
  }

  const instanceId = store.state.instance.id
  const languages = store.state.instance.languages
  const hostname = store.state.hostname

  const payload = {
    query: `query strings($instance: String) {
      instance: strings(instance: $instance, per_page: 2000, fill: true) {
        language
        stub
        string
        section
        instance
      }
    }`,
    variables: {
      instance: instanceId
    }
  }
  axios.post(
    `${hostname}/api`,
    payload
  ).then(function (response) {
    const strings = response.data.data.instance

    _.each(languages, function (lang) {
      const translations = {}
      _.each(strings, function (string) {
        if (string.language === lang) {
          translations[`${string.section}-${string.stub}`] = string.string
        }
      })
      app.i18n.setLocaleMessage(lang, translations)
      console.log('i18n strings loaded')
      store.commit('SET_LANGUAGES_LOADED', true)
    })
  })
}
