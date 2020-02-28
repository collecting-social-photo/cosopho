<template>
  <div>
    <div :style="`background-image: url(https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg);`" class="intro">
      <div class="inner">
        <div class="container">
          <div class="intro-logo">
            <img :src="`data:image/png;base64,${$store.state.instance.logo}`">
          </div>
          <div class="intro-text">
            Collecting Social Photographs
          </div>
          <div class="intro-about">
            Donate your digital photos to the museum. <nuxt-link :to="localePath('about')">Read more</nuxt-link>.
          </div>
          <div class="intro-buttons">
            <md-button :to="localePath('contribute')" class="md-secondary button-big">
              Contribute
            </md-button>
            <md-button :to="localePath('explore')" class="md-secondary button-big">
              Explore
            </md-button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h1>Featured initiatives</h1>
      <p>Explore photos within current collecting initiatives.</p>

      <div v-for="initiative in initiatives" :key="initiative.slug">
        <h2>
          <nuxt-link :to="localePath({ name: 'initiatives-id', params: { id: initiative.slug }})">
            {{ initiative.title }}
          </nuxt-link>
        </h2>
        <div class="md-layout md-gutter md-alignment-center">
          <div v-for="photo in initiative.photos.slice(0,4)" :key="photo.data.public_id" class="md-layout-item">
            <nuxt-link :to="localePath({ name: 'explore-photo-id', params: { id: photo.id }})">
              <photoComp v-if="photo" :publicId="photo.data && photo.data.public_id" />
            </nuxt-link>
          </div>
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
  data () {
    return {
      photo: null,
      initiatives: null
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getInitiatives({
      instance: context.app.store.state.instance.id,
      isFeatured: true,
      per_page: 1
    })
    const initiatives = response.data.data.initiatives
    const initiative = initiatives && _.sample(initiatives)
    const photo = initiative && initiative.photos.length && _.sample(initiative.photos)

    return { photo, initiatives }
  }
}
</script>
