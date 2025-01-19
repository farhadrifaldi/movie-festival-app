<template>
  <VContainer>
    <VBtn
      :to="{name: '/admin/movie/create'}"
      href="#"
      variant="flat"
      color="primary"
      width="100%"
    >
      Add New Movies
    </VBtn>
    <MovieList /><!-- MovieList component -->
  </VContainer>
</template>
