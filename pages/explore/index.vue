<template>
  <div class="container">
    <h1>{{ $t('Explore Page-Title') }}</h1>
    <div v-if="photos.length">
      <div class="grid">
        <div v-for="photo in photos" :key="photo.id" class="grid-item">
          <nuxt-link :to="localePath({ name: 'explore-photo-id', params: { id: photo.id }})">
            <photoComp :publicId="photo.data && photo.data.public_id" :options="'w_300,h_300,c_fill'" />
          </nuxt-link>
        </div>
      </div>

      <div v-bind:class="spinnerClass" class="spinner objects-spinner">
        <div class="dot-flashing" />
      </div>

      <div
        v-if="page < maxPage"
        v-observe-visibility="{
          callback: visibilityChanged,
          once: false,
        }"
      />
    </div>
    <div v-else>
      No photos found 😥
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
      photos: null,
      perPage: 9,
      page: 0,
      maxPage: 1,
      spinnerClass: 'spinner-hide'
    }
  },
  async asyncData (context) {
    let maxPage = 1
    const response = await context.app.$api.getPhotos({
      instance: context.app.store.state.instance.id,
      archived: false,
      approved: true,
      per_page: 9
    })
    const photos = response.data.data.photos
    if (photos.length) {
      maxPage = photos[0]._sys.pagination.maxPage
    }

    return { photos, maxPage }
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      const vm = this
      if (isVisible && vm.page < vm.maxPage) {
        vm.loadMore()
      }
    },
    loadMore () {
      const vm = this
      vm.page = vm.page + 1
      vm.fetchPhotos()
    },
    async fetchPhotos () {
      const vm = this

      vm.spinnerClass = 'spinner-show'
      const response = await vm.$api.getPhotos({
        instance: vm.$store.state.instance.id,
        archived: false,
        approved: true,
        excludeInactive: true,
        per_page: vm.perPage,
        page: vm.page
      })
      vm.spinnerClass = 'spinner-hide'
      vm.photos = vm.photos.concat(response.data.data.photos)
    }
  },
  head () {
    return {
      title: 'Explore - Collecting Social Photo'
    }
  }
}
</script>
