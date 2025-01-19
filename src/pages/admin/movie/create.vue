<template>
  <VContainer>
    <VAlert
      v-if="alert.show"
      icon="mdi-check"
      :text="alert.message"
      color="success"
    />
    <h1 class="d-flex align-center mb-5">
      <RouterLink :to="{name:'/admin/movie/show'}">
        <VIcon icon="mdi-chevron-left" />
      </RouterLink>
      Create Movie
    </h1>
    <VForm
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <VFileInput
        v-model="video"
        :rules="[rules.required]"
        label="Movie Image"
        required
        accept="video/*"
      />
      <VTextField
        v-model="movie.title"
        :rules="[rules.required]"
        label="Movie Title"
        required
      />
      <VTextarea
        v-model="movie.description"
        :rules="[rules.required]"
        label="Movie Description"
        required
      />
      <VFileInput
        v-model="image"
        :rules="[rules.required]"
        label="Movie Image"
        required
        accept="image/*"
      />
      <VTextField
        v-model="movie.duration"
        :rules="[rules.required]"
        label="Duration (in seconds)"
        required
        type="number"
      />
      <VTextField
        v-model="movie.genres"
        :rules="[rules.required]"
        label="Genres"
        required
      />
      <VTextField
        v-model="movie.artists"
        :rules="[rules.required]"
        label="Artists"
        required
      />
      <VTextField
        v-model="movie.release_date"
        :rules="[rules.required]"
        label="Release Date"
        required
        type="date"
      />
      <VBtn
        :loading="movieStore.getLoading"
        color="primary"
        :disabled="!valid"
        @click="submit"
      >
        Create Movie
      </VBtn>
    </VForm>
  </VContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movie'; // Import the movie store
import type { MovieInput } from '@/types/movie';

const valid = ref(false);
const alert = ref({
  show: false,
  message: ''
})

const image = ref<File | null>(null);
const video = ref<File | null>(null);

const movie = ref<MovieInput>({
  title: '',
  description: '',
  image: '',
  duration: 0,
  genres: '',
  artists: '',
  release_date: '',
  url: '',
});

const rules = {
  required: (value: unknown) => !!value || 'Required.'
};

const movieStore = useMovieStore(); // Initialize the movie store

const submit = async () => {
  try {
    // const imageUrl = movie.value.image ? URL.createObjectURL(movie.value.image) : '';

    const newMovie = {
      ...movie.value,
      created_at: new Date().toISOString(), // Set the current date and time
    };
    await movieStore.createMovie(video.value, image.value, newMovie); // Call the createMovie action
    alert.value.show = true;
    alert.value.message = 'New Movie Created'
    // Optionally, redirect or reset the form after successful creation
  } catch (error) {
    alert.value.show = true;
    alert.value.message = 'Error when create movie: '+ error
    console.error('Error creating movie:', error);
  }
  reset()
};

function reset(): void {
  movie.value = {
    title: '',
    description: '',
    duration: 0,
    genres: '',
    artists: '',
    release_date: '',
    url: '',
  }

  setTimeout(() => {
    alert.value.show = false
  }, 3000)
}

</script>

