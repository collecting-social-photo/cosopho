<template>
  <div class="container">
    <div>
      <div><img class="logo" :src="`data:image/png;base64,${$store.state.instance.logo}`" width="100"/></div>
      <div>
        <md-button :to="localePath('explore')" class="md-primary" :style="`background-color:#${$store.state.instance.colour};color:#fff;`">Explore</md-button>
        <md-button :to="localePath('contribute')" class="md-primary" :style="`background-color:#${$store.state.instance.colour};color:#fff;`">Contribute</md-button>
      </div>
      <img v-if="photo" :src="`https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg`" />
    </div>
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
    let response = await context.app.$api.getInitiatives({
      instance: context.app.store.state.instance.id,
      isFeatured: true,
      per_page: 1
    })
    const initiatives = response.data.data.initiatives
    const initiative = initiatives && initiatives[0]
    const photo = initiative && initiative.photos.length && initiative.photos[0]

    return { photo: photo }
  }
}
</script>
