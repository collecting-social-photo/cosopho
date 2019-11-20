<template>
  <div class="container">
    {{ $store.state.host }}
  </div>
</template>

<script>

export default {

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
