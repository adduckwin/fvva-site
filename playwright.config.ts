import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  use: {
    baseURL: "http://127.0.0.1:4189",
    channel: process.env.PLAYWRIGHT_CHANNEL,
    viewport: { width: 390, height: 844 },
  },
  webServer: {
    command: "HOST=127.0.0.1 PORT=4189 tsx server/index.ts",
    url: "http://127.0.0.1:4189",
  },
});
