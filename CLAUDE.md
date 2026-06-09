# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI 服务用量查询工具集，用于快速查询多家 AI 平台的账户余额和资源包使用情况。脚本以 Node.js 模块形式导出，被 cc-switch 应用加载执行。

## Script Specification

所有查询脚本导出统一结构的对象：

```js
;({
  request: {
    url: 'https://api.example.com/balance',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    // 解析响应，返回标准化的用量数据
    return [/* 一个或多个套餐对象 */]
  },
})
```

Extractor 返回的每个套餐对象格式：
- `planName`: 套餐名称（必需）
- `remaining`: 剩余额度（必需）
- `total`: 总额度（可选）
- `used`: 已用额度（可选）
- `unit`: 单位如 'CNY' / 'USD' / 'tokens'（必需）
- `isValid`: 是否有效（有余额）（必需）
- `invalidMessage`: 无效时的错误消息（可选）
- `extra`: 额外详细信息字符串（可选）

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

这些函数可在 extractor 中复用，避免重复实现。

## Response Format Reference

各平台原始响应格式示例保存在 `usage-query/JSON_RESPONSE_EXAMPLES.js` 中，新增脚本时可参考对应平台的响应结构。

## Development Patterns

1. **单币种简单场景**：直接返回单个套餐对象
2. **多币种场景**（DeepSeek）：遍历 balance_infos 数组生成多个套餐
3. **资源包列表场景**（Zhipu GLM 资源包）：遍历 rows 数组，只处理 status='EFFECTIVE'的条目
4. **需要预处理字段**：使用 LABEL_MAP 映射枚举值到中文标签

## File Naming Conventions

- 英文版本后缀 `-en.js`（如 `Kimi/index-en.js`）
- 同一平台的不同查询类型用独立文件（如 `Zhipu-GLM/index.js` 余额 + `index-resource-package.js` 资源包）

## Testing

测试脚本位于 `temp/` 目录，通过模拟 HTTP 请求验证 extractor 逻辑。
