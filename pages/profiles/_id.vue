<template>
  <div class="container">
    <div v-if="person">
      <div class="md-layout profile-top-container">
        <div class="md-layout-item">
          <img :src="person.avatar" class="big-avatar">
        </div>
        <div class="md-layout-item">
          {{ person.slug }}
        </div>
      </div>

      <div class="md-layout">
        <div v-if="photos.length" class="md-layout-item">
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
    </div>
  </div>
</template>

<script>
import photoComp from '~/components/photoComp.vue'

export default {
  name: 'Profile',
  components: {
    photoComp
  },
  data () {
    return {
      person: null,
      photos: [],
      perPage: 9,
      page: 0,
      maxPage: 1,
      spinnerClass: 'spinner-hide'
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPerson({
      slug: context.params.id,
      instance: context.store.state.instance.id
    })
    const person = response.data.data.person

    if (!person) {
      return context.redirect(context.app.localePath('index'))
    }

    return {
      person
    }
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
        peopleSlugs: vm.person.slug,
        per_page: vm.perPage,
        page: vm.page
      })
      vm.spinnerClass = 'spinner-hide'
      vm.photos = vm.photos.concat(response.data.data.photos)
    }
  },
  head () {
    const vm = this
    return {
      title: `${vm.person && vm.person.username} - Collecting Social Photo`
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  /* Grid Fallback */
  display: flex;
  flex-wrap: wrap;

  /* Supports Grid */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 1em;
}

.grid-item {
  background: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  img {
    object-fit: cover;
    min-width: 100%;
    min-height: 100%
  }

  /* Flex Fallback */
  flex: 1 1 200px;
}

@supports (display: grid) {
  .module {
    margin: 0;
  }
}

</style>
