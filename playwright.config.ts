import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: process.env.TEST_BASE_URL || "http://localhost:3000", trace: "off" },
  reporter: "list",
  timeout: 60_000,
});