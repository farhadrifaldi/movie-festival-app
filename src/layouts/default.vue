<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </template>
    <v-app-bar-title>MyMovies</v-app-bar-title>
    <v-btn icon>
      <v-icon icon="mdi-logout" />
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom"
      title="Sandra Adams" />
    <v-divider />
    <v-list-item link title="List Item 1" />
    <v-list-item link title="List Item 2" />
    <v-list-item link title="List Item 3" />
  </v-navigation-drawer>
  <v-main>
    <div style="padding: 20 !important">
      <router-view />
    </div>
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
const drawer = ref(false);
</script>
