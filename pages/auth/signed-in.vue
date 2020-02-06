<template>
  <p>Signing in...</p>
</template>

<script>
export default {
  nuxtI18n: false,
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>