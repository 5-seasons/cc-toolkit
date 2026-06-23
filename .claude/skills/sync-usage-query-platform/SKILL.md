---
name: 'sync-usage-query-platform'
description: '新增或修改用量查询平台脚本时，检查需同步更新的所有位置。当用户新增平台脚本（含国际版 -en）、添加平台注册项、或审查平台脚本更改时调用。'
---

# 同步用量查询平台更改

当新增或修改 `src/usage-query/` 下的平台查询脚本时，必须同步更新以下 5 个位置，缺一不可。本 skill 用作检查清单。

## 触发场景

- 新增平台查询脚本（含国内版 / 国际版 `-en`）
- 为已有平台新增第二个查询文件（如 `resource-package.js`、`token-plan.js`）
- 审查涉及平台脚本的暂存更改 / PR

## 同步检查清单

### 1. 脚本文件本身

- 路径：`src/usage-query/official/<Platform>/index.js`（官方 API）或 `src/usage-query/custom/<Platform>/index.js`（非官方/逆向）
- 命名约定：
  - 国际版加 `-en` 后缀，如 `index-en.js`
  - 同平台多查询独立文件，如 `resource-package.js`、`token-plan.js`
- 规范参考 [CLAUDE.md](../../../CLAUDE.md)：导出 `;({ request, extractor })`、`getExtraStr` 等工具函数内联复制（非 import）、URL 硬编码、`{{apiKey}}` 运行时替换

### 2. `scripts/fetch.js` — PLATFORMS 注册表

在 `PLATFORMS` 对象中添加 `'平台名小写': 'official/Platform/index.js'` 映射。

- 平台名大小写不敏感（fetch.js 内部已 `toLowerCase`）
- 可添加多个别名指向同一脚本，如 `'novita'` 与 `'novita-ai'`

### 3. `README.md`

- **"支持的平台"表格**：添加平台行，包含文档链接、查询内容、单位（CNY/USD/Credits 等）
- **"项目结构"目录树**：在 `src/usage-query/official/` 或 `custom/` 下添加脚本文件条目，并标注"国内版 / 国际版"注释

### 4. `.env` 与 `.env.example` — 平台列表注释

在两个文件的"官方接口"或"自定义接口"注释行中追加新平台名（与现有命名风格一致，如 `StepFun StepFun-EN`）。

- `.env`：非敏感默认配置，提交到 git
- `.env.example`：敏感配置模板，复制为 `.env.local` 使用

### 5. `src/usage-query/JSON_RESPONSE_EXAMPLES.js` — 响应示例

添加该平台 API 的 JSON 响应格式示例（用 `response = { ... }` 赋值形式），覆盖典型场景（有余额 / 零余额 / 多币种等）。

## 验证方法

完成同步后，可本地验证：

```bash
# 加载脚本并查询（需 .env.local 配置 API_KEY）
node scripts/fetch.js <platform>

# 查看帮助确认平台已注册
node scripts/fetch.js -h

# 检查所有提及该平台的文件是否都已同步
grep -rn "平台名" --include="*.js" --include="*.md" --include=".env*"
```

## 常见遗漏

- 只新增脚本文件，忘记注册到 `fetch.js` 的 `PLATFORMS`
- 更新了 `README.md` 表格，忘记更新目录树
- 只改 `.env` 忘记改 `.env.example`（或反之）
- 国际版脚本 unit 未改为 `USD`（国内版多为 `CNY`）

## 实际案例参考

以下为已有的同步案例，可供新增平台时对照：

- **StepFun + StepFun-EN**（[`dbc628c`](https://github.com/5-seasons/cc-toolkit/commit/dbc628cc909be921629c81776a7a62c70ce6aa7f)）：国内版/国际版双版本，仅 URL 域名、unit、planName 不同，5 个文件同步更新
- **Xiaomi MiMo**：Cookie 认证，多文件（余额 + 套餐用量）
- **Zhipu GLM**：API Key 认证，多文件（余额 + 资源包）
