import axios from 'axios'

export default function({ store, app }) {

  if (!store.state.instance) {
    return
  }

  const instanceId = store.state.instance.id
  const languages = store.state.instance.languages

  var url = `https://${instanceId}.collectingsocialphoto.com/api`

  if (process.env.NODE_ENV !== 'production') {
    url = `http://${instanceId}.cosopho.com:3000/api`
  }

  const payload = {
    query: `query strings($instance: String) {
      default: strings(instance: "cosophoheroku_001") {
        language
        stub
        string
        instance
      }
      instance: strings(instance: $instance) {
        language
        stub
        string
        instance
      }
    }`,
    variables: {
      language: 'en',
      instance: instanceId
    }
  }
  axios.post(
    url,
    payload,
  ).then(function (response) {
    const defaultStrings = response.data.data.default
    const instanceStrings = response.data.data.instance
    var strings = instanceStrings

    if (!strings.length) {
      strings = defaultStrings
    }

    _.each(languages, function(lang) {
      var translations = {}
      _.each(strings, function(string) {
        if (string.language === lang) {
          translations[string.stub] = string.string
        }
      })
      app.i18n.setLocaleMessage(lang, translations)
    })

  })
}
