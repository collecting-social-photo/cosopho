<template>
  <div class="container">
    <h1>Select an initiative</h1>
    <p>Would you like to submit to one of our ongoing collecting initiatives?</p>
    <md-radio v-for="initiative in initiatives" :key="initiative.slug" v-model="selectedInitiative" :value="initiative.slug">
      {{ initiative.title }}
    </md-radio>
    <div>
      <md-button class="md-primary md-raised" :disabled="disabled" @click="goToUpload()">Start Uploading</md-button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      initiatives: null,
      selectedInitiative: null
    }
  },
  async asyncData (context) {
    var maxPage = 1
    let response = await context.app.$api.getInitiatives({
      instance: context.app.store.state.instance.id,
    })
    const initiatives = response.data.data.initiatives

    return { initiatives: initiatives }
  },
  computed: {
    disabled: function () {
      return !this.selectedInitiative
    }
  },
  methods: {
    goToUpload () {
      this.$router.push(this.localePath({ name: "contribute-id", params: { id: this.selectedInitiative }}))
    }
  }
}
</script>
