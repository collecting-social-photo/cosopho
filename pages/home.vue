<template>
  <div>
    <div class="static-banner">
      <div v-for="instance in instances" :key="instance.id" :style="`background-color: #${instance.colour};`">
        <a :href="`https://${replaceInstance(instance.id)}.collectingsocialphoto.org/${instance.defaultLanguage}`" target="_blank">
          {{ instance.title }}
        </a>
      </div>
      <div v-if="instances" class="home-about">
        <nuxt-link :to="localePath('about-cosopho')">
          Learn about Collecting Social Photo
        </nuxt-link>
      </div>
    </div>
    <div class="main-scroller-container">
      <div class="img-scroller-container">
        <div>
          <div :style="scrollerStyle" class="img-scroller gridz" />
        </div>
      </div>
    </div>
    <md-dialog :md-active.sync="showModal" v-on:md-opened="openedModal" v-on:md-closed="closedModal">
      <md-dialog-title>{{ photo && photo.title }}</md-dialog-title>
    </md-dialog>
  </div>
</template>

<script>
export default {
  layout: 'home',
  data () {
    return {
      instances: null,
      photos: null,
      photo: {},
      ticker: null,
      moving: false,
      $grid: null,
      start: 400,
      startInit: 400,
      interval: 1,
      showModal: false,
      scrollerStyle: {
        transform: 'translateX(-400px)'
      }
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getPhotos({
      instances: [
        'stockholm-co-fafaf0da5a71f82d',
        'aalborg-city-ed1393df5c4099e5',
        'the-finnish--d7330c10c367d4fd',
        'nordic-museu-76ba77f9ebd5d275',
        'connect-to-c-5f0ff3a2fc4cd1fe'
      ],
      per_page: 100,
      approved: true,
      archived: false,
      excludeInactive: true
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

      vm.loadPhotos()

      vm.$grid.on('click', '.grid-itemz', function (event) {
        vm.photoSelected(event)
      })
    }
  },
  beforeDestroy () {
    this.toggleScroller()
  },
  methods: {
    photoSelected (event) {
      this.$grid.packery('layout')
      const data = event.currentTarget.dataset
      const id = data.id
      const instance = data.instance
      const url = `https://${this.replaceInstance(instance)}.collectingsocialphoto.org/en/explore/photo/${id}`
      // vm.showModal = true
      window.open(url, '_blank')
    },
    replaceInstance (subdomain) {
      if (subdomain === 'stockholm-co-fafaf0da5a71f82d') {
        return 'stockholmslansmuseum'
      }

      if (subdomain === 'aalborg-city-ed1393df5c4099e5') {
        return 'aalborgstadsarkiv'
      }

      if (subdomain === 'the-finnish--d7330c10c367d4fd') {
        return 'valokuvamuseo'
      }

      if (subdomain === 'nordic-museu-76ba77f9ebd5d275') {
        return 'nordiskamuseet'
      }

      if (subdomain === 'connect-to-c-5f0ff3a2fc4cd1fe') {
        return 'cosopho'
      }

      return subdomain
    },
    closedModal () {
      // this.toggleScroller()
    },
    openedModal () {
      // this.toggleScroller()
      // this.$grid.packery('layout')
    },
    loadPhotos () {
      const vm = this
      setTimeout(function () {
        let $items = $()
        _.forEach(_.shuffle(vm.photos), function (photo) {
          if (photo && photo.data && photo.data.public_id) {
            const pic = $(`<div class="grid-itemz" data-id="${photo.id}" data-title="${photo.title}" data-instance="${photo.instance}"><img src="https://res.cloudinary.com/hftpxlihv/image/upload/w_1000/v1576673295/${photo.data.public_id}.jpg" class="main-photo"></div>`)
            $items = $items.add(pic)
          }
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

          // if (this.start === 100) {
          //   this.$grid.packery('layout')
          // }

          if (this.start > 1000) {
            this.removePhotos()
            this.moving = false
            clearInterval(this.ticker)

            setTimeout(() => {
              this.start = this.startInit
              console.log('load new pics')
              this.loadPhotos()
              this.toggleScroller()
            }, 7000)
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
      _.remove(this.instances, { id: 'stiftelsen-l-ea94dfe2c6210320' })
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
  z-index: 4;
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
.home-about {
  height: 100px;
  background-color: #556271;
  display: flex;
  align-items: flex-end;
  font-size: 14px;
}
</style>
