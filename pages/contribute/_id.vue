<template>
  <div class="container">
    <div>
      <h1>{{ $t('Contribute Process-Upload limit') }}</h1>
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
            <md-icon>cloud_upload</md-icon> {{ $t('Contribute Process-drag and drop') }}
          </h3>
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
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </div>
            <div class="md-layout-item md-size-70">
              <md-field>
                <label for="title">{{ $t('Contribute Process-Short Description') }}</label>
                <md-input id="title" v-model="file.title" name="title" />
              </md-field>

              <md-field>
                <label for="something">{{ $t('Contribute Process-Description') }}</label>
                <md-textarea v-model="file.story" />
              </md-field>

              <md-field>
                <label for="tags">{{ $t('Contribute Process-Tags') }}</label>
                <md-input v-model="file.tags" name="tags" />
                <span class="md-helper-text">{{ $t('Contribute Process-Tags Subtitle') }}</span>
              </md-field>

              <h3>{{ $t('Contribute Process-Exif section') }}</h3>

              <md-field>
                <label for="make">{{ $t('Contribute Process-Make') }}</label>
                <md-input v-model="file.make" name="make" />
              </md-field>

              <md-field>
                <label for="model">{{ $t('Contribute Process-Model') }}</label>
                <md-input v-model="file.model" name="model" />
              </md-field>

              <md-field>
                <label for="aperture">{{ $t('Contribute Process-Aperture') }}</label>
                <md-input v-model="file.aperture" type="number" name="aperture" />
              </md-field>

              <md-field>
                <label for="shutterspeed">{{ $t('Contribute Process-Shutter Speed') }}</label>
                <md-input v-model="file.shutterspeed" type="number" name="shutterspeed" />
              </md-field>

              <md-field>
                <label for="iso">{{ $t('Contribute Process-ISO') }}</label>
                <md-input v-model="file.iso" type="number" name="iso" />
              </md-field>

              <md-field>
                <label for="focallength">{{ $t('Contribute Process-Focal Length') }}</label>
                <md-input v-model="file.focallength" type="number" name="focallength" />
              </md-field>

              <h3>{{ $t('Contribute Process-Location') }}</h3>

              <md-field>
                <label for="location">{{ $t('Contribute Process-Location') }}</label>
                <md-input v-model="file.location" name="location" />
                <span class="md-helper-text">{{ $t('Contribute Process-Location subtitle') }}</span>
              </md-field>

              <md-field>
                <md-datepicker v-model="file.date">
                  <label>{{ $t('Contribute Process-Date') }}</label>
                </md-datepicker>
                <span class="md-helper-text">{{ $t('Contribute Process-Date Subtitle') }}</span>
              </md-field>

              <h3>{{ $t('Contribute Process-Social Media') }}</h3>

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
                  {{ $t('Account Page-Other') }}
                </md-checkbox>
                <md-field v-if="file.where_other">
                  <md-input v-model="file.otherSM" name="other" />
                </md-field>
              </div>

              <h3>{{ $t('Contribute Process-License') }}</h3>

              <div>
                <md-radio v-model="file.license" value="CC-0">
                  {{ $t('Contribute Process 2-CC0') }}
                </md-radio>
                <md-radio v-model="file.license" value="CC-BY">
                  {{ $t('Contribute Process 2-CCBY') }}
                </md-radio>
                <md-radio v-model="file.license" value="CC-BY-NC">
                  {{ $t('Contribute Process 2-CCBYNC') }}
                </md-radio>
              </div>

              <div v-html="$t('Contribute Process 2-License Link')" />

              <h3>{{ $t('Contribute Process 2-Archived') }}</h3>

              <div>
                <md-checkbox v-model="file.archived">
                  {{ $t('Contribute Process 2-Archived') }}
                </md-checkbox>

                <p>{{ $t('Contribute Process 2-Archived Note') }}</p>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
      <md-button @click="savePhotos()" class="md-raised md-primary">
        {{ $t('Account Page-Save Button') }}
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

    if (!context.app.$utils.profileIsReady()) {
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
      vm.$api.deleteCloudPhoto(file.id)
    },
    cancelUpload () {
      const vm = this
      _.each(vm.uploadedFiles, function (file) {
        vm.$api.deleteCloudPhoto(file.id)
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
          approved: photo.approved || true,
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
        vm.$toast.success(vm.$t('Upload Success Page-Success subtitle'))
        vm.$router.push({ path: vm.localePath({ name: 'profiles-id', params: { id: vm.$store.state.user.slug } }), force: true })
      }, 1000)
    }
  }
}
</script>
