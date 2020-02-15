<template>
  <div class="container">
    <div>
      <dropzone v-if="!uploadedFiles"
        id="customdropzone"
        ref="el"
        :options="options"
        :destroyDropzone="true"
        :useCustomSlot="true"
        v-on:vdropzone-files-added="uploadSuccess"
      >
        <div class="dropzone-custom-content">
          <h3 class="dropzone-custom-title"><md-icon>cloud_upload</md-icon> Drag and drop photos here to upload!</h3>
          <div class="subtitle">...or click to select photos from your computer</div>
        </div>
      </dropzone>
    </div>
    <div v-if="uploadedFiles">
      <md-card v-for="file in uploadedFiles" :key="file.id">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-30">
              <img :src="file.dataURL" width="200" />
            </div>
            <div class="md-layout-item md-size-70">
              <p>add user data here <pre>{{ file.filename }}</pre> {{ file.width }} x {{ file.height }} - {{ file.title }}</p>

              <md-field>
                <label for="title">Title</label>
                <md-input name="title" id="title" v-model="file.title" />
              </md-field>

              <md-field>
                <label for="something">Something</label>
                <md-input name="something" id="something" v-model="file.something" />
              </md-field>
            </div>
          </div>
        </md-card-content>
      </md-card>

      <md-button :style="`background-color:#${$store.state.instance.colour};color:#fff;`">Continue</md-button>
      <md-button class="md-primary" :to="localePath('contribute')">Cancel</md-button>
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
      uploadedFiles: null,
      options: {
        url: 'https://httpbin.org/anything',
        maxFiles: 10,
        parallelUploads: 10,
        autoProcessQueue: false,
        addRemoveLinks: true,
        uploadMultiple: true,
        acceptedFiles: '.png,.jpg,.jpeg,.gif'
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
      const vm = this
      setTimeout(function() {
        vm.uploadedFiles = []
        _.each(response, function(file) {
          vm.uploadedFiles.push({
            id: file.upload.uuid,
            dataURL: file.dataURL,
            filename: file.upload.filename,
            width: file.width,
            height: file.height
          })
        })
      }, 500)
    }
  }
}
</script>

<style lang="scss">
#customdropzone {
  border: 2px dashed #ccc;
  border-radius: 10px;
}

.photoAddContainer {
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
</style>