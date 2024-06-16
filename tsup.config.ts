import { defineConfig } from "tsup";

export default defineConfig([
  // Normal build
  {
    entry: ["./src/index.ts"],
    clean: true,
    format: ["esm", "cjs"],
    minify: false,
    dts: true,
    outDir: "./dist",
  },
  // Minified build
  {
    entry: ["./src/index.ts"],
    clean: true,
    format: ["esm", "cjs"],
    minify: true,
    dts: false,
    outDir: "./dist",
    outExtension: ({ format }) => ({
      js: format === "cjs" ? ".min.cjs" : ".min.js",
    }),
  },
  // Build for web with source maps and minification
  {
    entry: ["./src/web.ts"],
    clean: true,
    format: ["iife"],
    minify: true,
    sourcemap: true,
    outDir: "./dist",
    external: ["fs", "path", "os"],
  },
]);
