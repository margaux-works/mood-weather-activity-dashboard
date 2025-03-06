import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/mood-weather-activity-dashboard/',
  define: {
    'import.meta.env.VITE_WEATHER_API_KEY': JSON.stringify(
      process.env.VITE_WEATHER_API_KEY || ''
    ),
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(
      process.env.VITE_OPENAI_API_KEY || ''
    ),
  },
});
