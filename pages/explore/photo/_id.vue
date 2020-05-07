<template>
  <div v-if="photo" class="container">
    <p v-if="photo.person">
      <img :src="photo.person.avatar" class="avatar" onerror="this.src = '/avatar.svg';">
      <nuxt-link :to="localePath({ name: 'profiles-id', params: { id: photo.person.slug } })" class="photo-person">
        {{ photo.person.name || photo.person.username }}
      </nuxt-link>
    </p>
    <photoComp :publicId="photo.data && photo.data.public_id" />

    <div class="photo-details">
      <div class="md-layout">
        <div class="md-layout-item md-size-50 md-small-size-100">
          <div v-if="photo.title" class="photo-title">
            {{ photo.title }}
          </div>
          <div v-if="photo.story" class="photo-story">
            {{ photo.story }}
          </div>
          <div v-if="photo.tags && photo.tags.length">
            <md-chip v-for="tag in photo.tags" :key="tag">
              {{ tag }}
            </md-chip>
          </div>
        </div>

        <div class="md-layout-item md-size-50 md-small-size-100">
          <div v-if="photo.location" class="photo-detail-item">
            <i class="tiny material-icons">location_on</i> {{ photo.location }}
          </div>
          <div v-if="photo.date" class="photo-detail-item">
            <i class="tiny material-icons">date_range</i> {{ $moment.utc(photo.date).format('MMMM Do, YYYY') }}
          </div>
          <div v-if="photo.license" class="photo-detail-item">
            <i class="tiny material-icons">copyright</i> {{ photo.license }}
          </div>
          <div v-if="photo.make" class="photo-detail-item">
            <b>{{ $t('Contribute Process-Make') }}</b>: {{ photo.make }}
          </div>
          <div v-if="photo.model" class="photo-detail-item">
            <b>{{ $t('Contribute Process-Model') }}</b>: {{ photo.model }}
          </div>
          <div v-if="photo.aperture" class="photo-detail-item">
            <b>{{ $t('Contribute Process-Aperture') }}</b>: {{ photo.aperture }}
          </div>
          <div v-if="photo.shutterSpeed" class="photo-detail-item">
            <b>{{ $t('Contribute Process-Shutter Speed') }}</b>: {{ photo.shutterSpeed }}
          </div>
          <div v-if="photo.ISO" class="photo-detail-item">
            <b>{{ $t('Contribute Process-ISO') }}</b>: {{ photo.ISO }}
          </div>
          <div v-if="photo.focalLength" class="photo-detail-item">
            <b>{{ $t('Contribute Process-Focal Length') }}</b>: {{ photo.focalLength }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="$auth.loggedIn && isOwner && !photoExpired">
      <md-dialog-confirm
        :md-active.sync="dialogActive"
        @md-confirm="onDeleteConfirm"
        md-title="Delete Photo"
        md-content="Are you sure you want to delete this photo?"
        md-confirm-text="Yes"
        md-cancel-text="No"
      />
      <div class="delete-button-container">
        <div>
          <md-button @click="dialogActive = true" class="md-accent md-raised button-no-margin">
            <md-icon>delete</md-icon> Delete Photo
          </md-button>
        </div>
        <div class="delete-message">
          {{ $t('Individual Photo View-Delete Photo Note') }}
        </div>
      </div>
    </div>

    <div v-if="relatedPhotos && relatedPhotos.length">
      <h3>{{ $t('Individual Photo View-Related Photos') }}</h3>
      <div class="related-photos">
        <div v-for="relatedPhoto in relatedPhotos" :key="relatedPhoto.id">
          <nuxt-link :to="localePath({ name: 'explore-photo-id', params: { id: relatedPhoto.id }})">
            <photoComp :publicId="relatedPhoto.data && relatedPhoto.data.public_id" :options="'w_300,h_300,c_fill'" />
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
      relatedPhotos: null,
      dialogActive: false,
      isOwner: false
    }
  },
  computed: {
    photoExpired () {
      return this.$moment.utc(this.photo.date).add(1, 'days').isBefore(this.$moment.utc(), 'day')
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPhoto({
      instance: context.app.store.state.instance.id,
      id: context.params.id
    })

    if (!response) {
      context.error({ statusCode: 500, message: 'API failed' })
      return
    }

    const photo = response.data.data.photo
    const thisUser = context.app.store.state.user

    if (photo.archived && photo.person.slug !== (thisUser && thisUser.slug)) {
      return context.redirect(context.app.localePath('index'))
    }

    return { photo }
  },
  mounted () {
    this.getRelatedPhotos()
    this.isOwner = (this.$store.state.user && this.$store.state.user.slug) === (this.photo.person && this.photo.person.slug)
  },
  methods: {
    onDeleteConfirm () {
      this.deletePhoto()
    },
    async deletePhoto () {
      const vm = this
      if (vm.isOwner) {
        const response = await vm.$api.deletePhoto({
          id: vm.photo.id,
          instance: vm.$store.state.instance.id
        })

        if (response.data.data.deletePhoto.success) {
          vm.$api.deleteCloudPhoto(vm.photo.data && vm.photo.data.public_id)
        }

        this.$toast.success('Photo deleted')

        vm.$router.push({ path: vm.localePath({ name: 'index' }), force: true })
      }
    },
    async getRelatedPhotos () {
      const vm = this
      const response = await vm.$api.getPhotos({
        instance: vm.$store.state.instance.id,
        archived: false,
        approved: true,
        initiatives: vm.photo.initiative,
        per_page: 20
      })

      const photos = response.data.data.photos
      _.remove(photos, { id: vm.photo.id })
      vm.relatedPhotos = _.shuffle(photos).splice(0, 4)

    }
  },
  head () {
    const vm = this
    return {
      title: `${vm.photo && vm.photo.title} - Collecting Social Photo`,
      meta: [
        { hid: 'title', title: `${vm.photo && vm.photo.title}` },
        { hid: 'description', description: `${vm.photo && vm.photo.story}` }
      ]
    }
  }
}
</script>
