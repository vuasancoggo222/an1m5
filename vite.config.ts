import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";
import { vite as vidstack } from 'vidstack/plugins';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("media-"),
        },
      },
    }),
    vidstack(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
