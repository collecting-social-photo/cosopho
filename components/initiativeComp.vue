<template>
  <div v-if="photos && photos.length">
    <h2>
      <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
        {{ initiative.title }}
      </nuxt-link>
    </h2>
    <div v-if="photos.length > 1" class="photos-container">
      <div class="item a">
        <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
          <photoComp :publicId="photos[0].data && photos[0].data.public_id" :options="'w_600,h_600,c_fill'" />
        </nuxt-link>
      </div>
      <div class="container-double">
        <div class="item b">
          <nuxt-link v-if="photos.length > 1" :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
            <photoComp :publicId="photos[1].data && photos[1].data.public_id" :options="'w_600,h_600,c_fill'" />
          </nuxt-link>
        </div>
        <div class="item c">
          <nuxt-link v-if="photos.length > 2" :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
            <photoComp :publicId="photos[2].data && photos[2].data.public_id" :options="'w_600,h_600,c_fill'" />
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
  },
  data () {
    return {
      photos: null
    }
  },
  mounted () {
    this.photos = this.initiative.photos || []
    _.remove(this.photos, { archived: true })
  }
}
</script>

<style lang="scss" scoped>
.photos-container {
  display: flex;
  flex-direction: row;

  img {
    max-width: 500px;
    max-height: 500px;
    padding-right: 5px;
  }

  .container-double {
    display: flex;
    flex-direction: column;
    img {
      max-height: 250px;
      max-width: 250px;
      padding-bottom: 5px;
    }
  }
}
</style>
