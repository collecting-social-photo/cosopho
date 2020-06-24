<template>
  <div>
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
  layout: 'home',
  nuxtI18n: false,
  data () {
    return {
      instances: null,
      photos: null,
      photo: {},
      ticker: null,
      moving: false,
      $grid: null,
      start: 200,
      startInit: 200,
      interval: 1,
      showModal: false,
      scrollerStyle: {
        transform: 'translateX(-400px)'
      }
    }
  },
  async asyncData (context) {
    // const response = await context.app.$api.getPhotos({
    //   instance: context.store.state.instance.id,
    //   per_page: 100,
    //   approved: true,
    //   archived: false,
    //   sort: 'date',
    //   excludeInactive: true
    // })
    // let photos = response.data.data.photos

    // if (photos.length < 50) {
    //   photos = photos.concat(photos)
    //   photos = photos.concat(photos)
    //   photos = photos.concat(photos)
    // }

    // return {
    //   photos
    // }
  },
  mounted () {
    const vm = this
    this.toggleScroller()

    if (process.client) {

      vm.$grid = $('.gridz').packery({
        itemSelector: '.grid-itemz',
        gutter: 10,
        horizontal: true,
        percentPosition: true,
        transitionDuration: '2s',
        stagger: 100
      })

      vm.loadPhotos()
    }
  },
  beforeDestroy () {
    this.toggleScroller()
  },
  methods: {
    async fetchPhotos () {
      const response = await this.$api.getPhotos({
        instance: this.$store.state.instance.id,
        per_page: 100,
        approved: true,
        archived: false,
        sort: 'date',
        excludeInactive: true
      })

      let photos = response.data.data.photos

      console.log('Got new photos...')

      if (photos.length < 50) {
        photos = photos.concat(photos)
        photos = photos.concat(photos)
        photos = photos.concat(photos)
      }

      self.photos = photos
    },
    async loadPhotos () {
      const vm = this

      const response = await this.$api.getPhotos({
        instance: vm.$store.state.instance.id,
        per_page: 100,
        approved: true,
        archived: false,
        sort: 'date',
        excludeInactive: true
      })

      let photos = response.data.data.photos

      console.log('Got new photos...')

      if (photos.length < 50) {
        photos = photos.concat(photos)
        photos = photos.concat(photos)
        photos = photos.concat(photos)
      }

      vm.photos = photos

      setTimeout(function () {
        let $items = $()
        let counter = 0
        _.forEach(_.shuffle(vm.photos), function (photo) {
          if (photo && photo.data && photo.data.public_id) {
            let pic = $(`<div class="grid-itemz" data-id="${photo.id}" data-title="${photo.title}" data-instance="${photo.instance}"><img src="https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg" class="main-photo"></div>`)
            if (counter % 8 === 0) {
              pic = $(`<div class="grid-itemz large" data-id="${photo.id}" data-title="${photo.title}" data-instance="${photo.instance}"><img src="https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg" class="main-photo"></div>`)
            }
            $items = $items.add(pic)
          }
          counter++
        })

        vm.$grid.prepend($items).packery('prepended', $items)
        vm.$grid.packery('layout')

        setTimeout(function () {
          vm.$grid.packery('layout')
        }, 1000)
      }, 1000)
    },
    removePhotos () {
      const vm = this

      $('.grid-itemz').each(function (i, obj) {
        vm.$grid.packery('remove', obj)
      })
    },
    toggleScroller () {
      if (this.moving) {
        this.moving = false
        clearInterval(this.ticker)
      } else {
        this.moving = true
        this.ticker = setInterval(() => {
          this.moving = true
          this.start += 0.05

          if (
            (this.start > 400.0 && this.start < 400.1) ||
            (this.start > 550.0 && this.start < 550.1) ||
            (this.start > 800.0 && this.start < 800.1) ||
            (this.start > 1000.0 && this.start < 1000.1) ||
            (this.start > 1300.0 && this.start < 1300.1) ||
            (this.start > 1500.0 && this.start < 1500.1)
          ) {
            const randomItem = Math.floor(Math.random() * $('.grid-itemz').length)
            this.$grid.packery('remove', $('.grid-itemz').eq(randomItem))
            this.$grid.packery('layout')
          }

          if (this.start > 1800) {
            this.removePhotos()
            this.moving = false
            clearInterval(this.ticker)

            setTimeout(() => {
              this.start = this.startInit
              console.log('load new pics')
              this.fetchPhotos()
              this.loadPhotos()
              this.toggleScroller()
            }, 7000)
          }
          this.scrollerStyle.transform = `translateX(-${this.start}px)`
        }, this.interval)
      }
    }
  }
}
</script>

<style lang="scss">
.grid-itemz {
  width: 200px;

  &.large {
    width: 410px;
  }
}
</style>

<style lang="scss" scoped>
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
