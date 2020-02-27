<template>
  <div class="container">
    <div>
      <h1>Upload up to 10 photos</h1>
      <dropzone
        id="customdropzone"
        ref="el"
        v-if="!photosReady || uploadedFiles.length < 1"
        :options="options"
        :destroyDropzone="true"
        :useCustomSlot="true"
        v-on:vdropzone-success="uploadSuccess"
        v-on:vdropzone-queue-complete="comp"
      >
        <div class="dropzone-custom-content">
          <h3 class="dropzone-custom-title">
            <md-icon>cloud_upload</md-icon> Drag and drop photos here to upload!
          </h3>
          <div class="subtitle">
            ...or click to select photos from your computer
          </div>
        </div>
      </dropzone>
    </div>
    <div v-if="photosReady && uploadedFiles.length > 0">
      <md-card v-for="(file, index) in uploadedFiles" :key="file.id" class="upload-card">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-30">
              <photoComp :publicId="file.id" />
              <div class="center">
                <md-button @click="deletePhoto(file, index)" class="md-accent">
                  Delete <md-icon>delete</md-icon>
                </md-button>
              </div>
            </div>
            <div class="md-layout-item md-size-70">
              <md-field>
                <label for="title">Short Description</label>
                <md-input id="title" v-model="file.title" name="title" />
              </md-field>

              <md-field>
                <label for="something">Tell us about this photo (limit 400 characters)</label>
                <md-textarea v-model="file.story" />
              </md-field>

              <md-field>
                <label for="tags">Add some tags</label>
                <md-input v-model="file.tags" name="tags" />
                <span class="md-helper-text">Separate the tags by using commas.</span>
              </md-field>

              <h3>We pulled this information from your photo:</h3>

              <md-field>
                <label for="make">Make</label>
                <md-input v-model="file.make" name="make" />
              </md-field>

              <md-field>
                <label for="model">Model</label>
                <md-input v-model="file.model" name="model" />
              </md-field>

              <md-field>
                <label for="aperture">Aperture</label>
                <md-input v-model="file.aperture" type="number" name="aperture" />
              </md-field>

              <md-field>
                <label for="shutterspeed">Shutter Speed</label>
                <md-input v-model="file.shutterspeed" type="number" name="shutterspeed" />
              </md-field>

              <md-field>
                <label for="iso">ISO</label>
                <md-input v-model="file.iso" type="number" name="iso" />
              </md-field>

              <md-field>
                <label for="focallength">Focal Length</label>
                <md-input v-model="file.focallength" type="number" name="focallength" />
              </md-field>

              <md-field>
                <label for="location">Location</label>
                <md-input v-model="file.location" name="location" />
                <span class="md-helper-text">Please be as specific as possible. ex. London, UK</span>
              </md-field>

              <md-field>
                <label for="date">Date</label>
                <md-input v-model="file.date" type="date" name="date" />
                <span class="md-helper-text">Please select the date the photo was taken.</span>
              </md-field>

              <h3>Where did you post this photo? Select all that apply.</h3>

              <div>
                <md-checkbox v-model="file.socialMedias" value="facebook">
                  Facebook
                </md-checkbox>
                <md-checkbox v-model="file.socialMedias" value="instagram">
                  Instagram
                </md-checkbox>
                <md-checkbox v-model="file.socialMedias" value="snapchat">
                  SnapChat
                </md-checkbox>
                <md-checkbox v-model="file.socialMedias" value="twitter">
                  Twitter
                </md-checkbox>
                <md-checkbox v-model="file.where_other">
                  other
                </md-checkbox>
                <md-field v-if="file.where_other">
                  <md-input v-model="file.otherSM" name="other" placeholder="Say where" />
                </md-field>
              </div>

              <h3>Select a license to choose how you want others sharing and using your image.</h3>

              <div>
                <md-radio v-model="file.license" value="CC-0">
                  CC-0 Free to use without restrictions.
                </md-radio>
                <md-radio v-model="file.license" value="CC-BY">
                  CC-BY Display my name every time the photo is used.
                </md-radio>
                <md-radio v-model="file.license" value="CC-BY-NYC">
                  CC-BY-NC My image cannot be used commercially.
                </md-radio>
              </div>

              <p><a href="https://creativecommons.org/" target="_blank">Learn more about the different image licenses.</a></p>

              <h3>Archived</h3>

              <div>
                <md-checkbox v-model="file.archived">
                  Archived
                </md-checkbox>

                <p>This image should not be publicly available for 50 years, but I do wish for them to be saved for the future according to the terms and conditions.</p>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
      <md-button @click="savePhotos()" class="md-raised md-primary">
        Save
      </md-button>
      <md-button @click="cancelUpload()" class="md-primary">
        Cancel
      </md-button>
    </div>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import photoComp from '~/components/photoComp.vue'

