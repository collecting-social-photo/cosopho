<template>
  <div class="container">
    <h1>Profile</h1>
    <p>{{ $auth.user }}</p>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>