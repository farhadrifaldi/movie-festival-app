<template>
  <MovieCreate :id="params.id" />
</template>

<script lang="ts" setup>
import MovieCreate from '@/components/movies/MovieCreate.vue';

const router = useRoute()
const params = router.params as {id: string}
</script>
