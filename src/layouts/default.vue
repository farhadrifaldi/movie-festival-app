<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </template>
    <v-app-bar-title>MyMovies</v-app-bar-title>
    <v-btn
      v-if="store.getIsAuthenticated"
      icon
      @click="logout"
    >
      <v-icon icon="mdi-logout" />
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
      subtitle="sandra_a88@gmailcom"
      title="Sandra Adams"
    />
    <v-divider />
    <v-list-item
      link
      title="List Item 1"
    />
    <v-list-item
      link
      title="List Item 2"
    />
    <v-list-item
      link
      title="List Item 3"
    />
  </v-navigation-drawer>
  <v-main>
    <div style="padding: 20 !important">
      <router-view />
    </div>
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores';

const store = useAppStore()
const router = useRouter()

const drawer = ref(false);

const logout = async () => {
  try {
    await store.logout()
    router.push({name: "/auth/login"})
    // Handle successful login (e.g., redirect or show a message)
  } catch (error) {
    // Handle error (e.g., show an error message)
   console.log('logout error' ,error)
  }
}
</script>
