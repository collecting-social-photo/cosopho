<template>
  <div v-if="photo" class="container">
    <p v-if="photo.person">{{ photo.person.name || photo.person.username }}</p>
    <img :src="`https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg`" />
    <h3 v-if="photo.title">{{ photo.title }}</h3>
    <p v-if="photo.location"><i class="tiny material-icons">location_on</i> {{ photo.location }}</p>
    <p v-if="photo.date"><i class="tiny material-icons">date_range</i> {{ $moment(photo.date).format('MMMM Do, YYYY') }}</p>
    <p v-if="photo.license"><i class="tiny material-icons">copyright</i> {{ photo.license }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      photo: null
    }
  },
  async asyncData (context) {
    console.log(context.params.id)
    let response = await context.app.$api.getPhoto({
      instance: context.app.store.state.instance.id,
      id: context.params.id
    })
    const photo = response.data.data.photo

    return { photo: photo }
  },
  head () {
    const vm = this
    return {
      title: `${vm.photo && vm.photo.title} - Collecting Social Photo`
    }
  }
}
</script>