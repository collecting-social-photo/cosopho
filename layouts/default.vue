<template>
  <div class="page-container">
    <component :is="'style'">
      :root {
      --md-theme-default-primary: #{{ color }} !important;
      }
    </component>
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button @click="menuVisible = !menuVisible" class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <md-button :to="localePath('contribute')" class="md-icon-button">
          <md-icon>add_circle_outline</md-icon>
        </md-button>

        <span class="topnav-title _hide_mobile"><nuxt-link :to="localePath('index')">{{ $store.state.instance.title }}</nuxt-link></span>
        <div class="md-toolbar-section-end">
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger>
              {{ $t('Menu-Languages') }}
            </md-button>

            <md-menu-content>
              <md-menu-item v-for="lang in $store.state.instance.languages" :key="lang" :to="switchLocalePath(lang)">
                <span class="md-list-item-text">{{ lang }}</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>

          <md-menu v-if="$auth.loggedIn && $store.state.user" md-size="medium" md-align-trigger>
            <md-button md-menu-trigger>
              <img :src="$store.state.user.avatar" class="avatar">
            </md-button>

            <md-menu-content>
              <md-menu-item :to="localePath({ name: 'profiles-id', params: { id: $store.state.user.slug } })">
                <span class="md-list-item-text">
                  {{ $t('Account Page-My Profile') }}
                </span>
              </md-menu-item>

              <md-menu-item :to="localePath('account')">
                <span class="md-list-item-text">{{ $t('Account Page-My Account') }}</span>
              </md-menu-item>

              <md-menu-item @click="$auth.logout()">
                <span class="md-list-item-text">{{ $t('Menu-Logout') }}</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>

          <md-menu md-size="medium">
            <md-button v-if="!$auth.loggedIn" :to="localePath('auth-login')">
              Login
            </md-button>
          </md-menu>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <img :src="`data:image/png;base64,${$store.state.instance.logo}`" class="logo">
        </md-toolbar>

        <md-list>
          <md-list-item :to="localePath('index')" @click="menuVisible=false">
            {{ $t('Menu-Home') }}
          </md-list-item>
          <md-list-item :to="localePath('about')" @click="menuVisible=false">
            {{ $t('Menu-About') }}
          </md-list-item>
          <md-list-item :to="localePath('contribute')" @click="menuVisible=false">
            {{ $t('Menu-Contribute') }}
          </md-list-item>
          <md-list-item :to="localePath('explore')" @click="menuVisible=false">
            {{ $t('Menu-Explore') }}
          </md-list-item>
          <md-list-item :to="localePath('privacy_and_terms')" @click="menuVisible=false">
            {{ $t('Menu-Privacy') }}
          </md-list-item>
          <md-list-item :to="localePath('initiatives')" @click="menuVisible=false">
            {{ $t('Menu-Initiatives') }}
          </md-list-item>
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
    menuVisible: false
  }),
  computed: {
    color () {
      return this.$store.state.instance.colour || '333333'
    }
  }
}
</script>
