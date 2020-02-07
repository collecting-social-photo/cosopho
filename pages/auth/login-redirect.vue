<template>
  <div>Please wait...</div>
</template>

<script>
export default {
  nuxtI18n: false,
  async asyncData (context) {
    return context.redirect(context.app.localePath('auth-login'))
  }
}
</script>