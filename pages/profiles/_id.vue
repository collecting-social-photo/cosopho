<template>
  <div class="container">
    <div v-if="person">
      <div class="md-layout profile-top-container profile-about">
        <div class="md-layout-item md-size-10 md-small-size-20">
          <img :src="person.avatar" class="big-avatar" onerror="this.src = '/avatar.svg';">
        </div>
        <div class="md-layout-item md-size-80 md-small-size-80">
          <div><span class="profile-name">{{ person.name || person.slug }}</span></div>
          <div v-if="person.bio">
            {{ person.bio }}
          </div>

          <div class="socials">
            <div v-if="person.personalSite">
              <a :href="person.personalSite" target="_blank" title="Personal Website"><i class="fa fa-globe" /></a>
            </div>
            <div v-if="person.twitter">
              <a :href="`https://twitter.com/${ person.twitter.replace('@', '') }`" target="_blank" title="Twitter"><i class="fa fa-twitter" /></a>
            </div>
            <div v-if="person.instagram">
              <a :href="`https://instagram.com/${ person.instagram.replace('@', '') }`" target="_blank" title="Instagram"><i class="fa fa-instagram" /></a>
            </div>
            <div v-if="person.facebook">
              <a :href="person.facebook" target="_blank" title="Facebook"><i class="fa fa-facebook" /></a>
            </div>
          </div>
        </div>
        <div v-if="isThisUser" class="md-layout-item md-size-10 md-small-size-80 right _hide_mobile">
          <md-button :to="localePath('account')" :title="$t('Account Page-My Account')" class="md-icon-button md-raised">
            <md-icon>settings</md-icon>
          </md-button>
        </div>
      </div>

      <md-tabs v-if="isThisUser" class="profile-tabs" md-alignment="centered">
        <template slot="md-tab" slot-scope="{ tab }">
          <div>
            <md-icon>{{ tab.data.icon }}</md-icon> <span>{{ tab.label }}</span>
          </div>
        </template>

        <md-tab id="tab-public" :md-template-data="{ icon: 'public' }" @click="tabClicked('public')" md-label="Public" />
        <md-tab id="tab-archived" :md-template-data="{ icon: 'visibility_off' }" @click="tabClicked('archived')" :md-label="$t('Contribute Process 2-Archived')" />
      </md-tabs>

      <div v-bind:class="{ 'public-top': !isThisUser }" class="md-layout">
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
  computed: {
    isThisUser () {
      return this.$auth.loggedIn && this.$store.state.user && this.$store.state.user.slug === this.person.slug
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
        approved: true,
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
      title: `${vm.person && (vm.person.name || vm.person.username)} - Collecting Social Photo`
    }
  }
}
</script>

<style lang="scss">
.public-top {
  margin-top: 50px;
}
.profile-about {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;

  &.profile-top-container {
    margin-bottom: 0px;
  }
}
.profile-name {
  font-weight: bold;
}
.profile-place {
  font-size: 70%;
  color: rgb(92, 92, 92);
}
.profile-tabs {
  margin-bottom: 20px;
}

.socials {
  display: flex;
  margin-top: 20px;
  div {
    margin-right: 10px;
  }

  a, a:hover {
    color: rgb(110, 110, 110) !important;
  }
}
</style>
