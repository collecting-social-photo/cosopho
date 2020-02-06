<template>
  <div class="container center">
    <h1>Signing in...</h1>
  </div>
</template>

<script>
export default {
  nuxtI18n: false,
  layout: 'plain',
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>