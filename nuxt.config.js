
require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

  env: {
    apiKey: process.env.API_KEY,
    apiEndpoint: process.env.API_ENDPOINT,
    signature: process.env.SIGNATURE,
    cloudinaryApi: process.env.CLOUDINARY_API,
    fathom: process.env.FATHOM,
    defaultInstanceID: process.env.DEFAULT_INSTANCE_ID
  },

  head: {
    title: 'Collecting Social Photo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Collecting and disseminating the ephemeral everyday pictures in heritage institutions.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', integrity: 'sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN', crossorigin: 'anonymous' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.4.0.min.js', integrity: 'sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=', crossorigin: 'anonymous' },
      { src: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver,IntersectionObserverEntry', crossorigin: 'anonymous' },
      { src: 'https://code.jquery.com/jquery-3.4.1.min.js', integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=', crossorigin: 'anonymous' },
      { src: 'https://unpkg.com/packery@2/dist/packery.pkgd.min.js', crossorigin: 'anonymous' },
      { src: 'https://cdn.usefathom.com/script.js', site: process.env.FATHOM}
    ]
  },

  loading: {
    color: '#000000',
    height: '2px'
  },

  css: [
    '@/assets/css/main.scss'
  ],

  plugins: [
    { src: './plugins/start.js', mode: 'server' },
    { src: './plugins/i18n.js' },
    { src: './plugins/api.js' },
    { src: './plugins/utils.js' },
    { src: './plugins/observe-visibility.js' }
  ],

  buildModules: [
    // '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/axios',
    ['nuxt-i18n', { vueI18nLoader: true }],
    'nuxt-basic-auth-module',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    '@nuxtjs/toast',
    '@nuxtjs/sentry',
    'cookie-universal-nuxt',
    ['nuxt-vue-material', {
      theme: 'default',
      components: [
        'MdDrawer',
        'MdRadio',
        'MdMenu',
        'MdContent',
        'MdList',
        'MdButton',
        'MdToolbar',
        'MdIcon',
        'MdApp',
        'MdField',
        'MdCard',
        'MdCheckbox',
        'MdChips',
        'MdTabs',
        'MdDatepicker',
        'MdDialog',
        'MdDialogConfirm'
      ]
    }]
  ],

  sentry: {
    dsn: 'https://beaa110ca9df445fb053347c3f3296eb@o388397.ingest.sentry.io/5225169'
  },

  basic: {
    name: 'cosopho',
    pass: 'cosopho!',
    enabled: false
  },

  auth: {
    redirect: {
      login: '/auth/login-redirect',
      callback: '/auth/signed-in',
      logout: '/auth/logout'
    },
    strategies: {
      local: false,
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID
      }
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      }
    }
  },

  toast: {
    position: 'top-center',
    theme: 'toasted-primary',
    duration: 5000
  },

  i18n: {
    locales: ['en', 'sv', 'fi', 'bi', 'da'],
    lazy: true,
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true
    }
  },

  serverMiddleware: [
    '~/api/index.js',
    '~/api/cloudinary.js'
  ],

  router: {
    middleware: ['user']
  },

  build: {
    collapseBooleanAttributes: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true,
    useShortDoctype: true,
    extractCSS: true,
    extend (config, ctx) {
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  }
}
