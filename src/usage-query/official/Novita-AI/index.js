// Novita AI 官方查询余额 API 文档：https://novita.ai/docs/api-reference/basic-get-user-balance
;({
  request: {
    url: 'https://api.novita.ai/openapi/v1/billing/balance/detail',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const { availableBalance, cashBalance, creditLimit, pendingCharges, outstandingInvoices } =
      response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    // Novita 金额单位为 0.0001 USD，需除以 10000 转为 USD
    const quotaUnit = 10000
    const remaining = Number(availableBalance) / quotaUnit
    const total = undefined
    const used = undefined
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（No balance remaining）'
    const baseStr =
      `可用余额：${remaining}，` +
      `现金余额：${Number(cashBalance) / quotaUnit}，` +
      `信用额度：${Number(creditLimit) / quotaUnit}，` +
      `待费：${Number(pendingCharges) / quotaUnit}，` +
      `欠费：${Number(outstandingInvoices) / quotaUnit}。`

    return {
      planName: 'Novita AI',
      remaining,
      total,
      used,
      unit: 'USD',
      isValid,
      invalidMessage,
      extra: getExtraStr(baseStr, { showResponse: true }),
    }
  },
})
