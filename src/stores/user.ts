import { defineStore } from 'pinia';
import { supabase } from '../plugins'; // Import Supabase client
import type { User } from '@supabase/supabase-js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null, // Define user as User type or null
  }),
  actions: {
    async register(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      this.user = data.user; // Access user from data
    },
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      this.user = data.user; // Access user from data
    },
    async logout() {
      await supabase.auth.signOut();
      this.user = null; // Clear user on logout
    },
  },
});
