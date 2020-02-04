<template>
  <div class="container">
    <h1>Contribute</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  computed: mapGetters(['loggedUser'])
}
</script>