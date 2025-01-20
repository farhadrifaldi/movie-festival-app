import { defineStore } from 'pinia';
import { supabase } from '../plugins'; // Import Supabase client
import type { User } from '@supabase/supabase-js';

const storage = localStorage.getItem('user');
const ADMIN_EMAIL = 'admin@admin.com';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: storage ? JSON.parse(storage) : null as User | null, // Define user as User type or null
  }),
  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => Boolean(state.user),
    getIsAdmin: (state) => state.user?.email === ADMIN_EMAIL,
  },
  actions: {
    async register(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      this.user = data.user; // Access user from data
    },
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.log('ini error')
        throw error;
      }

      this.user = data.user; // Access user from data
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(data.user));
    },
    async logout() {
      await supabase.auth.signOut();
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});
