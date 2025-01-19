<template>
  <MovieCreate :id="router.params.id" />
</template>

<script lang="ts" setup>
import MovieCreate from '@/components/movies/MovieCreate.vue';

const router = useRoute()
</script>
