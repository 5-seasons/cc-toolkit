#!/usr/bin/env node

/**
 * 裸 fetch 调试工具 —— 轻量 curl 替代品
 *
 * 用法：node scripts/raw-fetch.js [url] [options]
 *
 * 配置优先级：CLI 参数 > .env.local > .env
 *
 * 环境变量：
 *   URL       — 请求地址
 *   API_KEY   — 自动注入 Authorization: Bearer
 *   COOKIE    — 自动注入 Cookie 头
 *
 * 选项：
 *   -X, --method <METHOD>    HTTP 方法（默认 GET）
 *   -H, --header <K:V>       请求头，可多次使用
 *   -d, --data <BODY>        请求体（自动设 Content-Type: application/json）
 *   -k, --key <API_KEY>      等同于 -H "Authorization: Bearer <API_KEY>"
 *   -c, --cookie <COOKIE>    等同于 -H "Cookie: <COOKIE>"
 *   -r, --raw                不格式化，输出原始响应文本
 *
 * 示例：
 *   node scripts/raw-fetch.js                                        # 读 .env 的 URL + .env.local 的 API_KEY
 *   node scripts/raw-fetch.js https://api.deepseek.com/user/balance -k sk-xxx
 *   node scripts/raw-fetch.js https://api.example.com/data -c "session=xxx"
 *   node scripts/raw-fetch.js https://api.example.com/chat -X POST -k sk-xxx -d '{"model":"gpt-4"}'
 */

const fs = require('fs')
const path = require('path')

// ── .env 加载 ──────────────────────────────────────────────
const { loadEnv } = require('./lib/env')

loadEnv(path.join(__dirname, '..', '.env'))
loadEnv(path.join(__dirname, '..', '.env.local'))

const args = process.argv.slice(2)

// ── ANSI ───────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', cyan: '\x1b[36m',
}

// ── 参数解析（CLI > env）───────────────────────────────────
let url = ''
let method = 'GET'
let headers = {}
let body = null
let raw = false

for (let i = 0; i < args.length; i++) {
  const arg = args[i]

  if (arg === '-X' || arg === '--method') {
    method = args[++i]?.toUpperCase() || 'GET'
  } else if (arg === '-H' || arg === '--header') {
    const h = args[++i] || ''
    const ci = h.indexOf(':')
    if (ci > 0) headers[h.slice(0, ci).trim()] = h.slice(ci + 1).trim()
  } else if (arg === '-d' || arg === '--data') {
    body = args[++i] || ''
    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = 'application/json'
  } else if (arg === '-k' || arg === '--key') {
    const v = args[++i] || ''
    if (v) headers['Authorization'] = `Bearer ${v}`
  } else if (arg === '-c' || arg === '--cookie') {
    const v = args[++i] || ''
    if (v) headers['Cookie'] = v
  } else if (arg === '-r' || arg === '--raw') {
    raw = true
  } else if (arg === '-h' || arg === '--help') {
    printHelp(); process.exit(0)
  } else if (!arg.startsWith('-') && !url) {
    url = arg
  }
}

// env 回退（CLI 未显式指定时生效）
if (!url) url = process.env.URL || ''
if (!headers['Authorization'] && process.env.API_KEY) {
  headers['Authorization'] = `Bearer ${process.env.API_KEY}`
}
if (!headers['Cookie'] && !headers['cookie'] && process.env.COOKIE) {
  headers['Cookie'] = process.env.COOKIE
}

