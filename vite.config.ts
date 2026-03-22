import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const isDev = process.env.NODE_ENV !== "production";

// Dev-only Manus plugins (loaded lazily to avoid import errors in production)
async function getDevPlugins() {
  if (!isDev) return [];
  try {
    const { jsxLocPlugin } = await import("@builder.io/vite-plugin-jsx-loc");
    const { vitePluginManusRuntime } = await import("vite-plugin-manus-runtime");
    return [jsxLocPlugin(), vitePluginManusRuntime()];
  } catch {
    return [];
  }
}

export default defineConfig(async () => ({
  plugins: [
    react(),
    tailwindcss(),
    ...(await getDevPlugins()),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
      // Production domain - add your .ru domain here:
      // "your-domain.ru",
      // "www.your-domain.ru",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
