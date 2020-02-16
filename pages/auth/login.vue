<template>
  <div class="container">
    <h1>Login</h1>
    <div>
      <md-button class="md-primary md-raised" @click="$auth.loginWith('auth0')">Login</md-button>
    </div>
    <div>
      <nuxt-link :to="localePath('privacy_and_terms')">Privacy & Terms</nuxt-link>
    </div>
  </div>
</template>