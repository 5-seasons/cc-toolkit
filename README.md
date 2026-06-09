# CC Toolkit

AI 服务用量查询工具集，用于快速查询多家 AI 平台的账户余额和资源包使用情况。

## 支持的平台

### 官方接口（API Key 认证）

| 平台 | 查询内容 | 单位 |
|------|---------|------|
| [DeepSeek](https://api-docs.deepseek.com/zh-cn/api/get-user-balance) | 账户余额（支持多币种） | CNY / USD |
| [Kimi](https://platform.kimi.com/docs/api/balance) | 可用余额、代金券、现金余额 | CNY |
| [SiliconFlow](https://docs.siliconflow.com/cn/api-reference/userinfo/get-user-info) | 总余额、剩余金额 | CNY |
| [OpenRouter](https://openrouter.ai/docs/api/api-reference/credits/get-credits) | 积分余额、使用量 | USD |
| [Novita AI](https://novita.ai/docs/api-reference/basic-get-user-balance) | 可用余额、现金、信用额度 | USD |
| [StepFun](https://platform.stepfun.com/docs/zh/api-reference/accounts/get) | 可用余额、赠送、充值金额 | CNY |

### 自定义接口

| 平台 | 查询内容 | 认证方式 |
|------|---------|---------|
| [MiniMax](https://platform.minimaxi.com/console/recharge-records) | 可用额度、现金、代金券、授信 | API Key |
| [Xiaomi MiMo](https://platform.xiaomimimo.com/console/balance) | 余额、赠送余额、现金余额 | Cookie |
| [Xiaomi MiMo Token Plan](https://platform.xiaomimimo.com/console/plan-manage) | 套餐额度用量、补偿积分 | Cookie |
| [Zhipu GLM 余额](https://bigmodel.cn/finance-center/finance/overview) | 当前余额、可用余额、信用余额 | API Key |
| [Zhipu GLM 资源包](https://bigmodel.cn/finance-center/resource-package/package-mgmt) | 资源包总量/已用/剩余、到期时间 | API Key |

## 项目结构

```
usage-query/
├── official/           # 官方 API 接口查询脚本
│   ├── DeepSeek/
│   ├── Kimi/
│   ├── Novita-AI/
│   ├── OpenRouter/
│   ├── SiliconFlow/
│   └── StepFun/
├── custom/             # 自定义接口查询脚本
│   ├── MiniMax/
│   ├── Xiaomi-MiMo/
│   └── Zhipu-GLM/
├── utils.js            # 公共工具函数
└── JSON_RESPONSE_EXAMPLES.js  # 各平台响应格式示例
```

## 脚本规范

每个查询脚本导出一个对象，包含 `request` 和 `extractor` 两个字段：

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
    return {
      planName: '套餐名称',
      remaining: 100,       // 剩余额度
      total: 200,           // 总额度（可选）
      used: 100,            // 已用额度（可选）
      unit: 'CNY',          // 单位
      isValid: true,        // 是否有效（有余额）
      invalidMessage: undefined,
      extra: '详细信息字符串',
    }
  },
})
```

## License

[MIT](LICENSE)
