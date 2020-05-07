<template>
  <div>
    <div :style="photo && `background-image: url(https://res.cloudinary.com/hftpxlihv/image/upload/w_1000,b_black,o_70/v1576673295/${photo.data.public_id}.jpg);`" class="intro">
      <div class="inner">
        <div class="container">
          <div class="intro-logo">
            <img :src="`data:image/png;base64,${$store.state.instance.logo}`">
          </div>
          <div class="intro-text">
            {{ $t('Homepage-Title') }}
          </div>
          <div v-html="$t('Homepage-Subtitle')" class="intro-about" />
          <div class="intro-buttons">
            <md-button :to="localePath('contribute')" class="md-secondary button-big">
              {{ $t('Menu-Contribute') }}
            </md-button>
            <md-button :to="localePath('explore')" class="md-secondary button-big">
              {{ $t('Menu-Explore') }}
            </md-button>
          </div>
        </div>
      </div>
      <div v-if="photo && photo.person" class="home-credit">
        Photo by: <nuxt-link :to="localePath({ name: 'explore-photo-id', params: { id: photo.id }})">
          {{ photo.person.name || photo.person.username }}
        </nuxt-link>
      </div>
    </div>
    <div v-if="photo" class="container">
      <div class="md-layout">
        <div class="md-layout-item md-size-50 md-small-size-100">
          <h1>{{ $t('Homepage-Featured') }}</h1>
        </div>
        <div class="md-layout-item md-size-50 md-small-size-100">
          <p>{{ $t('Homepage-Featured subtitle') }}</p>
        </div>
      </div>
      <div v-if="initiatives && initiatives.length" class="home-initiatives">
        <div v-for="initiative in initiatives" :key="initiative.slug">
          <initiativeComp :initiative="initiative" />
        </div>
      </div>
      <p>
        <nuxt-link :to="localePath('initiatives')">
          {{ $t('Homepage-Browse more') }}
        </nuxt-link>
      </p>
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
      photo: null,
      initiatives: null
    }
  },
  mounted () {
    this.getInitiatives()
    this.getPhoto()
  },
  methods: {
    async getInitiatives () {
      const response = await this.$api.getInitiatives({
        instance: this.$store.state.instance.id,
        isFeatured: true,
        isActive: true,
        photos_approved: true,
        photos_archived: false,
        per_page: 1
      })

      if (!response) {
        console.log('Could not get initiatives')
        return
      }

      this.initiatives = response.data.data.initiatives
    },
    async getPhoto () {
      const photoResponse = await this.$api.getPhotos({
        instance: this.$store.state.instance.id,
        homepage: true
      })

      if (!photoResponse) {
        console.log('Could not get photos')
        return
      }

      const photos = photoResponse.data.data.photos
      this.photo = photos.length && _.sample(photos)
    }
  }
}
</script>
