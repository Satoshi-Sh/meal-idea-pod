import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This enables listening on all addresses
    port: 5173, // Default Vite port, change if needed
  },
  base: "/meal-idea-pod/",
});
