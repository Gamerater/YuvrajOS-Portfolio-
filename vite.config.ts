import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl' // Add this

export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()], // Add it to the plugins array
  base: '/YuvrajOS-Portfolio-/', 
})