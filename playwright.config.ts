import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  use: {
    baseURL: "http://127.0.0.1:4189",
    channel: process.env.PLAYWRIGHT_CHANNEL,
    viewport: { width: 390, height: 844 },
  },
  webServer: {
    command: "vite preview --host 127.0.0.1 --port 4189 --strictPort",
    url: "http://127.0.0.1:4189",
  },
});
