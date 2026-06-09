// Zhipu GLM (余额) 查询脚本
// 参考官网页面: https://bigmodel.cn/finance-center/finance/overview
// [请求: query-customer-account-report]
;({
  request: {
    url: 'https://bigmodel.cn/api/biz/account/query-customer-account-report',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const { code, success, msg } = response

    if (code !== 200) {
      const errorMessage = `<查询失败> 状态码：${code}，请求成功：${success}，状态信息：${msg}。`
      return {
        isValid: false,
        invalidMessage: errorMessage,
        planName: 'Zhipu GLM (余额)',
        extra: errorMessage,
      }
    }

    const {
      data: { balance, availableBalance, rechargeAmount, giveAmount, creditBalance, creditStatus },
    } = response

    // 枚举值 → 显示标签映射
    const LABEL_MAP = {
      creditStatus: {
        NOT_OPEN: '未开通',
        ENABLE: '已开通',
        DISABLE: '已关闭',
      },
    }
    // 根据 key 查找显示标签
    const resolveLabel = (map, key) => map[key]

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const remaining = balance
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
    const baseStr =
      `当前余额：${balance}。\n` +
      `可用余额：${availableBalance}，累计充值：${rechargeAmount}，赠送金额：${giveAmount}，` +
      `信用余额：${creditBalance ?? resolveLabel(LABEL_MAP.creditStatus, creditStatus)}。`

    return {
      planName: 'Zhipu GLM (余额)',
      remaining,
      total: undefined,
      used: undefined,
      unit: 'CNY',
      isValid,
      invalidMessage,
      extra: getExtraStr(baseStr, { showResponse: true }),
    }
  },
})
