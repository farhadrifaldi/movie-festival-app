<template>
  <MovieDetail
    v-model="openDetail"
    :data="movieDetail"
  />
  <VRow>
    <VCol
      v-for="data in movies"
      :key="data.id"
      cols="3"
    >
      <MovieCard
        :data="data"
        @open="onOpenDetail"
      />
    </VCol>
  </VRow>
  <div
    v-if="!isNoData"
    class="d-flex justify-center"
  >
    <VBtn :loading="false">
      Load More
    </VBtn>
  </div>
  <MovieNoData v-if="isNoData" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { type movie } from '@/types/movie' // Corrected import path

const store = useAppStore()
const openDetail = ref(false)
const movieDetail = ref<movie | undefined>(undefined)
const movies = ref<movie[]>([])
const isNoData = computed(() => movies.value.length < 1)

onMounted(async () => {
  await store.fetchMovies() // Fetch movies from Supabase
  movies.value = store.getMovies // Update local movies with fetched data
})

function onOpenDetail(id?: string): void {
  console.log("open detail:", id)
  openDetail.value = true
  movieDetail.value = movies.value.find((v: movie) => v?.id === id) // Explicitly typed parameter
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
