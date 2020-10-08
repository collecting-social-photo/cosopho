<template>
  <div>Please wait...</div>
</template>

<script>
export default {
  nuxtI18n: false,
  asyncData (context) {
    return context.redirect(context.app.localePath('index'))
  }
}
</script>
