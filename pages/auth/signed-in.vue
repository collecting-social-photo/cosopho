<template>
  <div class="container center spinner-container">
    <div class="spinner objects-spinner">
      <div class="dot-flashing" />
    </div>
  </div>
</template>

<script>
export default {
  nuxtI18n: false,
  layout: 'plain',
  mounted () {
    if (this.$auth.loggedIn) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>