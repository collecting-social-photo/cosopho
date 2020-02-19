import axios from 'axios'

export default (context) => {
  var url = 'https://micah-walter-674bb737a19d3046.collectingsocialphoto.com/api'

  if (process.env.NODE_ENV !== 'production') {
    url = 'http://micah-walter-674bb737a19d3046.cosopho.com:3000/api'
  }

  return new Promise(function (resolve) {

    const payload = {
      query: `query strings($language: [String]) {
        strings(language: $language){
          stub
          string
        }
      }`,
      variables: {
        language: 'sv'
      }
    }
    axios.post(
      url,
      payload,
    ).then(function (response) {

      const strings = response.data.data.strings

      var translations = {}

      _.each(strings, function(string) {
        translations[string.stub] = string.string
      })

      resolve(translations)

    })

  })
}