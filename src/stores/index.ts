// Utilities
import { createPinia, defineStore } from 'pinia'
import { supabase } from '../plugins' // Import Supabase client
import type { User } from '@supabase/supabase-js'
import type { movie } from '../types/movie' // Import movie type

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as User | null, // Define user as User type or null
    movies: [] as movie[], // Define movies using the movie type
    movieLoading: false, // define loading state for movie
    movieAllLoaded: false
  }),
  getters: {
    getMovies: (state) => state.movies,
    getUser: (state) => state.user,
    getLoading: (state) => state.movieLoading,
    getMovieAllLoaded: (state) => state.movieAllLoaded,
  },
  actions: {
    async register(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      this.user = data.user; // Access user from data
    },
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // Correct method for sign-in
      if (error) throw error;
      this.user = data.user; // Access user from data
    },
    async fetchMovies({ search = "", page = 1, limit = 8 }: { search?: string; page?: number; limit?: number }) {
      let query = supabase.from('Movies').select('*').range((page - 1) * limit, page * limit - 1);
      // let query = supabase.from('Movies').select('*').range(0, 9);
      this.movieLoading = true
      if (search && search !== '') {
        query = query.ilike('title', `%${search}%`); // Filter by title if provided
      }
      const { data, error } = await query;
      if (error) throw error;
      this.movieLoading = false

      if (this.movies.length > 0) {
        this.movies = this.movies.concat(data || [])
      } else {
        this.movies = data || [];
      }

      if (data && data.length <= 0) this.movieAllLoaded = true
      // sign fetched movies, default to empty array if null
    },
    async createMovie(movieData: movie) {
      this.movieLoading = true
      const { data, error } = await supabase.from('movies').insert([movieData]);
      if (error) throw error;
      this.movieLoading = false
      if (data) this.movies.push(data[0]); // Add new movie to the state
    },
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
    async deleteMovie(movieId: string) {
      const { error } = await supabase.from('movies').delete().eq('id', movieId);
      if (error) throw error;
      this.movies = this.movies.filter(movie => movie.id !== movieId); // Remove movie from the state
    },
  },
});

export default createPinia();
