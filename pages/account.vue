<template>
  <div class="container">
    <h1>Account</h1>
    <p>{{ $store.state.user.slug }}</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>