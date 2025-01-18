<template>
  <VContainer>
    <VRow>
      <VCol v-for="data in SAMPLE_DATA_COLLECTIONS" cols="3" :key="data.id">
        <MovieCard :data="data" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { SAMPLE_DATA_COLLECTIONS } from '@/types/movie'

</script>
