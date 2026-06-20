#!/usr/bin/env node

/**
 * 余额查询辅助脚本
 *
 * 用法：node scripts/fetch.js [platform] [apiKey]
 *
 * 配置优先级：CLI 参数 > .env.local > .env
 *
 * 环境变量：
 *   PLATFORM  — 平台名（如 DeepSeek、Kimi、xiaomi-mimo）
 *   API_KEY   — API Key
 *   COOKIE    — Cookie 字符串（Xiaomi MiMo 等）
 *
 * 示例：
 *   node scripts/fetch.js                  # 读 .env 的 PLATFORM + .env.local 的 API_KEY
 *   node scripts/fetch.js DeepSeek         # CLI 指定平台，读 .env.local 的 API_KEY
 *   node scripts/fetch.js Kimi sk-xxx      # 全部 CLI 指定
 *   node scripts/fetch.js MiniMax --key=sk-xxx
 *   node scripts/fetch.js xiaomi-mimo      # 自动读 .env.local 的 COOKIE
 */

const fs = require('fs')
const path = require('path')

// ── .env 加载 ──────────────────────────────────────────────
const { loadEnv } = require('./lib/env')

loadEnv(path.join(__dirname, '..', '.env'))
loadEnv(path.join(__dirname, '..', '.env.local'))

// ── ANSI ───────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', cyan: '\x1b[36m',
}

// ── 平台注册表 ─────────────────────────────────────────────
const PLATFORMS = {
  'deepseek':            'official/DeepSeek/index.js',
  'kimi':                'official/Kimi/index.js',
  'kimi-en':             'official/Kimi/index-en.js',
  'siliconflow':         'official/SiliconFlow/index.js',
  'siliconflow-en':      'official/SiliconFlow/index-en.js',
  'openrouter':          'official/OpenRouter/index.js',
  'novita':              'official/Novita-AI/index.js',
  'novita-ai':           'official/Novita-AI/index.js',
  'stepfun':             'official/StepFun/index.js',
  'minimax':             'custom/MiniMax/index.js',
  'xiaomi-mimo':         'custom/Xiaomi-MiMo/index.js',
  'xiaomi-mimo-plan':    'custom/Xiaomi-MiMo/token-plan.js',
  'zhipu':               'custom/Zhipu-GLM/index.js',
  'zhipu-glm':           'custom/Zhipu-GLM/index.js',
  'zhipu-resource':      'custom/Zhipu-GLM/resource-package.js',
}

// ── 参数解析（CLI > env）───────────────────────────────────
const args = process.argv.slice(2)
let platform = ''
let apiKey = ''
let cookie = ''

for (const arg of args) {
  if (arg.startsWith('--key='))      apiKey = arg.slice(6)
  else if (arg.startsWith('--cookie=')) cookie = arg.slice(9)
  else if (arg === '-h' || arg === '--help') { printHelp(); process.exit(0) }
  else if (!platform) platform = arg
  else if (!apiKey) apiKey = arg
}

// env 回退（CLI 未显式指定时生效）
if (!platform) platform = process.env.PLATFORM || ''
if (!apiKey) apiKey = process.env.API_KEY || ''
if (!cookie) cookie = process.env.COOKIE || ''

// ── 加载查询脚本 ───────────────────────────────────────────
function loadScript(scriptPath) {
  const code = fs.readFileSync(scriptPath, 'utf-8')
  let utils = ''
  try { utils = fs.readFileSync(path.join(__dirname, '..', 'src', 'usage-query', 'utils.js'), 'utf-8') } catch {}

  const idx = code.indexOf('({')
  if (idx === -1) throw new Error('脚本中未找到对象字面量 ({...})')

  return new Function(`${utils}\nreturn (${code.slice(idx)})`)()
}

