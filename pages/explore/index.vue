<template>
  <div class="container">
    <h1>Explore</h1>
    <div v-if="photos.length">
      <div v-for="photo in photos" :key="photo.id" class="photo-list">
        <nuxt-link :to="localePath({ name: 'explore-photo-id', params: { id: photo.id }})">
          <photoComp :publicId="photo.data && photo.data.public_id" />
        </nuxt-link>
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
      perPage: 2,
      page: 0,
      maxPage: 1,
      spinnerClass: 'spinner-hide'
    }
  },
  async asyncData (context) {
    let maxPage = 1
    const response = await context.app.$api.getPhotos({
      instance: context.app.store.state.instance.id,
      per_page: 2
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
        per_page: vm.perPage,
        page: vm.page
      })
      vm.spinnerClass = 'spinner-hide'
      vm.photos = vm.photos.concat(response.data.data.photos)
    }
  }
}
</script>
