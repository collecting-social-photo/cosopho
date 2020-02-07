
require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

  env: {
    apiKey: process.env.API_KEY,
    apiEndpoint: process.env.API_ENDPOINT,
    instanceId: process.env.INSTANCE_ID
  },

  head: {
    title: 'Collecting Social Photo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.4.0.min.js', integrity: 'sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=', crossorigin: 'anonymous' },
      { src: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver,IntersectionObserverEntry', crossorigin: "anonymous" }
    ]
  },

  loading: {
    color: '#000000',
    height: '2px'
  },

  css: [
    '@/assets/css/main.scss',
  ],

  plugins: [
    { src: './plugins/api.js' },
    { src: './plugins/observe-visibility.js' }
  ],

  buildModules: [
    //'@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n',
    'nuxt-basic-auth-module',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    ['nuxt-vue-material', {
      theme: null,
      components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton', 'MdToolbar', 'MdIcon', 'MdApp']
    }]
  ],

  basic: {
    name: 'cosopho',
    pass: 'cosopho!',
    enabled: true
  },

  auth: {
    redirect: {
      login: '/auth/login-redirect',
      callback: '/auth/signed-in'
    },
    strategies: {
      local: false,
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID
      }
    }
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'fr', iso: 'fr', file: 'fr.json' }
    ],
    lazy: true,
    langDir: './locales/',
    strategy: 'prefix',
    defaultLocale: 'en',
    rootRedirect: 'en/',
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  axios: {
    proxy: true,
    proxyHeaders: true
  },

  proxy: {
    '/api': {
      target: process.env.API_ENDPOINT,
      pathRewrite: {
        '^/api' : '/'
        }
      }
  },

  build: {
    extend (config, ctx) {
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  }
}
