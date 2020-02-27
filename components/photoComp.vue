<template>
  <img :src="`https://res.cloudinary.com/hftpxlihv/image/upload/${options}/v1576673295/${publicId}.jpg`">
</template>

<script>
export default {
  props: {
    publicId: {
      type: String,
      default: null
    },
    options: {
      type: String,
      default: 'w_1000'
    }
  }
}
</script>
