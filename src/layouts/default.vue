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
  <VNavigationDrawer
    v-if="store.getIsAuthenticated"
    v-model="drawer"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/75.jpg"
      :subtitle="store.getUser?.email"
    />
    <v-divider />
    <v-list-item
      v-if="store.getIsAdmin"
      link
      :to="{name: '/admin/movie/'}"
      title="CRUD Movies"
    />
    <v-list-item
      link
      :to="{name: '/user/movie/'}"
      title="Movies"
    />
  </VNavigationDrawer>
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
