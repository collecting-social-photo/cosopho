
require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

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
      { src: 'https://code.jquery.com/jquery-3.4.0.min.js', integrity: 'sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=', crossorigin: 'anonymous' }
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
  ],

  buildModules: [
    //'@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n',
    ['nuxt-vue-material', {
      theme: null,
      components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton', 'MdToolbar', 'MdIcon', 'MdApp']
    }]
  ],

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
