<template>
  <div class="container">
    Upload to {{ selectedInitiative }} here...
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      selectedInitiative: null
    }
  },
  async asyncData (context) {
    if (!context.params.id) {
      return context.redirect(context.app.localePath({ name: 'contribute' }))
    }
    return { selectedInitiative: context.params.id }
  }
}
</script>