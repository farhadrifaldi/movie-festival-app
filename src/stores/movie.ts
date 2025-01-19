import { defineStore } from 'pinia'
import { supabase } from '../plugins' // Import Supabase client
import { MovieFilter, type movie } from '@/types/movie' // Import movie type

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as movie[], // Define movies using the movie type
    movieLoading: false, // Define loading state for movie
    movieAllLoaded: false // Flag to indicate if all movies have been loaded
  }),
  getters: {
    getMovies: (state) => state.movies, // Getter to retrieve movies
    getLoading: (state) => state.movieLoading, // Getter to check loading state
    getMovieAllLoaded: (state) => state.movieAllLoaded, // Getter to check if all movies are loaded
  },
  actions: {
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
      let query = supabase.from('Movies').select('*').range((page - 1) * limit, page * limit - 1);
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
    async createMovie(movieData: movie) {
      this.movieLoading = true
      const { data, error } = await supabase.from('movies').insert([movieData]);
      if (error) throw error;
      this.movieLoading = false
      if (data) this.movies.push(data[0]); // Add new movie to the state
    },

    /**
     * Update an existing movie in the Supabase database.
     * @param {string} movieId - The ID of the movie to update.
     * @param {Partial<movie>} updatedData - The updated movie data.
     */
    async updateMovie(movieId: string, updatedData: Partial<movie>) {
      this.movieLoading = true
      const { error } = await supabase.from('movies').update(updatedData).eq('id', movieId);
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
      const { error } = await supabase.from('movies').delete().eq('id', movieId);
      if (error) throw error;
      this.movies = this.movies.filter(movie => movie.id !== movieId); // Remove movie from the state
    },
  },
});
