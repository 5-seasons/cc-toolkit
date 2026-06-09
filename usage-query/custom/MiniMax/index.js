// MiniMax (余额) 查询脚本
// 参考官网页面: https://platform.minimaxi.com/console/recharge-records
// [请求: query_balance]
;({
  request: {
    url: 'https://www.minimaxi.com/account/query_balance',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const {
      base_resp: { status_code, status_msg },
    } = response

    if (status_code !== 0) {
      const errorMessage = `<查询失败> 状态码：${status_code}，状态信息：${status_msg}。`
      return {
        isValid: false,
        invalidMessage: errorMessage,
        planName: 'MiniMax (余额)',
        extra: errorMessage,
      }
    }

    const { available_amount, cash_balance, voucher_balance, credit_balance, owed_amount } =
      response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const remaining = Number(available_amount)
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
    const baseStr =
      `可用额度：${available_amount}。\n` +
      `现金：${cash_balance}，代金券：${voucher_balance}，授信：${credit_balance}，欠费：${owed_amount}。`

    return {
      planName: 'MiniMax (余额)',
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
