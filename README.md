# CC Toolkit

[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=for-the-badge&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/5-seasons/cc-toolkit)

[//]: # '[![zread](./assets/badges/for-the-badge.svg "cc-toolkit")](https://zread.ai/5-seasons/cc-toolkit)'

AI 服务用量查询工具集，用于快速查询多家 AI 平台的账户余额和资源包使用情况。脚本以 JavaScript 对象字面量表达式形式编写，由 [cc-switch](https://github.com/farion1231/cc-switch) 在 QuickJS 沙箱环境中加载并执行。

## 支持的平台

### 官方接口（API Key 认证）

| 平台                                                                                     | 查询内容                             | 单位      |
| ---------------------------------------------------------------------------------------- | ------------------------------------ | --------- |
| [DeepSeek](https://api-docs.deepseek.com/zh-cn/api/get-user-balance)                     | 账户余额（支持多币种）               | CNY / USD |
| [Kimi](https://platform.kimi.com/docs/api/balance)                                       | 可用余额、代金券、现金余额           | CNY       |
| [Kimi (EN)](https://platform.kimi.ai/docs/api/balance)                                   | 可用余额、代金券、现金余额（国际版） | USD       |
| [SiliconFlow](https://docs.siliconflow.com/cn/api-reference/userinfo/get-user-info)      | 总余额、剩余金额                     | CNY       |
| [SiliconFlow (EN)](https://docs.siliconflow.com/en/api-reference/userinfo/get-user-info) | 总余额、剩余金额（国际版）           | USD       |
| [OpenRouter](https://openrouter.ai/docs/api/api-reference/credits/get-credits)           | 积分余额、使用量                     | USD       |
| [Novita AI](https://novita.ai/docs/api-reference/basic-get-user-balance)                 | 可用余额、现金、信用额度             | USD       |
| [StepFun](https://platform.stepfun.com/docs/zh/api-reference/accounts/get)               | 可用余额、赠送、充值金额             | CNY       |
| [StepFun (EN)](https://platform.stepfun.ai/docs/en/api-reference/accounts/get)           | 可用余额、赠送、充值金额（国际版）   | USD       |

### 自定义接口

| 平台                                                                                 | 查询内容                       | 认证方式 |
| ------------------------------------------------------------------------------------ | ------------------------------ | -------- |
| [MiniMax](https://platform.minimaxi.com/console/recharge-records)                    | 可用额度、现金、代金券、授信   | API Key  |
| [Xiaomi MiMo](https://platform.xiaomimimo.com/console/balance)                       | 余额、赠送余额、现金余额       | Cookie   |
| [Xiaomi MiMo Token Plan](https://platform.xiaomimimo.com/console/plan-manage)        | 套餐额度用量、补偿积分         | Cookie   |
| [Zhipu GLM](https://bigmodel.cn/finance-center/finance/overview)                     | 当前余额、可用余额、信用余额   | API Key  |
| [Zhipu GLM 资源包](https://bigmodel.cn/finance-center/resource-package/package-mgmt) | 资源包总量/已用/剩余、到期时间 | API Key  |
| [PackyAPI](https://www.packyapi.com/console)                                         | 账户余额、剩余/已用额度        | Cookie   |

## 项目结构

```
scripts/                                # 本地开发辅助脚本（Node.js 18+）
├── fetch.js                            # 余额查询（加载平台脚本 + 发请求 + 格式化输出）
└── raw-fetch.js                        # 裸 fetch 调试工具（轻量 curl 替代品）
.node-version                           # Node.js 版本锁定
.env                                    # 非敏感默认配置（PLATFORM、URL），提交到 git
.env.example                            # 敏感配置模板（API_KEY、COOKIE），复制为 .env.local 使用

src/
├── usage-query/
│   ├── official/                       # 官方 API 接口查询脚本
│   │   ├── DeepSeek/index.js
│   │   ├── Kimi/
│   │   │   ├── index.js                # 国内版
│   │   │   └── index-en.js             # 国际版
│   │   ├── Novita-AI/index.js
│   │   ├── OpenRouter/index.js
│   │   ├── SiliconFlow/
│   │   │   ├── index.js                # 国内版
│   │   │   └── index-en.js             # 国际版
│   │   └── StepFun/
│   │       ├── index.js                # 国内版
│   │       └── index-en.js             # 国际版
│   ├── custom/                         # 非官方 / 逆向工程接口查询脚本
│   │   ├── MiniMax/index.js
│   │   ├── PackyAPI/index.js           # 余额
│   │   ├── Xiaomi-MiMo/
│   │   │   ├── index.js                # 余额
│   │   │   └── token-plan.js           # 套餐用量
│   │   └── Zhipu-GLM/
│   │       ├── index.js                # 余额
│   │       └── resource-package.js     # 资源包
│   ├── utils.js                        # 工具函数参考模板（各脚本内联实现）
│   └── JSON_RESPONSE_EXAMPLES.js       # 各平台响应格式示例
└── fetch-models/
    └── JSON_RESPONSE_EXAMPLES.js       # 模型列表响应格式示例
```

## 本地查询

项目提供两个 Node.js 脚本，无需 cc-switch 即可在本地直接查询余额：

```bash
# 首次使用：配置密钥
cp .env.example .env.local
# 编辑 .env.local，填入 API_KEY=sk-xxx（或 COOKIE=xxx）

# 查询余额（读 .env 的 PLATFORM + .env.local 的 API_KEY）
node scripts/fetch.js

# 指定平台
node scripts/fetch.js DeepSeek
node scripts/fetch.js Kimi --key=sk-xxx

# 裸 fetch 调试（直接传 URL）
node scripts/raw-fetch.js https://api.deepseek.com/user/balance -k sk-xxx
```

配置优先级：CLI 参数 > `.env.local` > `.env`。详见 `node scripts/fetch.js -h`。

## 脚本规范

每个查询脚本导出一个对象（必须用 `()` 包裹），包含 `request` 和 `extractor` 两个字段：

```js
;({
  request: {
    url: 'https://api.example.com/v1/balance',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    // 解析响应，返回单个套餐对象或套餐对象数组（所有字段均为可选）
    return {
      planName: '套餐名称',
      remaining: 100,
      total: 200,
      used: 100,
      unit: 'CNY',
      isValid: true,
      invalidMessage: undefined,
      extra: '详细信息字符串',
    }
  },
})
```

- `{{apiKey}}` 会在运行时自动替换；多数脚本使用硬编码 URL，`{{baseUrl}}` 为可选占位符
- Cookie 认证（Xiaomi MiMo）在 `request.headers` 中设置 `Cookie`，由 cc-switch 注入 Web 登录态
- `extractor` 可返回**单个对象**（单套餐）或**对象数组**（多币种、多资源包、多套餐）
- `extractor` 在 QuickJS 沙箱中执行，支持 ES2020+ 语法，不支持 Node.js API

开发细节（工具函数、开发模式、命名约定、测试方法）见 [CLAUDE.md](CLAUDE.md)。

## Star History

<a href="https://www.star-history.com/?repos=5-seasons%2Fcc-toolkit&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&theme=dark&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ" />
 </picture>
</a>

[//]: # '[![Star History Chart](https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ)](https://www.star-history.com/?repos=5-seasons%2Fcc-toolkit&type=date&legend=top-left)'

## License

[MIT](LICENSE) © 5-seasons
