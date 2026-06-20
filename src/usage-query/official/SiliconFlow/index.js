// SiliconFlow 官方查询余额 API 文档：https://docs.siliconflow.com/cn/api-reference/userinfo/get-user-info
;({
  request: {
    url: 'https://api.siliconflow.cn/v1/user/info',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const { code, status, message } = response

    if (code !== 20000) {
      const errorMessage = `<查询失败> 状态码：${code}，请求状态：${status}，状态信息：${message}。`
      return {
        isValid: false,
        invalidMessage: errorMessage,
        planName: 'SiliconFlow',
        extra: errorMessage,
      }
    }

    const {
      data: { totalBalance, chargeBalance, balance },
    } = response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const remaining = Number(totalBalance)
    const total = undefined
    const used = undefined
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
    const baseStr = `总余额：${totalBalance}，剩余金额：${chargeBalance}，余额：${balance}。`

    return {
      planName: 'SiliconFlow',
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
