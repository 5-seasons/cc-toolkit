/**
 * 获取额外信息字符串
 *
 * @remarks 默认依赖外层 extractor 的 `response` 参数，若传入 responseStr 则使用传入值
 *
 * @param {string} [baseStr] - 基础额外信息字符串
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.showResponse=false] - 是否追加原始 JSON 响应
 * @param {string} [options.responseStr] - 原始 JSON 响应字符串，不传则自动序列化 response 对象
 *
 * @returns {string|undefined} 拼接后的完整字符串或 undefined
 *
 * @example
 * // 默认行为：不显示额外信息
 * getExtraStr()                                                // undefined
 *
 * // 显示自定义额外信息
 * getExtraStr(customExtraStr)                                  // "总的可用余额：10.5，..."
 *
 * // 显示原始 JSON 响应
 * getExtraStr(undefined, { showResponse: true })               // "原始 JSON 响应：\n{...}"
 *
 * // 显示自定义额外信息 + 原始 JSON 响应
 * getExtraStr(customExtraStr, { showResponse: true })          // "总的可用余额：10.5，...\n原始 JSON 响应：\n{...}"
 *
 * // 典型用法：仅第一条套餐显示原始 JSON 响应
 * getExtraStr(customExtraStr, { showResponse: index === 0 })
 */
const getExtraStr = (baseStr, { showResponse = false, responseStr } = {}) => {
  if (!showResponse) return baseStr

  const responsePart = responseStr ?? `原始 JSON 响应：\n${JSON.stringify(response, null, 4)}`

  return baseStr ? `${baseStr}\n${responsePart}` : responsePart
}

/**
 * 过滤零余额干扰项，默认不过滤。
 *
 * @remarks 默认依赖外层 usageDataList 变量，若传入 items 参数则使用传入值
 *
 * @param {number} [filterType=0] - 过滤类型 -
 *   0: 不过滤
 *   1: 过滤零余额项（若原始数据仅有一条或过滤后为空则保留原数据）
 *   2: 严格过滤所有零余额条目
 * @param {Array} [items=usageDataList] - 原始数据数组，默认依赖 usageDataList
 *
 * @returns {Array} 过滤后的数据数组
 */
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

/**
 * 数量格式化
 *
 * @remarks QuickJS 的 toLocaleString 是最小实现，不支持 locale 参数，效果等于 toString()，不会加逗号。
 * 因此使用 toString 方法并手动添加千分位分隔符（逗号），而非 Math.round(n).toLocaleString('en-US')。
 *
 * @param {number} n - 待格式化的数值（number 的简写）
 * @param {string} [u] - 单位（unit 的简写，因脚本返回字段已含 unit，入参简写避免视觉重复），如 'CNY'、'USD'、'tokens'、'Credits'；为空则不追加
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.compact=false] - 是否使用缩写模式（K/M/B）
 *
 * @returns {string} 格式化后的字符串
 *
 * @example
 * // 默认模式：逗号分隔
 * fmtNumber(5000000, 'tokens')                                  // "5,000,000 tokens"
 * fmtNumber(5000000)                                            // "5,000,000"
 * fmtNumber(-1234.5, 'CNY')                                     // "-1,235 CNY"
 *
 * // compact 模式：缩写
 * fmtNumber(5000000, 'tokens', { compact: true })               // "5M tokens"
 * fmtNumber(1500000, undefined, { compact: true })              // "1.5M"
 * fmtNumber(999, 'tokens', { compact: true })                   // "999 tokens"
 * fmtNumber(1200000000, undefined, { compact: true })           // "1.2B"
 */
const fmtNumber = (n, u, { compact = false } = {}) => {
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

  return sign + value + (u ? ` ${u}` : '')
}
