// Kimi en 官方查询余额 API 文档：https://platform.kimi.ai/docs/api/balance
;({
  request: {
    url: 'https://api.moonshot.ai/v1/users/me/balance',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    // code: 响应码。0 表示成功。
    const { code, scode, status } = response

    if (code !== 0) {
      const errorMessage = `<查询失败> 响应码：${code}，状态码：${scode}，请求状态：${status}。`
      return {
        isValid: false,
        invalidMessage: errorMessage,
        planName: 'Kimi (EN)',
        extra: errorMessage,
      }
    }

    const {
      data: { available_balance, voucher_balance, cash_balance },
    } = response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const remaining = available_balance
    const total = undefined
    const used = undefined
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
    const baseStr = `可用余额：${available_balance}，代金券余额：${voucher_balance}，现金余额：${cash_balance}。`

    return {
      planName: 'Kimi (EN)',
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
