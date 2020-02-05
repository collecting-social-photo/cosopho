<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" :style="`background-color:#${$store.state.instance.colour};`">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <md-button :to="localePath('contribute')" class="md-icon-button">
          <md-icon>add_circle_outline</md-icon>
        </md-button>

        <span><nuxt-link :to="localePath('index')">{{ $store.state.instance.title }}</nuxt-link></span>

        <div class="md-toolbar-section-end">

          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger>Languages</md-button>

            <md-menu-content>
              <md-menu-item :to="switchLocalePath('en')">
                <span class="md-list-item-text">English</span>
              </md-menu-item>

              <md-menu-item :to="switchLocalePath('fr')">
                <span class="md-list-item-text">French</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>


        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" :style="`background-color:#${$store.state.instance.colour};`">
        <md-toolbar class="md-transparent" md-elevation="0" :style="`background-color:#${$store.state.instance.colour};`">
          <img class="logo" :src="`data:image/png;base64,${$store.state.instance.logo}`"/>
        </md-toolbar>

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
        <nuxt />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuVisible: false,
    color: '#cccccc'
  })
}
</script>
