<template>
  <div class="container">
    <h1>Join a site</h1>
    <div v-for="instance in instances" :key="instance.id">
      <a :href="`https://${instance.id}.collectingsocialphoto.com`">{{ instance.title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  nuxtI18n: false,
  layout: 'plain',
  data () {
    return {
      instances: null
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getInstances()
    const instances = response.data.data.instances

    return { instances }
  }
}
</script>
