import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [EnvironmentPlugin('all'), react()],

  preview: {
    host: true,
    port: 5173,
  },
});
