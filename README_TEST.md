# 极客时间自动化测试

使用 Playwright 进行极客时间网站的课程搜索和购买流程自动化测试。

## 测试场景

1. **访问首页** - 打开极客时间首页
2. **搜索课程** - 在搜索框中输入"接口测试入门课"
3. **验证搜索结果** - 检查结果中是否包含目标课程（作者：陈磊）
4. **进入课程详情页** - 点击课程进入详情页
5. **验证课程信息** - 确认课程标题、作者、描述等信息正确
6. **点击购买按钮** - 点击"单课购买"按钮
7. **验证登录跳转** - 确认页面跳转到登录/注册页面

## 安装依赖

```bash
npm install
```

安装 Playwright 浏览器：

```bash
npx playwright install
```

## 运行测试

```bash
# 运行所有测试（无头模式）
npm test

# 有头模式运行（可以看到浏览器操作）
npm run test:headed

# 调试模式
npm run test:debug

# 只在 Chrome 浏览器运行
npm run test:chromium

# 查看测试报告
npm run test:report
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `geekbang_search_test.spec.ts` | 测试用例主文件 |
| `playwright.config.ts` | Playwright 配置文件 |
| `package.json` | 项目依赖配置 |

## 测试结果

测试运行后会在以下目录生成结果：

- `test-results/` - 测试结果、截图、录屏
- `playwright-report/` - HTML 测试报告

## 测试覆盖率

测试覆盖以下功能点：

- [x] 搜索功能
- [x] 搜索结果验证
- [x] 课程详情页访问
- [x] 课程信息展示
- [x] 购买按钮跳转
- [x] 登录页面验证
