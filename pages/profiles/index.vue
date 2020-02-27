<template>
  <div class="container">
    <h1>Profile</h1>
    <p>{{ $store.state.user.slug }}</p>
  </div>
</template>

<script>
export default {
  asyncData (context) {
    if (context.store.state.user) {
      return context.redirect(context.app.localePath({ name: 'profiles-id', params: { id: context.store.state.user.slug } }))
    } else {
      return context.redirect(context.app.localePath('index'))
    }
  }
}
</script>
