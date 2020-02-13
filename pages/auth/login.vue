<template>
  <div class="container">
    <h1 :style="`color:#${$store.state.instance.colour};`">Login</h1>
    <div>
      <md-button :style="`background-color:#${$store.state.instance.colour};color:#fff;`" @click="$auth.loginWith('auth0')">Login</md-button>
    </div>
    <div>
      <nuxt-link :to="localePath('privacy_and_terms')">Privacy & Terms</nuxt-link>
    </div>
  </div>
</template>