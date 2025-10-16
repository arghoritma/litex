import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import "dotenv/config";
import { resolve } from "path";
import { readdirSync } from "fs";

// Constants
const VIEWS_DIR = "resources/views";
const DEFAULT_PORT = 3000;
const PORT = parseInt(process.env.VITE_PORT) || DEFAULT_PORT;

// Generate input entries from HTML files
function generateInputEntries() {
  try {
    const files = readdirSync(VIEWS_DIR);
    return files.reduce((input, filename) => {
      const key = filename.replace(".html", "");
      input[key] = resolve(process.cwd(), `${VIEWS_DIR}/${filename}`);
      return input;
    }, {});
  } catch (error) {
    console.error(`Error reading views directory: ${error.message}`);
    return {};
  }
}

// Port error handling plugin
function createPortHandlingPlugin() {
  return {
    name: "port-handling",
    configureServer(server) {
      server.httpServer?.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(
            `\x1b[31mError: Port ${PORT} is already in use. Shutting down server.\x1b[0m`
          );
          process.exit(1);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [svelte(), createPortHandlingPlugin()],
  root: "resources",
  server: {
    host: "0.0.0.0",
    port: PORT,
    strictPort: true,
    cors: true,
    proxy: {
      // Proxy API calls to backend server
      "/api": {
        target: "http://localhost:5555",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:5555",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: generateInputEntries(),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
});
