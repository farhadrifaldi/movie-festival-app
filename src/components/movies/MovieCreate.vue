<template>
  <VContainer>
    <VAlert
      v-if="alert.show"
      icon="mdi-check"
      :text="alert.message"
      :color="alert.type"
    />
    <h1 class="d-flex align-center mb-5">
      <RouterLink :to="{name:'/admin/movie/'}">
        <VIcon icon="mdi-chevron-left" />
      </RouterLink>
      {{ movieStore.getMovie ? 'Edit Movie' : 'Create Movie' }}
    </h1>
    <VForm
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <VFileInput
        v-model="video"
        :rules="movieStore.getMovie?.url?undefined:[rules.required]"
        label="Movie File"
        required
        accept="video/*"
      />
      <div class="mb-4">
        <a
          :href="movieStore.getMovie?.url "
        >{{ movieStore.getMovie?.url }}</a>
      </div>
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
        :rules="movieStore.getMovie?.url?undefined:[rules.required]"
        label="Thumbnail"
        required
        accept="image/*"
      />
      <div class="mb-4">
        <a
          :href="movieStore.getMovie?.image"
        >{{ movieStore.getMovie?.image }}</a>
      </div>
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
        {{ movieStore.getMovie ? 'Update Movie' : 'Create Movie' }}
      </VBtn>
    </VForm>
  </VContainer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useMovieStore } from '@/stores/movie';
import type { MovieInput } from '@/types/movie';

const props = defineProps<{
  id?: string
}>();

const valid = ref(false);

const alert = ref<{
  show: boolean,
  message: string,
  type: 'success'| 'warning'
}>({show: false, message: '', type: 'success'});

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

const movieStore = useMovieStore();

onMounted((): void => {
  if(props.id){
    movieStore.fetchMovie({id: props.id});
  }
})

// Populate the form with existing movie data if available
watch(() => movieStore.getMovie, (newData) => {
  if (newData) {
    movie.value = {
      title: newData.title,
      artists: newData.artists,
       description: newData.description,
       duration: newData.duration,
       genres: newData.genres,
       image: newData.image,
       release_date: newData.release_date?? new Date().toISOString(),
       url: newData.url
    };
  }
});

const rules = {
  required: (value: unknown) => !!value || 'Required.'
};



const submit = async () => {
  try {
    if (movieStore.getMovie) {
      await movieStore.updateMovie(video.value, image.value,movieStore.getMovie.id?? '', movie.value); // Call the updateMovie action
      alert.value.message = 'Movie Updated';
    } else {
      const newMovie = {
        ...movie.value,
        created_at: new Date().toISOString(),
      };
      await movieStore.createMovie(video.value, image.value, newMovie);
      alert.value.message = 'New Movie Created';
      alert.value.type = 'success'
      reset();
    }
    alert.value.show = true;
  } catch (error) {
    alert.value.show = true;
    alert.value.type = 'warning'
    alert.value.message = 'Error when saving movie: ' + error;
    console.error('Error saving movie:', error);
  }

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
  };

  setTimeout(() => {
    alert.value.show = false;
  }, 3000);
}
</script>
