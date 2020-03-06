<template>
  <div class="container">
    <div class="home-container">
      <md-card v-for="instance in instances" :key="instance.id" :style="`background-color: #${instance.colour};`">
        <a :href="`https://${instance.id}.collectingsocialphoto.com`">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">
                {{ instance.title }}
              </div>
            </md-card-header-text>

            <md-card-media md-big>
              <img :src="`data:image/png;base64,${instance.logo}`" class="home-logo">
            </md-card-media>
          </md-card-header>
        </a>
      </md-card>
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
  mounted () {
    this.getInstances()
  },
  methods: {
    async getInstances () {
      const response = await this.$api.getInstances({
        per_page: 100
      })
      this.instances = response.data.data.instances
    }
  }
}
</script>
