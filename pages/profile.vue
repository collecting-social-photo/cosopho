<template>
  <div class="container">
    <h1>Profile</h1>
    <p>{{ $store.state.user.slug }}</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>