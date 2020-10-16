import axios from 'axios'
const https = require('https')

export default async function ({ store, app, req, redirect, error }) {
  axios.defaults.timeout = 60000

  let currentHostname = `https://${req.headers.host}`
  const subdomains = req.headers.host.split('.')
  let subdomain = null
  if (subdomains && subdomains.length) {
    subdomain = subdomains[0]
  }

  // TODO GROSS! Remove this once we have domains in the database
  if ((req.headers.host).includes('stockholmslansmuseum.collectingsocialphoto.')) {
    subdomain = 'stockholm-co-fafaf0da5a71f82d'
  } else if ((req.headers.host).includes('aalborgstadsarkiv.collectingsocialphoto.')) {
    subdomain = 'aalborg-city-ed1393df5c4099e5'
  } else if ((req.headers.host).includes('valokuvamuseo.collectingsocialphoto.')) {
    subdomain = 'the-finnish--d7330c10c367d4fd'
  } else if ((req.headers.host).includes('nordiskamuseet.collectingsocialphoto.')) {
    subdomain = 'nordic-museu-76ba77f9ebd5d275'
  } else if ((req.headers.host).includes('vasternorrland.collectingsocialphoto.')) {
    subdomain = 'stiftelsen-l-ea94dfe2c6210320'
  } else {
    // TODO: add a default instance name in .env
    subdomain = 'connect-to-c-5f0ff3a2fc4cd1fe'
  }

  if (subdomain === 'www' && !req.url.includes('/about-cosopho')) {
    redirect('/en/home')
  }

  if (subdomain === 'www') {
    subdomain = 'connect-to-c-5f0ff3a2fc4cd1fe'
  }

  const payload = {
    query: `query instances($id: String) {
      instance(id: $id){
        id
        title
        colour
        logo
        languages
        defaultLanguage
        userFields
        initiatives {
          id
        }
      }
    }`,
    variables: {
      id: subdomain
    }
  }

  let response = null
  try {
    response = await axios.post(
      `${process.env.apiEndpoint}?cache=${Math.random()}`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.apiKey}-${process.env.signature}`,
          'content-type': 'application/json'
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }
    )
  } catch (err) {
    console.log('ServerInit Error', err)
    app.$sentry.captureException(err)
    error({ statusCode: 500, message: 'API failed' })
    return
  }

  if (response && response.data && response.data.data && response.data.data.instance) {
    const languages = response.data.data.instance.languages || []

    languages.push('en')
    response.data.data.instance.languages = _.union(languages)

    if (process.env.NODE_ENV !== 'production') {
      currentHostname = 'http' + currentHostname.substr(5)
    }

    store.commit('SET_INSTANCE', response.data.data.instance)
    store.commit('SET_HOSTNAME', currentHostname)
  } else {
    console.log('NO INSTANCE')
  }
}
