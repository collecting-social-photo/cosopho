<template>
  <div class="container">
    <h1 :style="`color:#${$store.state.instance.colour};`">Explore</h1>
    <div v-if="photos.length">
      <div class="photo-list" v-for="photo in photos" :key="photo.id">
        <nuxt-link :to="localePath({ name: 'explore-photo-id', params: { id: photo.id }})">
          <img :src="`https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg`" />
        </nuxt-link>
      </div>

      <div class="spinner objects-spinner" v-bind:class="spinnerClass">
        <div class="dot-flashing"></div>
      </div>

      <div v-if="page < maxPage" v-observe-visibility="{
        callback: visibilityChanged,
        once: false,
      }"></div>
    </div>
    <div v-else>
      No photos found 😥
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      photos: null,
      perPage: 2,
      page: 1,
      maxPage: 1,
      spinnerClass: 'spinner-hide'
    }
  },
  async asyncData (context) {
    var maxPage = 1
    let response = await context.app.$api.getPhotos({
      instance: context.app.store.state.instance.id,
      per_page: 2
    })
    const photos = response.data.data.photos
    if (photos.length) {
      maxPage = photos[0]._sys.pagination.maxPage
    }

    return { photos: photos, maxPage: maxPage }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      var vm = this
      if (isVisible && vm.page < vm.maxPage) {
        vm.loadMore()
      }
    },
    loadMore() {
      var vm = this
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