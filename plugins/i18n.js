import axios from 'axios'

export default function ({ store, app }) {
  if (!store.state.instance) {
    return
  }

  const instanceId = store.state.instance.id
  const languages = store.state.instance.languages
  const hostname = store.state.hostname

  const payload = {
    query: `query strings($instance: String) {
      default: strings(instance: "cosophoheroku_001", per_page: 1000) {
        language
        stub
        string
        section
        instance
      }
      instance: strings(instance: $instance, per_page: 1000) {
        language
        stub
        string
        section
        instance
      }
    }`,
    variables: {
      language: 'en',
      instance: instanceId
    }
  }
  axios.post(
    `${hostname}/api`,
    payload
  ).then(function (response) {
    const defaultStrings = response.data.data.default
    const instanceStrings = response.data.data.instance
    let strings = instanceStrings

    if (!strings.length) {
      strings = defaultStrings
    }

    _.each(languages, function (lang) {
      const translations = {}
      _.each(strings, function (string) {
        if (string.language === lang) {
          translations[`${string.section}-${string.stub}`] = string.string
        }
      })
      app.i18n.setLocaleMessage(lang, translations)
    })
  })
}
