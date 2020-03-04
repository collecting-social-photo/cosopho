<template>
  <div v-if="initiative && initiative.photos">
    <h2>
      <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
        {{ initiative.title }}
      </nuxt-link>
    </h2>
    <div v-if="initiative.photos.length > 1" class="photos-container">
      <div class="item a">
        <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
          <photoComp :publicId="initiative.photos[0].data && initiative.photos[0].data.public_id" :options="'w_600,h_600,c_fill'" />
        </nuxt-link>
      </div>
      <div class="container-double">
        <div class="item b">
          <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
            <photoComp :publicId="initiative.photos[1].data && initiative.photos[1].data.public_id" :options="'w_600,h_600,c_fill'" />
          </nuxt-link>
        </div>
        <div class="item c">
          <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
            <photoComp :publicId="initiative.photos[2].data && initiative.photos[2].data.public_id" :options="'w_600,h_600,c_fill'" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import photoComp from '~/components/photoComp.vue'

export default {
  components: {
    photoComp
  },
  props: {
    initiative: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.photos-container {
  display: grid;
  grid-template-columns: 400px 197px;//2fr 1fr;
  grid-gap: 6px;

  .container-double {
    display: grid;
    grid-gap: 6px;
  }
}
</style>
