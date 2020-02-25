<template>
  <div class="container">
    <h1>Initiatives</h1>
    <div v-for="initiative in initiatives" :key="initiative.slug">
      <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
        {{ initiative.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      initiatives: null
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getInitiatives({
      instance: context.app.store.state.instance.id
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
