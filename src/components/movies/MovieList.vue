<template>
  <MovieDetail
    v-model="openDetail"
    :data="movieDetail"
  />
  <VRow>
    <VCol
      v-for="data in SAMPLE_DATA_COLLECTIONS"
      :key="data.id"
      cols="3"
    >
      <MovieCard
        :data="data"
        @open="onOpenDetail"
      />
    </VCol>
  </VRow>
  <div class="d-flex justify-center">
    <VBtn :loading="false">
      Load More
    </VBtn>
  </div>
</template>

<script setup lang="ts">
import { SAMPLE_DATA_COLLECTIONS, type movie } from "@/types/movie";

const openDetail = ref(false);
const movieDetail = ref<movie | undefined>(undefined);

function onOpenDetail(id?: string): void {
  console.log("open detail:", id);
  openDetail.value = true;
  movieDetail.value = SAMPLE_DATA_COLLECTIONS.find((v) => v?.id === id);
}
</script>