export default {
  middleware: 'auth',
  components: {
    Dropzone,
    photoComp
  },
  data () {
    return {
      selectedInitiative: null,
      uploadedFiles: [],
      photosReady: false,
      options: {
        url: `${this.$store.state.hostname}/cloudinary`,
        maxFiles: 10,
        parallelUploads: 10,
        uploadMultiple: false,
        acceptedFiles: '.png,.jpg,.jpeg,.gif'
      }
    }
  },
  asyncData (context) {
    if (!context.params.id) {
      return context.redirect(context.app.localePath({ name: 'contribute' }))
    }
    return { selectedInitiative: context.params.id }
  },
  mounted () {
    const myDropzone = this.$refs.el.dropzone

    myDropzone.on('sending', function (file, xhr, formData) {
      formData.append('api_key', process.env.cloudinaryApi)
      formData.append('timestamp', Date.now() / 1000 | 0)
      formData.append('upload_preset', 'ml_default')
      formData.append('exif', true)
    })
  },
  methods: {
    comp () {
      this.photosReady = true
    },
    uploadSuccess (file, response) {
      const vm = this

      setTimeout(function () {
        vm.uploadedFiles.push(
          {
            id: response.public_id,
            dataURL: file.dataURL,
            secureUrl: response.secure_url,
            filename: file.upload.filename,
            width: file.width,
            height: file.height,
            make: response.exif.Make,
            model: response.exif.Model,
            aperture: response.exif.ApertureValue,
            shutterspeed: response.exif.ShutterSpeedValue,
            iso: response.exif.ISOSpeed,
            focallength: response.exif.FocalLength,
            socialMedias: [],
            date: vm.$moment().format('YYYY-MM-DD'),
            license: 'CC-0'
          }
        )
      }, 500)
    },
    deletePhoto (file, index) {
      const vm = this
      vm.$delete(vm.uploadedFiles, index)
      vm.$api.deletePhoto(file.id)
    },
    cancelUpload () {
      const vm = this
      _.each(vm.uploadedFiles, function (file) {
        vm.$api.deletePhoto(file.id)
      })
      vm.$router.push({ path: vm.localePath({ name: 'contribute' }), force: true })
    },
    savePhotos () {
      const vm = this
      _.each(vm.uploadedFiles, async function (photo) {
        const vars = {
          instance: vm.$store.state.instance.id,
          personSlug: vm.$store.state.user.slug,
          initiative: vm.selectedInitiative,
          title: photo.title || null,
          story: photo.story || null,
          tags: (photo.tags && photo.tags.split(',')) || null,
          location: photo.location || null,
          date: photo.date || null,
          socialMedias: photo.socialMedias || null,
          otherSM: photo.otherSM || null,
          make: photo.make || null,
          model: photo.model || null,
          aperture: (photo.aperture && parseFloat(photo.aperture)) || null,
          shutterSpeed: (photo.shutterSpeed && parseFloat(photo.shutterSpeed)) || null,
          ISO: (photo.ISO && parseInt(photo.ISO)) || null,
          focalLength: (photo.focalLength && parseInt(photo.focalLength)) || null,
          license: photo.license || null,
          approved: photo.approved || false,
          archived: photo.archived || false,
          data: JSON.stringify({
            public_id: photo.id,
            width: photo.width,
            height: photo.height
          })
        }

        const response = await vm.$api.createPhoto(vars)
      })

      setTimeout(function () {
        vm.$toast.success('Successfully added photos!', {
          theme: 'toasted-primary',
          position: 'top-right',
          duration: 5000
        })
        vm.$router.push({ path: vm.localePath({ name: 'profiles-id', params: { id: vm.$store.state.user.slug } }), force: true })
      }, 1000)
    }
  }
}
</script>
