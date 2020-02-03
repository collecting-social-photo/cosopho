<template>
  <div>Contribute</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  computed: mapGetters(['loggedUser'])
}
</script>