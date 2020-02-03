
require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    'nuxt-i18n'
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
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
