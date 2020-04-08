<template>
  <div class="container">
    <h1>{{ $t('Initiatives Page-Title') }}</h1>
    <p>{{ $t('Initiatives Page-Subtitle') }}</p>
    <hr>
    <div class="md-layout md-gutter">
      <div v-for="initiative in initiatives" :key="initiative.slug" class="md-layout-item md-size-100">
        <initiativeComp :initiative="initiative" />
      </div>
    </div>
  </div>
</template>

<script>
import initiativeComp from '~/components/initiativeComp.vue'

export default {
  components: {
    initiativeComp
  },
  data () {
    return {
      initiatives: null
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getInitiatives({
      instance: context.app.store.state.instance.id,
      isActive: true,
      photos_approved: true,
      photos_archived: false
    })
    const initiatives = response.data.data.initiatives

    return { initiatives }
  },
  head () {
    return {
      title: `Initiatives - Collecting Social Photo`
    }
  }
}
</script>
