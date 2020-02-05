<template>
  <div class="container">
    <h1 :style="`color:#${$store.state.instance.colour};`">Explore</h1>
    <div class="photo-list" v-for="photo in photos" :key="photo.id">
      <nuxt-link :to="localePath({ name: 'explore-photo-id', params: { id: photo.id }})">
        <img :src="`https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg`" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      photos: null
    }
  },
  async asyncData (context) {
    let response = await context.app.$api.getPhotos({
      instance: context.app.store.state.instance.id,
      per_page: 2
    })
    const photos = response.data.data.photos

    return { photos: photos }
  }
}
</script>