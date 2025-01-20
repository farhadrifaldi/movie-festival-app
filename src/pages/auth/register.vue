<template>
  <v-container>
    <h1 class="text-center mb-10">
      REGISTER
    </h1>
    <v-form @submit.prevent="register">
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
        Register
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores'

const router = useRouter()
const store = useAppStore()
const email = ref('')
const password = ref('')
const alert = ref<{
  show: boolean,
  message: string,
  type: 'success'| 'warning'
}>({show: false, message: '', type: 'success'});


const register = async () => {
  alert.value.show = false
  try {
    await store.register(email.value, password.value)
    router.push('/auth/login')
    // Handle successful registration (e.g., redirect or show a message)
    alert.value.message = "Register Complete, please check your Email"
    alert.value.type = 'success'
    alert.value.show = true
  } catch (error) {
    // Handle error (e.g., show an error message)
    console.error(error)
    // Handle error (e.g., show an error message)
    alert.value.message = "Cant Register "+ error
    alert.value.type = 'warning'
    alert.value.show = true
  }
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
