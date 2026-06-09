// Xiaomi MiMo Token Plan 用量查询脚本
// 参考官网页面: https://platform.xiaomimimo.com/console/plan-manage
// [请求: usage]
// ！！！需要 Web 登录态（Cookie），不接受 API Key
;({
  request: {
    url: 'https://platform.xiaomimimo.com/api/v1/tokenPlan/usage',
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
        planName: 'Xiaomi MiMo Token Plan',
        extra: errorMessage,
      }
    }

    const rows = response?.data?.usage?.items || []

    const fmtNumber = (n, unit, { compact = false } = {}) => {
      const abs = Math.abs(n)
      const sign = n < 0 ? '-' : ''
      let value
      if (compact) {
        if (abs >= 1e9) value = (abs / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'
        else if (abs >= 1e6) value = (abs / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
        else if (abs >= 1e3) value = (abs / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
        else value = String(Math.round(abs))
      } else {
        value = Math.round(abs)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return sign + value + (unit ? ` ${unit}` : '')
    }

    // 枚举值 → 显示标签映射
    const LABEL_MAP = {
      name: {
        plan_total_token: 'Max 月度套餐', // 可以填自己的套餐名称，这里填的是 Max 月度套餐，根据实际情况修改
        compensation_total_token: '补偿积分',
      },
    }
    // 根据 key 查找显示标签
    const resolveLabel = (map, key) => map[key]

    const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
      if (!showResponse) return baseStr

      const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

      return baseStr ? `${baseStr}\n${responsePart}` : responsePart
    }

    const usageDataList = rows.map((usageData, index) => {
      const { limit, name, percent, used } = usageData

      const remaining = limit - used
      const total = limit
      const unit = 'Credits'
      const isValid = remaining > 0
      const invalidMessage = isValid
        ? undefined
        : '套餐额度已耗尽或已过期（Plan Expired or Depleted）'
      const baseStr =
        `总：${fmtNumber(total, undefined, { compact: true })} | ` +
        `已使用：${fmtNumber(used, undefined, { compact: true })} | ` +
        `剩余：${fmtNumber(remaining, undefined, { compact: true })}。\n` +
        `${fmtNumber(used)} / ${fmtNumber(total)}   ${name === 'compensation_total_token' ? '补偿积分' : ''}已使用 ${percent.toFixed(1)}%`

      return {
        planName: resolveLabel(LABEL_MAP.name, name) ?? name,
        remaining,
        total,
        used,
        unit,
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
