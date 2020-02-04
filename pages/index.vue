<template>
  <div class="container">
    <h1>{{ $t('home.title') }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters([
    'isAuthenticated',
    'loggedUser'
  ])
}
</script>
