<template>
  <div v-if="initiative" class="container">
    <h1>{{ initiative.title }}</h1>

    <p>{{ initiative.description }}</p>

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
      initiative: null,
      photos: [],
      perPage: 12,
      page: 0,
      maxPage: 1,
      spinnerClass: 'spinner-hide'
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getInitiative({
      instance: context.app.store.state.instance.id,
      photos_approved: true,
      slug: context.params.id
    })
    const initiative = response.data.data.initiative

    return { initiative }
  },
  mounted () {
    this.fetchPhotos()
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
        initiatives: vm.initiative.slug,
        archived: false,
        approved: true,
        per_page: vm.perPage,
        page: vm.page
      })
      vm.spinnerClass = 'spinner-hide'
      vm.photos = vm.photos.concat(response.data.data.photos)
      if (vm.photos.length) {
        vm.maxPage = vm.photos[0]._sys.pagination.maxPage
      }
    }
  },
  head () {
    const vm = this
    return {
      title: `${vm.initiative && vm.initiative.title} - Collecting Social Photo`
    }
  }
}
</script>
