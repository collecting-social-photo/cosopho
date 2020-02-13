<template>
  <div class="container">
    Upload to {{ selectedInitiative }} here...
    <div>
      <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone>
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
      options: {
        url: "http://httpbin.org/anything"
      }
    }
  },
  async asyncData (context) {
    if (!context.params.id) {
      return context.redirect(context.app.localePath({ name: 'contribute' }))
    }
    return { selectedInitiative: context.params.id }
  },
  mounted() {
    // Everything is mounted and you can access the dropzone instance
    const instance = this.$refs.el.dropzone
  }
}
</script>