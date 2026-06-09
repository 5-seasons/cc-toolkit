// Zhipu GLM (资源包) 查询脚本
// 参考官网页面: https://bigmodel.cn/finance-center/resource-package/package-mgmt
// [请求: my?pageNum=1&pageSize=10&filterEnabled=false]
;({
  request: {
    url: `https://bigmodel.cn/api/biz/tokenAccounts/list/my?${Object.entries({
      pageNum: 1,
      pageSize: 10,
      filterEnabled: false,
    })
      .map(([k, v]) => `${k}=${v}`)
      .join('&')}`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    const { code, msg } = response

    if (code !== 200) {
      const errorMessage = `<查询失败> 状态码：${code}，状态信息：${msg}。`
      return {
        isValid: false,
        invalidMessage: errorMessage,
        planName: 'Zhipu GLM (资源包)',
        extra: errorMessage,
      }
    }

    const { rows, total: totalPackageCount = 0 } = response

    // 数量格式化：5000000 -> 默认逗号分隔（5,000,000 tokens），compact 模式缩写（5M tokens）
    // QuickJS 的 toLocaleString —— 它是个最小实现，不支持 locale 参数，效果等于 toString()，不会加逗号。
    // Math.round(n).toLocaleString('en-US')
    // 使用 toString 方法并手动添加千分位分隔符（逗号）
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

    // 时间格式化： 2026-08-05T23:59:54 -> 2026-08-05 23:59:54
    const fmtTime = (t) => (t ? t.replace('T', ' ') : '无')

    // 枚举值 → 显示标签映射
    const LABEL_MAP = {
      consumeType: { TIMES: '次', TOKENS: 'tokens' },
      tokenPurpose: { PRIVATE_INSTANCE: '算力单元' },
      type: {
        pay: '付费',
        give: '赠送',
      },
      status: {
        EFFECTIVE: '生效中',
        NOTUSED: '待使用',
        EXPIRED: '已失效',
        CANCELLED: '已退订',
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
      const {
        tokenBalance,
        availableBalance,
        tokensMagnitude,
        consumeType,
        tokenPurpose,
        resourcePackageName,
        type,
        status,
        suitableScene,
        purchaseTime,
        effectiveTime,
        packageExpirationTime,
      } = usageData

      const remaining = availableBalance
      const total = tokensMagnitude
      const used = tokensMagnitude - remaining
      const unit =
        resolveLabel(LABEL_MAP.consumeType, consumeType) ??
        resolveLabel(LABEL_MAP.tokenPurpose, tokenPurpose)
      const isValid = status === 'EFFECTIVE' && remaining > 0
      const invalidMessage = isValid ? undefined : '资源包已失效或生效中但已用尽'
      const baseStr =
        `总：${fmtNumber(total, unit, { compact: true })} | ` +
        `已使用：${fmtNumber(used, unit, { compact: true })} | ` +
        `剩余：${fmtNumber(remaining, unit, { compact: true })}。\n` +
        `资源包总数：${totalPackageCount}。\n` +
        `资源包名称：${resourcePackageName}；\n` +
        `资源包类型：${resolveLabel(LABEL_MAP.type, type)}；\n` +
        `资源包状态：${resolveLabel(LABEL_MAP.status, status)}；\n` +
        `适用场景：${suitableScene}；\n` +
        `当前余额：${fmtNumber(tokenBalance, unit)}；\n` +
        `当前可用余额：${fmtNumber(availableBalance, unit)}；\n` +
        `购买时间：${fmtTime(purchaseTime)}；\n` +
        `生效时间：${fmtTime(effectiveTime)}；\n` +
        `到期时间：${fmtTime(packageExpirationTime)}。`

      return {
        planName: resourcePackageName,
        remaining,
        total,
        used,
        unit,
        isValid,
        invalidMessage,
        extra: getExtraStr(baseStr),
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
