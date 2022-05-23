import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
  },
  publicDir: path.resolve(__dirname, "public"),
});
