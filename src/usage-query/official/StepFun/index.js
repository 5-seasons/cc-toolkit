// StepFun 官方查询余额 API 文档：https://platform.stepfun.com/docs/zh/api-reference/accounts/get
;({
  request: {
    url: 'https://api.stepfun.com/v1/accounts',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const { balance, total_voucher_balance, total_cash_balance } = response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const remaining = balance
    const total = undefined
    const used = undefined
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
    const baseStr = `可用余额：${balance}，总赠送金额：${total_voucher_balance}，总充值金额：${total_cash_balance}。`

    return {
      planName: 'StepFun',
      remaining,
      total,
      used,
      unit: 'CNY',
      isValid,
      invalidMessage,
      extra: getExtraStr(baseStr, { showResponse: true }),
    }
  },
})
