<template>
  <img :src="`https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${publicId}.jpg`">
</template>

<script>
export default {
  props: {
    publicId: {
      type: String,
      default: null
    }
  }
}
</script>
