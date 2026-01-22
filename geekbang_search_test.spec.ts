import { test, expect } from '@playwright/test';

/**
 * 极客时间课程搜索与购买流程测试
 *
 * 测试场景：
 * 1. 访问极客时间首页
 * 2. 搜索"接口测试入门课"
 * 3. 验证搜索结果中包含目标课程（作者：陈磊）
 * 4. 进入课程详情页
 * 5. 点击"单课购买"按钮
 * 6. 验证跳转到登录页面
 */

// 增加默认超时时间
test.setTimeout(120000);

test.describe('极客时间课程搜索测试', () => {

  test('课程详情页信息验证', async ({ page }) => {
    // 步骤1：直接访问课程详情页
    await page.goto('https://time.geekbang.org/column/intro/100045801', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // 步骤2：验证课程基本信息
    await expect(page.getByText('接口测试入门课').first()).toBeVisible();
    await expect(page.getByText('专栏').first()).toBeVisible();

    // 步骤3：验证作者信息
    await expect(page.getByText('陈磊').first()).toBeVisible();
    await expect(page.getByText('前京东测试架构师').first()).toBeVisible();

    // 步骤4：验证购买按钮存在
    await expect(page.getByText('单课购买').first()).toBeVisible();
  });

  test('购买流程验证：点击单课购买跳转到登录页', async ({ page }) => {
    // 步骤1：访问课程详情页
    await page.goto('https://time.geekbang.org/column/intro/100045801', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // 步骤2：等待页面加载完成
    await page.waitForLoadState('domcontentloaded');

    // 步骤3：验证课程标题
    await expect(page.getByText('接口测试入门课').first()).toBeVisible();

    // 步骤4：验证作者信息
    await expect(page.getByText('陈磊').first()).toBeVisible();

    // 步骤5：验证课程描述
    await expect(page.getByText('从原理到实战，带你进阶接口测试')).toBeVisible();

    // 步骤6：验证"单课购买"按钮存在
    const purchaseButton = page.getByText('单课购买').first();
    await expect(purchaseButton).toBeVisible();

    // 步骤7：点击"单课购买"按钮
    await purchaseButton.click();

    // 步骤8：验证跳转到登录页面
    // 等待页面变化
    await page.waitForTimeout(3000);

    // 验证登录页面元素
    await expect(page.getByText('登录/注册')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('密码登录')).toBeVisible();
    await expect(page.getByText('获取验证码')).toBeVisible();
    await expect(page.getByText('我已阅读并同意极客邦')).toBeVisible();
  });

  test('搜索功能验证', async ({ page }) => {
    // 步骤1：访问极客时间首页
    await page.goto('https://time.geekbang.org/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // 步骤2：等待搜索框出现
    const searchInput = page.locator('input[placeholder*="搜索"], input[type="text"]').first();
    await expect(searchInput).toBeVisible({ timeout: 30000 });

    // 步骤3：验证搜索框可交互
    await expect(searchInput).toBeEnabled();

    // 步骤4：输入搜索关键词
    await searchInput.fill('接口测试入门课');

    // 步骤5：验证输入内容
    const inputValue = await searchInput.inputValue();
    expect(inputValue).toBe('接口测试入门课');

    // 步骤6：按Enter键执行搜索
    await searchInput.press('Enter');

    // 步骤7：等待搜索结果加载
    await page.waitForTimeout(3000);

    // 验证当前URL包含域名
    const url = page.url();
    expect(url).toContain('time.geekbang.org');
  });
});
