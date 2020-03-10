<template>
  <div class="main-scroller-container">
    <div class="img-scroller-container">
      <div>
        <div class="img-scroller gridz">
          <div v-for="photo in photos" :key="photo.id" :style="{ width: `200px`}" class="grid-itemz">
            <photoComp :publicId="photo.data && photo.data.public_id" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="container">
    <div class="home-container">
      <md-card v-for="instance in instances" :key="instance.id" :style="`background-color: #${instance.colour};`">
        <a :href="`https://${instance.id}.collectingsocialphoto.com`" target="_blank">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">
                {{ instance.title }}
              </div>
            </md-card-header-text>

            <md-card-media md-big>
              <img :src="`data:image/png;base64,${instance.logo}`" class="home-logo">
            </md-card-media>
          </md-card-header>
        </a>
      </md-card>
    </div>
  </div> -->
</template>

<script>
import photoComp from '~/components/photoComp.vue'

export default {
  nuxtI18n: false,
  layout: 'plain',
  components: {
    photoComp
  },
  data () {
    return {
      instances: null,
      photos: null,
      start: 0,
      interval: 1000,
      scrollerStyle: {
        transform: 'translateX(0)'
      }
    }
  },
  mounted () {
    // this.getInstances()
    this.getPhotos()
    // setInterval(() => {
    //   this.start += 1
    //   this.scrollerStyle.transform = `translateX(-${this.start}px)`
    // }, this.interval)

    if (process.client) {


      setTimeout(function () {
        const $grid = $('.gridz').packery({
          itemSelector: '.grid-itemz',
          gutter: 10,
          horizontal: true,
          percentPosition: true
        })
      }, 1000)
    }
  },
  methods: {
    rando (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    async getPhotos () {
      const response = await this.$api.getPhotos({
        instance: 'micah-walter-674bb737a19d3046',
        per_page: 100
      })
      this.photos = response.data.data.photos
    },
    async getInstances () {
      const response = await this.$api.getInstances({
        per_page: 100
      })
      this.instances = response.data.data.instances
    }
  }
}
</script>

<style lang="scss" scoped>
.main-scroller-container {
  background-color: #000;
}
.img-scroller {
  height: 100vh;
  position: relative;
  background-color: #000;
}
</style>
