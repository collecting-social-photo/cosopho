<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>add_circle_outline</md-icon>
        </md-button>

        <span><nuxt-link :to="localePath('index')">{{ $store.state.host }}</nuxt-link></span>

        <div class="md-toolbar-section-end">
          <md-button @click="showSidepanel = true">Languages</md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Logo</md-toolbar>

        <md-list>
          <md-list-item :to="localePath('index')" @click="menuVisible=false">Home</md-list-item>
          <md-list-item :to="localePath('about')" @click="menuVisible=false">About</md-list-item>
          <md-list-item :to="localePath('contribute')" @click="menuVisible=false">Contribute</md-list-item>
          <md-list-item :to="localePath('explore')" @click="menuVisible=false">Explore</md-list-item>
          <md-list-item :to="localePath('profile')" @click="menuVisible=false">My Profile</md-list-item>
          <md-list-item :to="localePath('account')" @click="menuVisible=false">My Account</md-list-item>
          <md-list-item :to="localePath('index')" @click="menuVisible=false">Logout</md-list-item>
          <md-list-item :to="localePath('privacy_and_terms')" @click="menuVisible=false">Privacy & Terms</md-list-item>
          <md-list-item :to="localePath('initiatives')" @click="menuVisible=false">Initiatives</md-list-item>
        </md-list>

      </md-app-drawer>

      <md-app-content>

        <md-drawer class="md-right" :md-active.sync="showSidepanel">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-title">Languages</span>
          </md-toolbar>

          <md-list>
            <md-list-item :to="switchLocalePath('en')" @click="showSidepanel=false">
              <span class="md-list-item-text">English</span>
              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chat_bubble</md-icon>
              </md-button>
            </md-list-item>

            <md-list-item :to="switchLocalePath('fr')" @click="showSidepanel=false">
              <span class="md-list-item-text">French</span>
              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chat_bubble</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </md-drawer>

        <nuxt />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuVisible: false,
    showSidepanel: false
  })
}
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 100vh;
  }

   // Demo purposes only
  .md-drawer {
    width: 300px;
    max-width: calc(100vw - 125px);
  }
</style>