// ── 发送请求 ───────────────────────────────────────────────
async function sendRequest(request, apiKey, cookie) {
  const { url, method = 'GET', headers: rawHeaders = {}, body } = request
  const resolvedUrl = url.replace(/\{\{apiKey\}\}/g, apiKey).replace(/\{\{baseUrl\}\}/g, '')

  const headers = {}
  for (const [k, v] of Object.entries(rawHeaders)) {
    headers[k] = String(v).replace(/\{\{apiKey\}\}/g, apiKey).replace(/\{\{baseUrl\}\}/g, '')
  }
  if (cookie) headers['Cookie'] = cookie

  const opts = { method, headers }
  if (body) opts.body = typeof body === 'string' ? body : JSON.stringify(body)

  const res = await fetch(resolvedUrl, opts)
  const json = await res.json()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`)
  return json
}

// ── 格式化输出 ─────────────────────────────────────────────
function formatResult(dataList) {
  const items = Array.isArray(dataList) ? dataList : [dataList]

  console.log()
  console.log(`${c.bold}查询结果${c.reset}`)
  console.log(c.dim + '─'.repeat(50) + c.reset)

  for (const item of items) {
    const { planName, remaining, total, used, unit, isValid, invalidMessage, extra } = item
    const tag = isValid ? `${c.green}✓ 有效${c.reset}` : `${c.red}✗ 无效${c.reset}`

    console.log()
    console.log(`  ${c.bold}${c.cyan}${planName || '(未命名)'}${c.reset}  ${tag}`)
    if (invalidMessage && !isValid) console.log(`  ${c.red}${invalidMessage}${c.reset}`)
    if (remaining != null) console.log(`  剩余：${c.bold}${fmtNum(remaining)}${c.reset} ${unit || ''}`)
    if (total != null) console.log(`  总量：${fmtNum(total)} ${unit || ''}`)
    if (used != null) console.log(`  已用：${fmtNum(used)} ${unit || ''}`)
    if (extra) console.log(`  ${c.dim}${extra}${c.reset}`)
  }

  console.log()
  console.log(c.dim + '─'.repeat(50) + c.reset)
  console.log(`${c.dim}共 ${items.length} 项${c.reset}\n`)
}

function fmtNum(n) {
  if (typeof n !== 'number' || isNaN(n)) return String(n)
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  // 保留两位小数（去掉末尾多余的 0），加千分位
  const s = Number(abs.toFixed(2)).toString()
  const [int, dec] = s.split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return sign + formatted + (dec ? '.' + dec : '')
}

// ── 帮助 ───────────────────────────────────────────────────
function printHelp() {
  console.log(`
${c.bold}余额查询${c.reset}

${c.bold}用法:${c.reset}
  node scripts/fetch.js [platform] [apiKey]

${c.bold}环境变量:${c.reset}
  PLATFORM    平台名（如 DeepSeek、Kimi、xiaomi-mimo）
  API_KEY     API Key
  COOKIE      Cookie（Xiaomi MiMo 等）

${c.bold}选项:${c.reset}
  --key=<API_KEY>          等同于第二个位置参数
  --cookie=<COOKIE>        指定 Cookie
  -h, --help               显示帮助

${c.bold}配置文件（项目根目录，已 gitignore 的不提交）:${c.reset}
  .env        非敏感默认值，提交到 git
  .env.local  API Key / Cookie 等密钥，不提交

${c.bold}优先级:${c.reset} CLI 参数 > .env.local > .env

${c.bold}快速开始:${c.reset}
  ${c.dim}# 1. 配置密钥（仅首次）${c.reset}
  cp .env.example .env.local
  ${c.dim}# 编辑 .env.local，填入 API_KEY=sk-xxx${c.reset}

  ${c.dim}# 2. 配置默认平台（可选）${c.reset}
  ${c.dim}# 在 .env 中写入：PLATFORM=DeepSeek${c.reset}

  ${c.dim}# 3. 查询${c.reset}
  node scripts/fetch.js                ${c.dim}# 读 .env 的 PLATFORM + .env.local 的 API_KEY${c.reset}
  node scripts/fetch.js DeepSeek       ${c.dim}# CLI 指定平台，读 .env.local 的 API_KEY${c.reset}
  node scripts/fetch.js Kimi sk-xxx    ${c.dim}# 全部由 CLI 指定${c.reset}
  node scripts/fetch.js MiniMax --key=sk-xxx

${c.bold}Cookie 认证平台（Xiaomi MiMo）:${c.reset}
  ${c.dim}# .env.local 中写入 COOKIE=session=xxx; token=xxx${c.reset}
  node scripts/fetch.js xiaomi-mimo
  node scripts/fetch.js xiaomi-mimo --cookie="session=xxx; token=xxx"

${c.bold}可用平台:${c.reset}`)

  const seen = new Set()
  const official = [], custom = []
  for (const [name, p] of Object.entries(PLATFORMS)) {
    if (seen.has(p)) continue; seen.add(p)
    ;(p.startsWith('official/') ? official : custom).push({ name, p })
  }

  console.log(`\n  ${c.bold}官方接口${c.reset} (API Key)`)
  for (const { name, p } of official) console.log(`    ${c.cyan}${name.padEnd(20)}${c.reset} ${c.dim}${p}${c.reset}`)
  console.log(`\n  ${c.bold}自定义接口${c.reset}`)
  for (const { name, p } of custom) console.log(`    ${c.cyan}${name.padEnd(20)}${c.reset} ${c.dim}${p}${c.reset}`)
  console.log()
}

// ── 主流程 ─────────────────────────────────────────────────
async function main() {
  if (!platform) { printHelp(); process.exit(0) }

  const key = platform.toLowerCase()
  const scriptRelPath = PLATFORMS[key]

  if (!scriptRelPath) {
    console.error(`${c.red}未知平台: ${platform}${c.reset}`)
    console.error(`${c.dim}运行不带参数查看可用平台列表${c.reset}`)
    process.exit(1)
  }

  const scriptFullPath = path.join(__dirname, '..', 'src', 'usage-query', scriptRelPath)
  if (!fs.existsSync(scriptFullPath)) {
    console.error(`${c.red}脚本文件不存在: ${scriptFullPath}${c.reset}`)
    process.exit(1)
  }

  const needsCookie = scriptRelPath.includes('Xiaomi-MiMo')
  if (!needsCookie && !apiKey) {
    console.error(`${c.red}缺少 API Key${c.reset}`)
    console.error(`  在项目根目录 .env.local 写入 API_KEY=sk-xxx`)
    console.error(`  或: node scripts/fetch.js ${platform} <apiKey>`)
    process.exit(1)
  }
  if (needsCookie && !cookie) {
    console.error(`${c.red}缺少 Cookie${c.reset}`)
    console.error(`  在项目根目录 .env.local 写入 COOKIE=your_cookie`)
    process.exit(1)
  }

  console.log(`${c.dim}加载脚本: ${scriptRelPath}${c.reset}`)

  let script
  try { script = loadScript(scriptFullPath) }
  catch (err) { console.error(`${c.red}加载脚本失败: ${err.message}${c.reset}`); process.exit(1) }

  const { request, extractor } = script
  if (!request || !extractor) {
    console.error(`${c.red}脚本格式错误: 缺少 request 或 extractor${c.reset}`)
    process.exit(1)
  }

  console.log(`${c.dim}请求: ${request.method || 'GET'} ${(request.url || '').split('?')[0]}${c.reset}`)

  let response
  try { response = await sendRequest(request, apiKey, cookie) }
  catch (err) { console.error(`${c.red}请求失败: ${err.message}${c.reset}`); process.exit(1) }

  let result
  try { result = extractor(response) }
  catch (err) {
    console.error(`${c.red}解析响应失败: ${err.message}${c.reset}`)
    console.error(`${c.dim}原始响应: ${JSON.stringify(response, null, 2)}${c.reset}`)
    process.exit(1)
  }

  formatResult(result)
}

main().catch((err) => { console.error(`${c.red}${err.message}${c.reset}`); process.exit(1) })