// ── 帮助 ───────────────────────────────────────────────────
function printHelp() {
  console.log(`
${c.bold}raw-fetch${c.reset} — 轻量 HTTP 调试工具

${c.bold}用法:${c.reset}
  node scripts/raw-fetch.js [url] [options]

${c.bold}选项:${c.reset}
  -X, --method <METHOD>    HTTP 方法（默认 GET）
  -H, --header <K:V>       请求头，可多次使用
  -d, --data <BODY>        请求体（自动设 Content-Type: application/json）
  -k, --key <API_KEY>      等同于 -H "Authorization: Bearer <API_KEY>"
  -c, --cookie <COOKIE>    等同于 -H "Cookie: <COOKIE>"
  -r, --raw                输出原始响应文本
  -h, --help               显示帮助

${c.bold}配置文件（项目根目录，已 gitignore 的不提交）:${c.reset}
  .env        非敏感默认值（URL 等），提交到 git
  .env.local  API Key / Cookie 等密钥，不提交

${c.bold}优先级:${c.reset} CLI 参数 > .env.local > .env

${c.bold}快速开始:${c.reset}
  ${c.dim}# 1. 配置密钥（仅首次）${c.reset}
  cp .env.example .env.local
  ${c.dim}# 编辑 .env.local，填入 API_KEY=sk-xxx${c.reset}

  ${c.dim}# 2. 在 .env 中配置默认 URL（可选）${c.reset}
  ${c.dim}# URL=https://api.deepseek.com/user/balance${c.reset}

  ${c.dim}# 3. 直接运行${c.reset}
  node scripts/raw-fetch.js                    ${c.dim}# 读 .env 的 URL + .env.local 的 API_KEY${c.reset}

${c.bold}典型用法:${c.reset}
  ${c.dim}# 查询余额（API Key 认证）${c.reset}
  node scripts/raw-fetch.js https://api.deepseek.com/user/balance -k sk-xxx
  node scripts/raw-fetch.js https://api.siliconflow.cn/v1/user/info -k sk-xxx

  ${c.dim}# 查询余额（Cookie 认证）${c.reset}
  node scripts/raw-fetch.js https://platform.xiaomimimo.com/api/v1/balance \\
    -c "session=xxx; token=xxx"

  ${c.dim}# POST 请求${c.reset}
  node scripts/raw-fetch.js https://api.deepseek.com/chat/completions -X POST \\
    -k sk-xxx -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"hi"}]}'

  ${c.dim}# 多个自定义请求头${c.reset}
  node scripts/raw-fetch.js https://api.example.com/v1/data \\
    -H "Authorization: Bearer sk-xxx" \\
    -H "X-Custom-Header: value"

  ${c.dim}# 原始响应（不格式化 JSON）${c.reset}
  node scripts/raw-fetch.js https://api.example.com/health -r
`)
}

if (!url) { printHelp(); process.exit(0) }

// ── 工具函数 ───────────────────────────────────────────────
function mask(s) {
  return s.length <= 16 ? s.slice(0, 4) + '****' : s.slice(0, 8) + '****' + s.slice(-4)
}

// ── 发送请求 ───────────────────────────────────────────────
async function main() {
  console.log(`${c.dim}${method} ${url}${c.reset}`)
  for (const [k, v] of Object.entries(headers)) {
    const sensitive = k.toLowerCase() === 'authorization' || k.toLowerCase() === 'cookie'
    console.log(`${c.dim}  ${k}: ${sensitive ? mask(v) : v}${c.reset}`)
  }
  if (body) console.log(`${c.dim}  body: ${body.length > 200 ? body.slice(0, 200) + '...' : body}${c.reset}`)
  console.log()

  const t0 = Date.now()
  const res = await fetch(url, {
    method, headers,
    body: body && method !== 'GET' && method !== 'HEAD' ? body : undefined,
  })
  const ms = Date.now() - t0
  const text = await res.text()

  const sc = res.ok ? c.green : c.red
  console.log(`${sc}${c.bold}${res.status}${c.reset} ${sc}${res.statusText}${c.reset}  ${c.dim}${ms}ms${c.reset}`)
  for (const [k, v] of res.headers) console.log(`${c.dim}  ${k}: ${v}${c.reset}`)
  console.log()

  if (raw) { console.log(text); return }
  try { console.log(JSON.stringify(JSON.parse(text), null, 2)) }
  catch { console.log(text) }
}

main().catch((err) => { console.error(`${c.red}${err.message}${c.reset}`); process.exit(1) })
