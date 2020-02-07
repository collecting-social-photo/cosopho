<template>
  <div class="container center">
    <h1 v-if="error.statusCode === 404">Page not found 🤪</h1>
    <h1 class="h1" v-else>An error occurred 😞</h1>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>