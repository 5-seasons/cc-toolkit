# CLAUDE.md

查询脚本规范见 [README.md](README.md)。本文件供开发 agent 参考，[AGENTS.md](AGENTS.md) 内容相同。

## 脚本结构

导出 `;({ request, extractor })`，参考现有脚本，勿照搬 README 示例。

- request.method 多为 GET；headers 按平台设 Authorization（API Key）或 Cookie（Web 登录态）
- `{{apiKey}}` 运行时替换；URL 硬编码，`{{baseUrl}}` 可选
- Xiaomi MiMo 用 Cookie: ''，由 cc-switch 注入，不接受 API Key
- extractor(response) 返回单对象或对象数组

## QuickJS 约束（extractor 内）

- 支持 ES2020+（?.、?? 等）
- 禁止 Node.js API（require、fs 等）
- toLocaleString 无 locale 参数（等同 toString()）；用 fmtNumber 格式化
- 无网络/文件系统访问
- 不做过多防御性错误处理：API 报错时让 extractor 自然抛异常，由调用方（cc-switch）统一捕获

## Extractor 字段（均可选）

isValid、invalidMessage、remaining、unit、planName、total、used、extra

## 目录

- src/usage-query/official/ — 平台公开 API（API Key）
- src/usage-query/custom/ — 非官方/逆向接口（按接口来源分类，非认证方式）
- 命名：国际版 -en.js；同平台多查询独立文件（resource-package.js、token-plan.js）

## 开发模式

1. 单套餐：返回单对象
2. 多币种（DeepSeek）：遍历 balance_infos，返回数组
3. 资源包（Zhipu GLM）：遍历 rows，isValid 标记 status='EFFECTIVE' 且有余额
4. 多套餐用量（Xiaomi MiMo）：遍历 + getFilteredDataList（默认不过滤）
5. 枚举映射：LABEL_MAP 转中文标签

## 参考文件

- src/usage-query/utils.js — fmtNumber、getExtraStr、getFilteredDataList（内联复制，非 import）
- src/usage-query/JSON_RESPONSE_EXAMPLES.js — 各平台响应格式
- scripts/lib/env.js — .env 加载（fetch.js / raw-fetch.js 共用）
- temp/ — 本地测试（gitignore），模拟响应验证 extractor
