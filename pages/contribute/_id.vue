<template>
  <div class="container">
    <div>
      <dropzone
        id="customdropzone"
        ref="el"
        :options="options"
        :destroyDropzone="true"
        :useCustomSlot="true"
        v-on:vdropzone-complete="uploadSuccess"
      >
        <div class="dropzone-custom-content">
          <h3 class="dropzone-custom-title"><md-icon>cloud_upload</md-icon> Drag and drop photos here to upload!</h3>
          <div class="subtitle">...or click to select photos from your computer</div>
        </div>
      </dropzone>
    </div>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  middleware: 'auth',
  components: {
    Dropzone
  },
  data () {
    return {
      selectedInitiative: null,
      src: null,
      options: {
        url: "http://httpbin.org/anything",
        maxFiles: 10,
        addRemoveLinks: true,
        acceptedFiles: '.png,.jpg,.gif'
      }
    }
  },
  async asyncData (context) {
    if (!context.params.id) {
      return context.redirect(context.app.localePath({ name: 'contribute' }))
    }
    return { selectedInitiative: context.params.id }
  },
  mounted () {
    const instance = this.$refs.el.dropzone
  },
  methods: {
    uploadSuccess (response) {
      this.src = response.dataURL
    }
  }
}
</script>

<style lang="scss">
#customdropzone {
  border: 2px dashed #ccc;
  border-radius: 10px;
}
</style>