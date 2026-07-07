// PackyAPI 余额查询脚本
// 参考官网页面: https://www.packyapi.com/console
// [请求: self]
// ！！！ 需要 Web 登录态（Cookie），不接受 API Key
// ！！！ New API 规范，需要 New-Api-User 头，值为用户 ID
;({
  request: {
    url: '{{baseUrl}}/api/user/self',
    method: 'GET',
    // prettier-ignore
    headers: {
      // 'New-Api-User': '{{userId}}',
      'New-Api-User': '202626', // 202626 为测试用户 ID，实际使用时请替换为真实用户 ID
      Cookie:
      ''
      ,
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const { success, message } = response

    if (!success) {
      const errorMessage = `<查询失败> 状态信息：${message}。`
      return {
        isValid: false,
        invalidMessage: errorMessage,
        planName: 'PackyAPI',
        extra: errorMessage,
      }
    }

    const {
      data: { username, group, request_count, quota, used_quota },
    } = response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    // New API 框架 quota 单位：1 美元 = 500000 额度单位
    const quotaUnit = 500000
    const remaining = Number(quota) / quotaUnit
    const used = Number(used_quota) / quotaUnit
    const total = remaining + used
    const isValid = remaining > 0
    const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
    const baseStr = `用户：${username}，分组：${group}，请求次数：${request_count}`

    return {
      planName: 'PackyAPI',
      remaining,
      total,
      used,
      unit: 'USD',
      isValid,
      invalidMessage,
      extra: getExtraStr(baseStr),
    }
  },
})
