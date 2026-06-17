// DeepSeek 官方查询余额 API 文档：https://api-docs.deepseek.com/zh-cn/api/get-user-balance
;({
  request: {
    url: 'https://api.deepseek.com/user/balance',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    // is_available: 当前账户是否有余额可供 API 调用
    const { is_available, balance_infos } = response

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const usageDataList = balance_infos.map((usageData, index) => {
      const { currency, total_balance, granted_balance, topped_up_balance } = usageData

      const remaining = Number(total_balance)
      const total = undefined
      const used = undefined
      const isValid = is_available && remaining > 0
      const invalidMessage = isValid ? undefined : '余额不足（Insufficient Balance）'
      const baseStr = `总的可用余额：${total_balance}，未过期的赠金余额：${granted_balance}，充值余额：${topped_up_balance}。`

      return {
        planName: currency, // 用币种名作为套餐名，展开后显示 "💰 CNY" / "💰 USD"
        remaining,
        total,
        used,
        unit: currency,
        isValid,
        invalidMessage,
        extra: getExtraStr(baseStr, { showResponse: index === 0 }),
      }
    })

    const getFilteredDataList = (filterType = 0, items = usageDataList) => {
      // 以下四种情况直接返回原始数据数组
      if (
        filterType === 0 ||
        items.length === 0 ||
        (filterType !== 1 && filterType !== 2) ||
        (filterType === 1 && items.length === 1)
      ) {
        return items
      }

      const nonZero = items.filter((i) => i.remaining > 0)

      // filterType 1 但过滤后没有非零余额项时，保留原始数据数组以避免返回空数组
      if (filterType === 1 && nonZero.length === 0) return items

      return nonZero
    }

    return getFilteredDataList()
  },
})
