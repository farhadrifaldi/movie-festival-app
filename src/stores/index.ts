// Utilities
import { createPinia, defineStore } from 'pinia'
import { supabase } from '../plugins' // Import Supabase client
import type { User } from '@supabase/supabase-js'
import type { movie } from '../types/movie' // Import movie type

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as User | null, // Define user as User type or null
    movies: [] as movie[], // Define movies using the movie type
  }),
  getters: {
    getMovies: (state) => state.movies,
    getUser: (state) => state.user,
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
    async fetchMovies(title: string = '') {
      let query = supabase.from('Movies').select('*');
      if (title && title !== '') {
        query = query.ilike('title', `%${title}%`); // Filter by title if provided
      }
      const { data, error } = await query;
      if (error) throw error;
      this.movies = data || []; // As
      // sign fetched movies, default to empty array if null
    },
    async createMovie(movieData: movie) {
      const { data, error } = await supabase.from('movies').insert([movieData]);
      if (error) throw error;
      if (data) this.movies.push(data[0]); // Add new movie to the state
    },
    async updateMovie(movieId: string, updatedData: Partial<movie>) {
      const { error } = await supabase.from('movies').update(updatedData).eq('id', movieId);
      if (error) throw error;
      const index = this.movies.findIndex(movie => movie.id === movieId);
      if (index !== -1) {
        this.movies[index] = { ...this.movies[index], ...updatedData }; // Update movie in the state
      }
    },
    async deleteMovie(movieId: string) {
      const { error } = await supabase.from('movies').delete().eq('id', movieId);
      if (error) throw error;
      this.movies = this.movies.filter(movie => movie.id !== movieId); // Remove movie from the state
    },
  },
});

export default createPinia();
