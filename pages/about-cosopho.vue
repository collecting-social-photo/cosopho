<template>
  <div class="page-container">
    <div class="inner">
      <div class="container">
        <p>
          <i class="fa fa-home" /> <nuxt-link :to="localePath('home')">
            Home
          </nuxt-link>
        </p>
        <hr>

        <h1>{{ $t('Main Cosopho Page-About Page Title') }}</h1>

        <div v-html="$t('Main Cosopho Page-About Text')" />

        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home'
}
</script>

<style lang="scss">
.page-container {
  background-color: #556271;
  color: #fff;
  h1, h2 {
    color: #fff !important;
  }
  a, a:hover {
    color: #fff !important;
    text-decoration: underline;
  }
}
</style>
