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
                <label for="title">Short Description</label>
                <md-input name="title" id="title" v-model="file.title" />
              </md-field>

              <md-field>
                <label for="something">Tell us about this photo (limit 400 characters)</label>
                <md-textarea v-model="file.story"></md-textarea>
              </md-field>

              <md-field>
                <label for="tags">Add some tags</label>
                <md-input name="tags" v-model="file.tags" />
                <span class="md-helper-text">Separate the tags by using commas.</span>
              </md-field>

              <h3>We pulled this information from your photo:</h3>

              <md-field>
                <label for="make">Make</label>
                <md-input name="make" v-model="file.make" />
              </md-field>

              <md-field>
                <label for="model">Model</label>
                <md-input name="model" v-model="file.model" />
              </md-field>

              <md-field>
                <label for="aperture">Aperture</label>
                <md-input name="aperture" v-model="file.aperture" />
              </md-field>

              <md-field>
                <label for="shutterspeed">Shutter Speed</label>
                <md-input name="shutterspeed" v-model="file.shutterspeed" />
              </md-field>

              <md-field>
                <label for="iso">ISO</label>
                <md-input name="iso" v-model="file.iso" />
              </md-field>

              <md-field>
                <label for="focallength">Focal Length</label>
                <md-input name="focallength" v-model="file.focallength" />
              </md-field>

              <md-field>
                <label for="location">Location</label>
                <md-input name="location" v-model="file.location" />
                <span class="md-helper-text">Please be as specific as possible. ex. London, UK</span>
              </md-field>

              <md-field>
                <label for="date">Date</label>
                <md-input type="date" name="date" v-model="file.date" />
                <span class="md-helper-text">Please select the date the photo was taken.</span>
              </md-field>

              <h3>Where did you post this photo? Select all that apply.</h3>

              <div>
                <md-checkbox v-model="file.where_facebook">Facebook</md-checkbox>
                <md-checkbox v-model="file.where_instagram">Instagram</md-checkbox>
                <md-checkbox v-model="file.where_snapchat">SnapChat</md-checkbox>
                <md-checkbox v-model="file.where_twitter">Twitter</md-checkbox>
                <md-checkbox v-model="file.where_other">other</md-checkbox>
                <md-field v-if="file.where_other">
                  <md-input name="otherSM" v-model="file.otherSM" placeholder="Say where" />
                </md-field>
              </div>

              <h3>Select a license to choose how you want others sharing and using your image.</h3>

              <div>
                <md-radio v-model="file.license" value="CC-0">CC-0 Free to use without restrictions.</md-radio>
                <md-radio v-model="file.license" value="CC-BY">CC-BY-NC My image cannot be used commercially.</md-radio>
                <md-radio v-model="file.license" value="CC-BY-NYC">CC-BY-NC My image cannot be used commercially.</md-radio>
              </div>

              <p><a href="https://creativecommons.org/" target="_blank">Learn more about the different image licenses.</a></p>

              <h3>Archived</h3>

              <div>
                <md-checkbox v-model="file.archived">Archived</md-checkbox>

                <p>This image should not be publicly available for 50 years, but I do wish for them to be saved for the future according to the terms and conditions.</p>
              </div>

            </div>
          </div>
        </md-card-content>
      </md-card>

      <md-button class="md-raised md-primary">Save</md-button>
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
            height: file.height,
            date: vm.$moment().format("YYYY-MM-DD"),
            license: 'CC-0'
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