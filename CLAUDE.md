# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI 服务用量查询工具集，用于快速查询多家 AI 平台的账户余额和资源包使用情况。脚本以 JavaScript 对象字面量表达式形式编写，由 cc-switch 在 QuickJS 沙箱环境中加载并执行。

## Script Specification

所有查询脚本导出统一结构的对象（必须用 `()` 包裹，形成对象字面量表达式）：

```js
;({
  request: {
    url: '{{baseUrl}}/api/usage',
    method: 'POST',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    return {
      isValid: !response.error,
      remaining: response.balance,
      unit: 'USD',
    }
  },
})
```

**变量替换**：`{{apiKey}}` 和 `{{baseUrl}}` 会在运行时自动替换。

**执行环境**：extractor 函数在 QuickJS 沙箱环境中执行。注意事项：

- 支持 ES2020+ 语法（可选链 `?.`、空值合并 `??` 等）
- **不支持** Node.js API（如 `require`、`fs`、`path` 等）
- **不支持** `toLocaleString` 的 locale 参数（QuickJS 为最小实现，效果等同于 `toString()`，不会添加千分位逗号）
- 无法访问网络或文件系统，仅处理传入的 `response` 对象
- 需要千分位格式化时，使用手动正则替换（参考 `fmtNumber` 实现）

### Extractor 返回格式（所有字段均为可选）

| 字段             | 类型    | 说明                                         |
| ---------------- | ------- | -------------------------------------------- |
| `isValid`        | boolean | 套餐是否有效                                 |
| `invalidMessage` | string  | 失效原因说明（当 `isValid` 为 false 时显示） |
| `remaining`      | number  | 剩余额度                                     |
| `unit`           | string  | 单位（如 `"USD"`、`"CNY"`、`"tokens"`）      |
| `planName`       | string  | 套餐名称                                     |
| `total`          | number  | 总额度                                       |
| `used`           | number  | 已用额度                                     |
| `extra`          | string  | 扩展字段，可自由补充需要展示的文本           |

## Platform Classification

**官方接口 (`usage-query/official/`)** - API Key 认证：DeepSeek, Kimi, SiliconFlow, OpenRouter, Novita-AI, StepFun

**自定义接口 (`usage-query/custom/`)** - 逆向工程或非标准 API：MiniMax, Xiaomi-MiMo (Cookie 认证), Zhipu-GLM

## Utility Functions (`usage-query/utils.js`)

```js
// 格式化数字：5000000 -> "5,000,000" (默认) 或 "5M" (compact 模式)
fmtNumber(n, unit, { compact = false })

// 获取 extra 信息字符串
getExtraStr(baseStr, { showResponse = false, responseStr })

// 过滤零余额干扰项
getFilteredDataList(filterType = 0, items = usageDataList)
// filterType: 0=不过滤，1=过滤零余额（保底保留），2=严格过滤
```

这些函数为各脚本中内联实现的参考模板，新增脚本时可参考复制，避免重复编写。

## Response Format Reference

各平台原始响应格式示例保存在 `usage-query/JSON_RESPONSE_EXAMPLES.js` 中，新增脚本时可参考对应平台的响应结构。

## Development Patterns

1. **单币种简单场景**：直接返回单个套餐对象
2. **多币种场景**（DeepSeek）：遍历 balance_infos 数组生成多个套餐
3. **资源包列表场景**（Zhipu GLM 资源包）：遍历 rows 数组，只处理 status='EFFECTIVE'的条目
4. **需要预处理字段**：使用 LABEL_MAP 映射枚举值到中文标签

## File Naming Conventions

- 英文版本后缀 `-en.js`（如 `Kimi/index-en.js`）
- 同一平台的不同查询类型用独立文件（如 `Zhipu-GLM/index.js` 余额 + `Zhipu-GLM/resource-package.js` 资源包）

## Testing

测试脚本可放置于 `temp/` 目录（已 gitignore），通过模拟 HTTP 请求验证 extractor 逻辑。
