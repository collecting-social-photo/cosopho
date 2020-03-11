<template>
  <div>
    <div class="static-banner">
      <div v-for="instance in instances" :key="instance.id" :style="`background-color: #${instance.colour};`">
        <a :href="`https://${instance.id}.collectingsocialphoto.com`" target="_blank">
          {{ instance.title }}
        </a>
      </div>
    </div>
    <div class="main-scroller-container">
      <div class="img-scroller-container">
        <div>
          <div :style="scrollerStyle" class="img-scroller gridz">
            <div v-for="(photo, index) in photos" :key="index" :style="{ width: `200px`}" @click="toggleScroller()" class="grid-itemz">
              <photoComp :publicId="photo.data && photo.data.public_id" />
            </div>
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
  layout: 'home',
  components: {
    photoComp
  },
  data () {
    return {
      instances: null,
      photos: null,
      $grid: null,
      ticker: null,
      moving: false,
      start: 0,
      interval: 1,
      scrollerStyle: {
        transform: 'translateX(-50px)'
      }
    }
  },
  mounted () {
    this.getInstances()
    this.getPhotos()
    this.toggleScroller()
  },
  methods: {
    toggleScroller () {
      if (this.moving) {
        this.moving = false
        clearInterval(this.ticker)
      } else {
        this.moving = true
        this.ticker = setInterval(() => {
          this.moving = true
          this.start += 0.05
          if (this.start > 800) {
            this.start = 0
          }
          this.scrollerStyle.transform = `translateX(-${this.start}px)`
        }, this.interval)
      }
    },
    rando (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    async getPhotos () {
      const vm = this
      const response = await this.$api.getPhotos({
        instance: 'micah-walter-674bb737a19d3046',
        per_page: 100,
        archived: false
      })
      this.photos = response.data.data.photos
      this.photos = this.photos.concat(response.data.data.photos)
      this.photos = this.photos.concat(response.data.data.photos)

      if (process.client) {
        setTimeout(function () {
          vm.$grid = $('.gridz').packery({
            itemSelector: '.grid-itemz',
            gutter: 10,
            horizontal: true,
            percentPosition: true
          })
        }, 100)
      }
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
.static-banner {
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: black;
  left: 20px;
  bottom: 20px;
  font-size: 18px;
  z-index: 100;
  width: 400px;
  color: white;
  -webkit-box-shadow: 0px 3px 21px 0px rgba(0,0,0,0.35);
  -moz-box-shadow: 0px 3px 21px 0px rgba(0,0,0,0.35);
  box-shadow: 0px 3px 21px 0px rgba(0,0,0,0.35);
  div {
    padding: 10px;
    margin-bottom: 5px;
    a, a:hover {
      color: white;
      text-decoration: none;
    }
  }
}
.main-scroller-container {
  background-color: #000;
}
.img-scroller {
  height: 100vh;
  position: relative;
  background-color: #000;
}
</style>
