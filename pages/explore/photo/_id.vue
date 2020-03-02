<template>
  <div v-if="photo" class="container">
    <p v-if="photo.person">
      <img :src="photo.person.avatar" class="avatar">
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
            <i class="tiny material-icons">date_range</i> {{ $moment(photo.date).format('MMMM Do, YYYY') }}
          </div>
          <div v-if="photo.license" class="photo-detail-item">
            <i class="tiny material-icons">copyright</i> {{ photo.license }}
          </div>
          <div v-if="photo.make" class="photo-detail-item">
            <b>Make</b>: {{ photo.make }}
          </div>
          <div v-if="photo.model" class="photo-detail-item">
            <b>Model</b>: {{ photo.model }}
          </div>
          <div v-if="photo.aperture" class="photo-detail-item">
            <b>Aperture</b>: {{ photo.aperture }}
          </div>
          <div v-if="photo.shutterSpeed" class="photo-detail-item">
            <b>Shutter speed</b>: {{ photo.shutterSpeed }}
          </div>
          <div v-if="photo.ISO" class="photo-detail-item">
            <b>ISO</b>: {{ photo.ISO }}
          </div>
          <div v-if="photo.focalLength" class="photo-detail-item">
            <b>Focal length</b>: {{ photo.focalLength }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="relatedPhotos && relatedPhotos.length">
      <h3>Related Photos</h3>
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
      relatedPhotos: null
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPhoto({
      instance: context.app.store.state.instance.id,
      id: context.params.id
    })
    const photo = response.data.data.photo
    const thisUser = context.app.store.state.user

    if (photo.archived && photo.person.slug !== (thisUser && thisUser.slug)) {
      return context.redirect(context.app.localePath('index'))
    }

    return { photo }
  },
  mounted () {
    this.getRelatedPhotos()
  },
  methods: {
    async getRelatedPhotos () {
      const vm = this
      const response = await vm.$api.getPhotos({
        instance: vm.$store.state.instance.id,
        archived: false,
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
      title: `${vm.photo && vm.photo.title} - Collecting Social Photo`
    }
  }
}
</script>
