<template>
  <div class="container">
    <div>
      <div><img :src="`data:image/png;base64,${$store.state.instance.logo}`" class="logo" width="100"></div>
      <div>
        <md-button :to="localePath('explore')" class="md-primary md-raised">
          Explore
        </md-button>
        <md-button :to="localePath('contribute')" class="md-primary  md-raised">
          Contribute
        </md-button>
      </div>
      <photoComp v-if="photo" :publicId="photo.data && photo.data.public_id" />
    </div>
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
