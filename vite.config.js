// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 1. IMPORT THE TAILWIND CSS VITE PLUGIN
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() // 2. ADD THE PLUGIN TO THE PLUGINS ARRAY
  ],
});