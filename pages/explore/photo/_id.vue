<template>
  <div v-if="photo" class="container">
    <p v-if="photo.person">
      {{ photo.person.name || photo.person.username }}
    </p>
    <photoComp :publicId="photo.data && photo.data.public_id" />
    <h3 v-if="photo.title">
      {{ photo.title }}
    </h3>
    <p v-if="photo.location">
      <i class="tiny material-icons">location_on</i> {{ photo.location }}
    </p>
    <p v-if="photo.date">
      <i class="tiny material-icons">date_range</i> {{ $moment(photo.date).format('MMMM Do, YYYY') }}
    </p>
    <p v-if="photo.license">
      <i class="tiny material-icons">copyright</i> {{ photo.license }}
    </p>

    <p v-if="photo.story">
      {{ photo.story }}
    </p>
    <p v-if="photo.tags && photo.tags.length">
      <md-chip v-for="tag in photo.tags" :key="tag">
        {{ tag }}
      </md-chip>
    </p>
    <p v-if="photo.make">
      Make: {{ photo.make }}
    </p>
    <p v-if="photo.model">
      Model: {{ photo.model }}
    </p>
    <p v-if="photo.aperture">
      Aperture: {{ photo.aperture }}
    </p>
    <p v-if="photo.shutterSpeed">
      Shutter speed: {{ photo.shutterSpeed }}
    </p>
    <p v-if="photo.ISO">
      ISO: {{ photo.ISO }}
    </p>
    <p v-if="photo.focalLength">
      Focal length: {{ photo.focalLength }}
    </p>
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
      photo: null
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPhoto({
      instance: context.app.store.state.instance.id,
      id: context.params.id
    })
    const photo = response.data.data.photo

    return { photo }
  },
  head () {
    const vm = this
    return {
      title: `${vm.photo && vm.photo.title} - Collecting Social Photo`
    }
  }
}
</script>
