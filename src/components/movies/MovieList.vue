<template>
  <MovieDetail
    v-model="openDetail"
    :data="movieDetail"
  />
  <div class="d-flex justify-space-between">
    <div>
      <VSelect
        v-model="filterBy"
        label="Select"
        :items="['Most Viewed', 'Most Rated']"
      />
    </div>
    <div style="width: 200px !important;">
      <VTextField
        v-model="search"
        label="Search"
        append-inner-icon="mdi-magnify"
        @click:append-inner="fetch"
        @keyup.enter="fetch"
      />
    </div>
  </div>
  <VRow v-if="!isNoData">
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

const filterList = ['Most Viewed', 'Most Rated']

const store = useAppStore()
const openDetail = ref(false)
const movieDetail = ref<movie | undefined>(undefined)
const movies = ref<movie[]>([])

const search = ref<string>("")
const filterBy = ref<string>(filterList[0])

const isNoData = computed(() => movies.value.length < 1)

onMounted(async () => {
 await fetch()
})

async function fetch(): Promise<void> {
  await store.fetchMovies(search.value) // Fetch movies from Supabase
  movies.value = store.getMovies // Update local movies with fetched data
}

function onOpenDetail(id?: string): void {
  openDetail.value = true
  movieDetail.value = movies.value.find((v: movie) => v?.id === id) // Explicitly typed parameter
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
