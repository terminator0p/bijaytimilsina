import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3117",
    headless: true,
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
    },
  },
  webServer: {
    command: "python3 -m http.server 3117 --directory out --bind 127.0.0.1",
    url: "http://127.0.0.1:3117",
    reuseExistingServer: !process.env.CI,
    stderr: "ignore",
  },
});
