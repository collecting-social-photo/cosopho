import axios from 'axios'

export default function ({ store, app, redirect, route }) {
  axios.defaults.timeout = 60000

  if (!store.state.instance) {
    return
  }

  const instanceId = store.state.instance.id
  const languages = store.state.instance.languages

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

  const apiToken = `${process.env.apiKey}-${process.env.signature}`

  axios.post(
    `${process.env.apiEndpoint}?cache=${Math.random()}`,
    payload,
    {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'content-type': 'application/json'
      }
    }
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

      store.commit('SET_LANGUAGES_LOADED', true)

      // if no locale is defined, use default from API
      if (!app.i18n.locale) {
        app.i18n.locale = store.state.instance.defaultLanguage || 'en'

        if (process.client && !route.path.includes('/about-cosopho') && !route.path.includes('/projector')) {
          redirect(app.localePath('index'))
        }
      }
    })
  }).catch(function (error) {
    console.log(error)
  })
}
