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
      <div v-if="initiatives.length" class="home-initiatives">
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
  async asyncData (context) {
    if (!context.app.store.state.instance) {
      return context.redirect('/home')
    }

    const response = await context.app.$api.getInitiatives({
      instance: context.app.store.state.instance.id,
      isFeatured: true,
      isActive: true,
      photos_approved: true,
      photos_archived: false,
      per_page: 1
    })
    const initiatives = response.data.data.initiatives
    const initiative = initiatives && _.sample(initiatives)

    const photoResponse = await context.app.$api.getPhotos({
      instance: context.app.store.state.instance.id,
      homepage: true
    })

    const photos = photoResponse.data.data.photos

    const photo = photos.length && _.sample(photos)

    return { photo, initiatives }
  }
}
</script>
