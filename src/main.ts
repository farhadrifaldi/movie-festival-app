/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from './plugins'
import { createApp } from 'vue'
import App from './App.vue'

// Create Vue app
const app = createApp(App)

// Register plugins
registerPlugins(app)

// Mount the app
app.mount('#app')
