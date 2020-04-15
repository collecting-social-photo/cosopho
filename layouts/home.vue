<template>
  <div>
    <div v-if="$store.state.languagesLoaded">
      <nuxt />
    </div>
    <div v-else class="container center spinner-container">
      <div class="spinner objects-spinner">
        <div class="dot-flashing" />
      </div>
    </div>
  </div>
</template>
