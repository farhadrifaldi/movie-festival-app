import { createPinia } from 'pinia';
import { useUserStore } from './user'; // Import the user store

export const useAppStore = useUserStore; // Export the user store

export * from './movie'

export default createPinia();
