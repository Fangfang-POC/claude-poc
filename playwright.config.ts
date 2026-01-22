import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 测试配置文件
 *
 * 运行测试命令：
 * - npx playwright test              // 运行所有测试（无头模式）
 * - npx playwright test --headed     // 有头模式运行（可以看到浏览器）
 * - npx playwright test --debug      // 调试模式
 * - npx playwright test --project=chromium // 只在Chrome运行
 */
export default defineConfig({
  testDir: './',
  testMatch: '**/*.spec.ts',

  /* 测试超时时间（毫秒） */
  timeout: 60 * 1000,

  /* 期望超时时间 */
  expect: {
    timeout: 10 * 1000,
  },

  /* 失败时重试 */
  retries: process.env.CI ? 2 : 0,

  /* 并行执行 */
  workers: process.env.CI ? 1 : undefined,

  /* 测试报告配置 */
  reporter: [
    ['html'],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  /* 共享配置 */
  use: {
    /* 基础 URL */
    baseURL: 'https://time.geekbang.org',

    /* 浏览器上下文选项 */
    trace: 'retain-on-failure',    // 失败时保留追踪
    screenshot: 'only-on-failure',  // 失败时截图
    video: 'retain-on-failure',     // 失败时录屏
  },

  /* 不同浏览器配置 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* 开发服务器（如果需要） */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
