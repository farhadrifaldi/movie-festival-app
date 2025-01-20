<template>
  <MovieDetail
    :key="movieDetail?.id"
    v-model="openDetail"
    :data="movieDetail"
    :show-edit-btn="isEditable"
  />
  <div class="d-flex justify-space-between">
    <div>
      <VSelect
        v-model="filterBy"
        label="Select"
        :items="FILTER_LIST"
        @update:model-value="resetPage"
      />
    </div>
    <div style="width: 200px !important;">
      <VTextField
        v-model="search"
        label="Search"
        append-inner-icon="mdi-magnify"
        @click="fetch(true)"
        @keyup.enter="fetch(true)"
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
  <div class="d-flex justify-center mt-10">
    <VProgressCircular
      v-if="store.getLoading && movies.length <= 0"
      indeterminate
      :size="100"
    />
    <VBtn
      v-if="!isNoData"
      :loading="store.getLoading"
      :disabled="store.getMovieAllLoaded"
      @click="loadMore"
    >
      Load More
    </VBtn>
  </div>
  <v-empty-state
    v-if="!store.getLoading && isNoData"
    title="Movie Not Found"
    text="The movie you are looking for does not exist."
    icon="mdi-alert"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useMovieStore } from '@/stores'; // Updated import
import { MovieFilter, type movie } from '@/types/movie'; // Corrected import path

const FILTER_LIST = Object.values(MovieFilter)

const {isEditable} = defineProps<{isEditable?: boolean}>()

const store = useMovieStore(); // Updated store reference
const openDetail = ref(false);
const movieDetail = ref<movie | undefined>(undefined);
const movies = ref<movie[]>([]);

const search = ref<string>("");
const filterBy = ref<MovieFilter>(FILTER_LIST[0]);
const page = ref<number>(1);

const isNoData = computed(() => movies.value.length < 1);

onMounted(async () => {
 await fetch();
});

async function fetch(reset: boolean = false): Promise<void> {
  await store.fetchMovies({search: search.value, page: page.value, order: filterBy.value, reset: reset}); // Fetch movies from Supabase
  movies.value = store.getMovies; // Update local movies with fetched data
}

function onOpenDetail(id?: string): void {
  openDetail.value = true;
  movieDetail.value = movies.value.find((v: movie) => v?.id === id); // Explicitly typed parameter
}

function loadMore(): void {
  page.value++;
  nextTick((): void => {
    fetch(); // fetch after reactive
  });
}

function resetPage(): void {
  page.value = 1;
  nextTick((): void => {
    fetch(true); // fetch after reactive
  });
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
