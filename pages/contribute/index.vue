<template>
  <div class="container">
    <h1>{{ $t('Contribute Process-Select') }}</h1>
    <p>{{ $t('Contribute Process-Select Subtitle') }}</p>
    <md-radio v-for="initiative in initiatives" :key="initiative.slug" v-model="selectedInitiative" :value="initiative.slug">
      {{ initiative.title }}
    </md-radio>
    <div>
      <md-button :disabled="disabled" @click="goToUpload()" class="md-primary md-raised button-no-margin">
        {{ $t('Contribute Process-Start Button') }}
      </md-button>
    </div>
    <div v-if="!allowUpload">
      <md-icon>notification_important</md-icon> Please <nuxt-link :to="localePath('account')">
        complete your profile
      </nuxt-link> before uploading photos.
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      initiatives: null,
      selectedInitiative: null,
      allowUpload: false
    }
  },
  computed: {
    disabled () {
      return !this.selectedInitiative || !this.allowUpload
    }
  },
  async asyncData (context) {
    const response = await context.app.$api.getInitiatives({
      instance: context.app.store.state.instance.id,
      isActive: true,
      photos_approved: true,
      photos_archived: false
    })
    const initiatives = response.data.data.initiatives

    return { initiatives }
  },
  mounted () {
    if (this.$utils.profileIsReady()) {
      this.allowUpload = true
    }
  },
  methods: {
    goToUpload () {
      this.$router.push(this.localePath({ name: 'contribute-id', params: { id: this.selectedInitiative } }))
    }
  },
  head () {
    return {
      title: 'Contribute - Collecting Social Photo'
    }
  }
}
</script>
