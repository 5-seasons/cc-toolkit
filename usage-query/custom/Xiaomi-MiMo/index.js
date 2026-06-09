// Xiaomi MiMo 余额查询脚本
// 参考官网页面: https://platform.xiaomimimo.com/console/balance
// [请求: balance]
// ！！！需要 Web 登录态（Cookie），不接受 API Key
;({
  request: {
    url: 'https://platform.xiaomimimo.com/api/v1/balance',
    method: 'GET',
    headers: {
      Cookie: '',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const { code, message } = response

    if (code !== 0) {
      const errorMessage = `<查询失败> 状态码：${code}，状态信息：${message}。`
      return {
        isValid: false,
        invalidMessage: errorMessage,
        planName: 'Xiaomi MiMo',
        extra: errorMessage,
      }
    }

    const {
      data: { currency, balance, giftBalance, cashBalance },
    } = response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const remaining = Number(balance)
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
    const baseStr = `余额：${balance}，赠送余额：${giftBalance}，现金余额：${cashBalance}，`

    return {
      planName: 'Xiaomi MiMo',
      remaining,
      total: undefined,
      used: undefined,
      unit: currency,
      isValid,
      invalidMessage,
      extra: getExtraStr(baseStr, { showResponse: true }),
    }
  },
})
