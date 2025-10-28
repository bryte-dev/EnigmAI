import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron/simple";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: { entry: "electron/main.ts" },
      preload: { input: { preload: "electron/preload.ts" } },
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true, 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
