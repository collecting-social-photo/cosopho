<template>
  <div class="container">
    <div v-if="person">
      <div class="md-layout profile-top-container">
        <div class="md-layout-item">
          <img :src="person.avatar" class="big-avatar">
        </div>
        <div class="md-layout-item">
          <div>{{ person.slug }}</div>
        </div>
      </div>

      <md-tabs v-if="$auth.loggedIn && $store.state.user && $store.state.user.slug === person.slug" class="profile-tabs" md-alignment="centered">
        <template slot="md-tab" slot-scope="{ tab }">
          <div>
            <md-icon>{{ tab.data.icon }}</md-icon> <span>{{ tab.label }}</span>
          </div>
        </template>

        <md-tab id="tab-public" :md-template-data="{ icon: 'public' }" @click="tabClicked('public')" md-label="Public" />
        <md-tab id="tab-archived" :md-template-data="{ icon: 'visibility_off' }" @click="tabClicked('archived')" md-label="Archived" />
      </md-tabs>

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
      activeTab: 'public',
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

      let archived = false

      if (vm.activeTab === 'archived') {
        archived = true
      }

      vm.spinnerClass = 'spinner-show'
      const response = await vm.$api.getPhotos({
        instance: vm.$store.state.instance.id,
        peopleSlugs: vm.person.slug,
        per_page: vm.perPage,
        archived,
        page: vm.page
      })
      vm.spinnerClass = 'spinner-hide'
      vm.photos = vm.photos.concat(response.data.data.photos)
    },
    tabClicked (tab) {
      const vm = this
      vm.photos = []
      vm.page = 0
      vm.maxPage = 1
      vm.activeTab = tab
      vm.fetchPhotos()
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

<style lang="scss">
.profile-tabs {
  margin-bottom: 20px;
}
</style>
