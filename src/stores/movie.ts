import { defineStore } from 'pinia'
import { supabase } from '../plugins' // Import Supabase client
import { MovieFilter, type movie, type MovieInput } from '@/types/movie' // Import movie type
import { Databases } from '@/utils/supabase';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie: null as movie | null,
    movies: [] as movie[], // Define movies using the movie type
    movieLoading: false, // Define loading state for movie
    movieAllLoaded: false // Flag to indicate if all movies have been loaded
  }),
  getters: {
    getMovie: (state) => state.movie, // Getter to retrieve movies
    getMovies: (state) => state.movies, // Getter to retrieve movies
    getLoading: (state) => state.movieLoading, // Getter to check loading state
    getMovieAllLoaded: (state) => state.movieAllLoaded, // Getter to check if all movies are loaded
  },
  actions: {
    async fetchMovie({ id }: { id: string }) {
      this.movieLoading = true
      const query = supabase.from(Databases.MOVIES).select('*').eq('id', id).range(0, 0);

      const { data, error } = await query;
      if (error) throw error;
      this.movieLoading = false

      this.movie = data[0]
    },
    /**
     * Fetch movies from the Supabase database with optional filters.
     * @param {Object} params - Parameters for fetching movies.
     * @param {string} params.search - Search term for filtering movies by title.
     * @param {number} params.page - Current page for pagination.
     * @param {number} params.limit - Number of movies to fetch per page.
     * @param {MovieFilter} params.order - Order by which to sort movies.
     * @param {boolean} params.reset - Flag to reset the movie list.
     */
    async fetchMovies({ search = "", page = 1, limit = 8, order = MovieFilter.LAST_UPDATE, reset = false }) {
      let query = supabase.from(Databases.MOVIES).select('*').range((page - 1) * limit, page * limit - 1);
      let orderBy = 'id';
      this.movieLoading = true

      // Filter by title if provided
      if (search && search !== '') {
        query = query.ilike('title', `%${search}%`);
      }

      if (order === MovieFilter.MOST_RATED) {
        orderBy = 'rating'
      } else if (order === MovieFilter.MOST_VIEWED) {
        orderBy = 'view_count'
      }

      query.order(orderBy, { ascending: false })

      const { data, error } = await query;
      if (error) throw error;
      this.movieLoading = false

      if (this.movies.length <= 0 || reset) {
        this.movies = data || [];
      } else {
        this.movies = this.movies.concat(data || [])
      }

      if (data && data.length <= 0) this.movieAllLoaded = true
    },

    /**
     * Create a new movie in the Supabase database.
     * @param {movie} movieData - The movie data to be created.
     */
    async createMovie(videoFile: File | null, imageFile: File | null, movieData: MovieInput) {
      this.movieLoading = true

      try {

        if (imageFile) {
          const imageUrl = await upload(imageFile, 'image')
          movieData.image = imageUrl
        } else {
          throw new Error('No file provided')
        }

        // Upload Video
        if (videoFile) {
          const videoUrl = await upload(videoFile, 'video')
          movieData.url = videoUrl
        } else {
          throw new Error('No file provided')
        }
        const { data, error } = await supabase.from(Databases.MOVIES).insert([movieData]);
        if (error) throw error;
        this.movieLoading = false
        if (data) this.movies.push(data[0]); // Add new movie to the state
      } catch (error) {
        throw error
      }
      // Upload Video
    },

    /**
     * Update an existing movie in the Supabase database.
     * @param {string} movieId - The ID of the movie to update.
     * @param {Partial<movie>} updatedData - The updated movie data.
     */
    async updateMovie(videoFile: File | null, imageFile: File | null, movieId: string, updatedData: Partial<movie>) {
      this.movieLoading = true

      if (imageFile) {
        const imageUrl = await upload(imageFile, 'image')
        updatedData.image = imageUrl
      }
      // Upload Video
      if (videoFile) {
        const videoUrl = await upload(videoFile, 'video')
        updatedData.url = videoUrl
      }

      const { error } = await supabase.from(Databases.MOVIES).update(updatedData).eq('id', movieId).select();
      if (error) throw error;
      const index = this.movies.findIndex(movie => movie.id === movieId);
      if (index !== -1) {
        this.movies[index] = { ...this.movies[index], ...updatedData }; // Update movie in the state
      }
      this.movieLoading = false
    },

    /**
     * Delete a movie from the Supabase database.
     * @param {string} movieId - The ID of the movie to delete.
     */
    async deleteMovie(movieId: string) {
      const { error } = await supabase.from(Databases.MOVIES).delete().eq('id', movieId);
      if (error) throw error;
      this.movies = this.movies.filter(movie => movie.id !== movieId); // Remove movie from the state
    },
  },
});


async function upload(file: File, type: 'video' | 'image' = 'video'): Promise<string> {

  const fileName = file.name.split('.')[0] + '-' + new Date().toISOString();
  const ext = file.name.split('.')[1];
  const path = `${type}s/${fileName}-${ext}`;

  console.log(path)

  try {
    const uploadResponse = await supabase.storage.from('movies').upload(path, file, { cacheControl: '3600', upsert: false })
    const retriveFileResponse = getPublicUrlFile(uploadResponse.data?.path)
    return retriveFileResponse
  } catch (error) {
    throw error
  }
}

function getPublicUrlFile(fileData?: string | null): string {
  if (!fileData) {
    throw new Error('File Path not provided')
  } else {
    const response = supabase.storage.from('movies').getPublicUrl(fileData)

    return response.data.publicUrl
  }

}
