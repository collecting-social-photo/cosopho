<template>
  <div>
    <div class="static-banner">
      <div v-for="instance in instances" :key="instance.id" :style="`background-color: #${instance.colour};`">
        <a :href="`https://${instance.id}.collectingsocialphoto.com/${instance.defaultLanguage}`" target="_blank">
          {{ instance.title }}
        </a>
      </div>
    </div>
    <div class="main-scroller-container">
      <div class="img-scroller-container">
        <div>
          <div :style="scrollerStyle" class="img-scroller gridz" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nuxtI18n: false,
  layout: 'home',
  data () {
    return {
      instances: null,
      photos: null,
      ticker: null,
      moving: false,
      $grid: null,
      start: 400,
      startInit: 400,
      interval: 1,
      scrollerStyle: {
        transform: 'translateX(-400px)'
      }
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPhotos({
      per_page: 100,
      archived: false
    })
    const photos = response.data.data.photos

    return {
      photos
    }
  },
  mounted () {
    const vm = this
    this.toggleScroller()
    this.getInstances()

    if (process.client) {

      vm.$grid = $('.gridz').packery({
        itemSelector: '.grid-itemz',
        gutter: 10,
        horizontal: true,
        percentPosition: true,
        transitionDuration: '2s',
        stagger: 100
      })

      setTimeout(function () {
        let $items = $()
        _.forEach(vm.photos, function (photo) {
          const pic = $(`<div class="grid-itemz"><img src="https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg" class="main-photo"></div>`)
          $items = $items.add(pic)
        })

        vm.$grid.prepend($items).packery('prepended', $items)

        setTimeout(function () {
          vm.$grid.packery('layout')
        }, 1000)
      }, 1000)

      vm.$grid.on('click', '.grid-itemz', function (event) {
        vm.$grid.packery('remove', event.currentTarget)
        vm.$grid.packery('layout')
      })
    }
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
          if (this.start > 1000) {
            this.start = this.startInit
          }
          this.scrollerStyle.transform = `translateX(-${this.start}px)`
        }, this.interval)
      }
    },
    rando (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    async getInstances () {
      const response = await this.$api.getInstances({
        per_page: 100
      })
      this.instances = response.data.data.instances
      _.remove(this.instances, { id: 'micah-walter-674bb737a19d3046' })
      _.remove(this.instances, { id: 'vanuatu-bc34e5b350e7e5ef' })
      _.remove(this.instances, { id: 'funny-animal-565a66dd8aed5525' })
      _.remove(this.instances, { id: 'connect-to-c-5f0ff3a2fc4cd1fe' })
    }
  }
}
</script>

<style lang="scss">
.grid-itemz {
  width: 200px;
}
</style>

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
  -webkit-box-shadow: 0px 3px 21px 0px rgba(0,0,0,0.95);
  -moz-box-shadow: 0px 3px 21px 0px rgba(0,0,0,0.95);
  box-shadow: 0px 3px 21px 0px rgba(0,0,0,0.95);
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
  display: flex;
  background-color: #000;
}
</style>
