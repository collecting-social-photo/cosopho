<template>
  <div class="container">
    <img :src="`https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg`" />
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
  }
}
</script>