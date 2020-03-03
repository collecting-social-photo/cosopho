<template>
  <div class="container">
    <h1>Login</h1>
    <div>
      <md-button @click="$auth.loginWith('auth0')" class="md-primary md-raised button-no-margin">
        Login
      </md-button>
    </div>
    <div>
      <nuxt-link :to="localePath('privacy_and_terms')">
        {{ $t('Contribute Process-Privacy Link') }}
      </nuxt-link>
    </div>
  </div>
</template>
