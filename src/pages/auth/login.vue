<template>
  <v-container>
    <v-form @submit.prevent="login">
      <VAlert
        v-if="alert.show"
        icon="mdi-check"
        :text="alert.message"
        :color="alert.type"
        class="mb-7"
      />
      <v-text-field
        v-model="email"
        label="Email"
        required
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      />
      <v-btn type="submit">
        Login
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '../../stores'

const router = useRouter()
const store = useAppStore()
const email = ref('')
const password = ref('')
const alert = ref<{
  show: boolean,
  message: string,
  type: 'success'| 'warning'
}>({show: false, message: '', type: 'success'});

const login = async () => {
  // alert.value.show = false

  try {
    await store.login(email.value, password.value)
    router.push({name: "/user/movie/"})
    // Handle successful login (e.g., redirect or show a message)
  } catch (error) {
    // Handle error (e.g., show an error message)
    alert.value.message = "Cant login "+ error
    alert.value.type = 'warning'
    alert.value.show = true
  }
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
