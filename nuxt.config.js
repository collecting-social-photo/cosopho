
require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

  env: {
    apiKey: process.env.API_KEY,
    apiEndpoint: process.env.API_ENDPOINT,
    cloudinaryApi: process.env.CLOUDINARY_API

  },

  head: {
    title: 'Collecting Social Photo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
      { src: 'https://unpkg.com/packery@2/dist/packery.pkgd.min.js', crossorigin: 'anonymous' }
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
    { src: './plugins/api.js' },
    { src: './plugins/i18n.js' },
    { src: './plugins/observe-visibility.js' },
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
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      }
    }
  },

  i18n: {
    locales: ['en', 'sv', 'fi', 'bi', 'da'],
    lazy: true,
    strategy: 'prefix',
    defaultLocale: 'en',
    rootRedirect: 'en/',
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  // axios: {
  //   proxy: true,
  //   proxyHeaders: true
  // },

  // proxy: {
  //   '/api': {
  //     target: process.env.API_ENDPOINT,
  //     pathRewrite: {
  //       '^/api' : '/'
  //       }
  //     }
  // },

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
