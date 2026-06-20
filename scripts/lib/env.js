/**
 * 加载 .env 文件到 process.env（不覆盖已有值）
 *
 * @param {string} file - .env 文件路径
 */
function loadEnv(file) {
  const fs = require('fs')
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i < 1) continue
    const k = t.slice(0, i).trim()
    let v = t.slice(i + 1).trim()
    if ((v[0] === '"' && v.at(-1) === '"') || (v[0] === "'" && v.at(-1) === "'")) v = v.slice(1, -1)
    if (!(k in process.env)) process.env[k] = v
  }
}

module.exports = { loadEnv }
