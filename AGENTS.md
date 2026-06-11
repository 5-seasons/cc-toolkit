# AGENTS.md

Agent 开发指引。用户向文档见 [README.md](README.md)。

## 脚本结构

查询脚本导出 `;({ request, extractor })` 对象字面量表达式。参考现有脚本（如 `usage-query/official/DeepSeek/index.js`），勿照搬 README 示例。

- `request`：`method` 多为 `GET`；`headers` 按平台设 `Authorization`（API Key）或 `Cookie`（Web 登录态）
- `{{apiKey}}` 运行时替换；当前脚本均硬编码 URL，`{{baseUrl}}` 为可选占位符
- Xiaomi MiMo：`Cookie: ''`，由 cc-switch 注入登录态，不接受 API Key
- `extractor(response)` 返回**单个对象**或**对象数组**（多币种 / 多资源包 / 多套餐）

## QuickJS 约束

extractor 在 QuickJS 沙箱执行，仅处理传入的 `response`：

- 支持 ES2020+（`?.`、`??` 等）
- **不支持** Node.js API（`require`、`fs` 等）
- **不支持** `toLocaleString` 的 locale 参数（等同 `toString()`，无千分位）；用 `fmtNumber` 手动格式化
- 无法访问网络或文件系统

## Extractor 字段（均可选）

`isValid`、`invalidMessage`、`remaining`、`unit`、`planName`、`total`、`used`、`extra`

## 目录与分类

- `usage-query/official/` — 平台公开 API（API Key）
- `usage-query/custom/` — 非官方 / 逆向接口（分类看接口来源，不看认证方式；MiniMax、Zhipu 也用 API Key）

命名：国际版 `-en.js`；同平台多查询类型独立文件（如 `resource-package.js`、`token-plan.js`）。

## 开发模式

1. **单套餐**：返回单个对象
2. **多币种**（DeepSeek）：遍历 `balance_infos`，返回数组
3. **资源包**（Zhipu GLM）：遍历 `rows`，仅 `status='EFFECTIVE'`，返回数组
4. **多套餐用量**（Xiaomi MiMo Token Plan）：遍历列表 + `getFilteredDataList` 过滤零余额，返回数组
5. **枚举映射**：`LABEL_MAP` 转中文标签

## 参考文件

- `usage-query/utils.js` — `fmtNumber`、`getExtraStr`、`getFilteredDataList`（各脚本内联复制，非 import）
- `usage-query/JSON_RESPONSE_EXAMPLES.js` — 各平台响应格式
- `temp/` — 本地测试（gitignore），模拟 HTTP 响应验证 extractor
