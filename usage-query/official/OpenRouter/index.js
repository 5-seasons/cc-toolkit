// OpenRouter 官方查询余额 API 文档：https://openrouter.ai/docs/api/api-reference/credits/get-credits
;({
  request: {
    url: 'https://openrouter.ai/api/v1/credits',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const {
      data: { total_credits, total_usage },
    } = response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const remaining = total_credits - total_usage
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '积分不足（No credits remaining）'
    const baseStr = `总积分：${total_credits}，总使用量：${total_usage}。`

    return {
      planName: 'OpenRouter',
      remaining,
      total: total_credits,
      used: total_usage,
      unit: 'USD',
      isValid,
      invalidMessage,
      extra: getExtraStr(baseStr, { showResponse: true }),
    }
  },
})
