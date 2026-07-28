# CC Toolkit

[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=for-the-badge&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/5-seasons/cc-toolkit)

[//]: # '[![zread](./assets/badges/for-the-badge.svg "cc-toolkit")](https://zread.ai/5-seasons/cc-toolkit)'

Conjunto de herramientas de consulta de uso de servicios de IA, diseñado para consultar rápidamente el saldo de la cuenta y el uso de paquetes de recursos de múltiples plataformas de IA. Los scripts están escritos como expresiones literales de objetos JavaScript, cargados y ejecutados por [cc-switch](https://github.com/farion1231/cc-switch) en un entorno sandbox de QuickJS.

## Plataformas Soportadas

### Interfaces Oficiales (Autenticación por API Key)

| Plataforma                                                                                     | Contenido de la Consulta                     | Unidad      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| [DeepSeek](https://api-docs.deepseek.com/zh-cn/api/get-user-balance)                           | Saldo de la cuenta (soporta multimoneda)     | CNY / USD   |
| [Kimi](https://platform.kimi.com/docs/api/balance)                                             | Saldo disponible, cupones, saldo en efectivo | CNY         |
| [Kimi (EN)](https://platform.kimi.ai/docs/api/balance)                                         | Saldo disponible, cupones, saldo en efectivo (Versión Int.) | USD         |
| [SiliconFlow](https://docs.siliconflow.com/cn/api-reference/userinfo/get-user-info)           | Saldo total, saldo restante                | CNY         |
| [SiliconFlow (EN)](https://docs.siliconflow.com/en/api-reference/userinfo/get-user-info)       | Saldo total, saldo restante (Versión Int.) | USD         |
| [OpenRouter](https://openrouter.ai/docs/api/api-reference/credits/get-credits)                  | Saldo de créditos, uso                      | USD         |
| [Novita AI](https://novita.ai/docs/api-reference/basic-get-user-balance)                        | Saldo disponible, efectivo, línea de crédito | USD         |
| [StepFun](https://platform.stepfun.com/docs/zh/api-reference/accounts/get)                       | Saldo disponible, regalos, recargas        | CNY         |
| [StepFun (EN)](https://platform.stepfun.ai/docs/en/api-reference/accounts/get)               | Saldo disponible, regalos, recargas (Versión Int.) | USD         |

### Interfaces Personalizadas

| Plataforma                                                                                 | Contenido de la Consulta                  | Método de Autenticación |
| ------------------------------------------------------------------------------------------ | ------------------------------------------- | ----------------------- |
| [MiniMax](https://platform.minimaxi.com/console/recharge-records)                          | Cuota disponible, efectivo, cupones, crédito | API Key                 |
| [Xiaomi MiMo](https://platform.xiaomimimo.com/console/balance)                              | Saldo, saldo de regalo, saldo en efectivo   | Cookie                  |
| [Xiaomi MiMo Token Plan](https://platform.xiaomimimo.com/console/plan-manage)                 | Uso de cuota de plan, puntos de compensación | Cookie                  |
| [Zhipu GLM](https://bigmodel.cn/finance-center/finance/overview)                           | Saldo actual, saldo disponible, saldo de crédito | API Key                 |
| [Zhipu GLM 资源包](https://bigmodel.cn/finance-center/resource-package/package-mgmt)        | Total/Usado/Restante de paquete de recursos, fecha de expiración | API Key                 |
| [PackyAPI](https://www.packyapi.com/console)                                                 | Saldo de la cuenta, cuota restante/usada | Cookie                  |

## Estructura del Proyecto

```
scripts/                                # Scripts auxiliares de desarrollo local (Node.js 18+)
├── fetch.js                            # Consulta de saldo (carga script de plataforma + solicitud + salida formateada)
└── raw-fetch.js                        # Herramienta de depuración fetch simple (alternativa ligera a curl)
.node-version                           # Bloqueo de versión de Node.js
.env                                    # Configuración predeterminada no sensible (PLATFORM, URL), se sube a git
.env.example                            # Plantilla de configuración sensible (API_KEY, COOKIE), copiar a .env.local

src/
├── usage-query/
│   ├── official/                       # Scripts de consulta de API oficial
│   │   ├── DeepSeek/index.js
│   │   ├── Kimi/
│   │   │   ├── index.js                # Versión nacional
│   │   │   └── index-en.js             # Versión internacional
│   │   ├── Novita-AI/index.js
│   │   ├── OpenRouter/index.js
│   │   ├── SiliconFlow/
│   │   │   ├── index.js                # Versión nacional
│   │   │   └── index-en.js             # Versión internacional
│   │   └── StepFun/
│   │       ├── index.js                # Versión nacional
│   │       └── index-en.js             # Versión internacional
│   ├── custom/                         # Scripts de consulta de interfaces no oficiales / ingeniería inversa
│   │   ├── MiniMax/index.js
│   │   ├── PackyAPI/index.js           # Saldo
│   │   ├── Xiaomi-MiMo/
│   │   │   ├── index.js                # Saldo
│   │   │   └── token-plan.js           # Uso de plan
│   │   └── Zhipu-GLM/
│   │       ├── index.js                # Saldo
│   │       └── resource-package.js     # Paquete de recursos
│   ├── utils.js                        # Plantilla de funciones de utilidad (implementadas inline en cada script)
│   └── JSON_RESPONSE_EXAMPLES.js       # Ejemplos de formato de respuesta de cada plataforma
└── fetch-models/
    └── JSON_RESPONSE_EXAMPLES.js       # Ejemplos de formato de respuesta de lista de modelos
```

## Consulta Local

El proyecto proporciona dos scripts de Node.js para consultar el saldo localmente sin necesidad de cc-switch:

```bash
# Primer uso: configurar claves
cp .env.example .env.local
# Editar .env.local, completar API_KEY=sk-xxx (o COOKIE=xxx)

# Consultar saldo (lee PLATFORM de .env + API_KEY de .env.local)
node scripts/fetch.js

# Especificar plataforma
node scripts/fetch.js DeepSeek
node scripts/fetch.js Kimi --key=sk-xxx

# Depuración fetch simple (pasar URL directamente)
node scripts/raw-fetch.js https://api.deepseek.com/user/balance -k sk-xxx
```

Prioridad de configuración: Parámetros CLI > `.env.local` > `.env`. Para más detalles, vea `node scripts/fetch.js -h`.

## Especificaciones del Script

Cada script de consulta exporta un objeto (debe estar envuelto en `()`), que contiene los campos `request` y `extractor`:

```js
;({
  request: {
    url: 'https://api.example.com/v1/balance',
    method: 'GET',
    headers: {
      Authorization: 'Bearer {{apiKey}}',
      'User-Agent': 'cc-switch/1.0',
    },
  },
  extractor(response) {
    // Analiza la respuesta, devuelve un objeto de plan único o un array de objetos de plan (todos los campos son opcionales)
    return {
      planName: 'Nombre del Plan',
      remaining: 100,
      total: 200,
      used: 100,
      unit: 'CNY',
      isValid: true,
      invalidMessage: undefined,
      extra: 'Cadena de información detallada',
    }
  },
})
```

- `{{apiKey}}` se reemplazará automáticamente en tiempo de ejecución; la mayoría de los scripts usan URLs hardcodeadas, `{{baseUrl}}` es un marcador de posición opcional.
- Para la autenticación por Cookie (Xiaomi MiMo), se establece `Cookie` en `request.headers`, inyectado por cc-switch mediante el estado de inicio de sesión web.
- `extractor` puede devolver un **objeto único** (un solo plan) o un **array de objetos** (múltiples monedas, múltiples paquetes de recursos, múltiples planes).
- `extractor` se ejecuta en el sandbox de QuickJS, soporta sintaxis ES2020+ y no soporta la API de Node.js.

Para detalles de desarrollo (funciones de utilidad, modo de desarrollo, convenciones de nomenclatura, métodos de prueba), consulte [CLAUDE.md](CLAUDE.md).

## Star History

<a href="https://www.star-history.com/?repos=5-seasons%2Fcc-toolkit&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&theme=dark&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ" />
 </picture>
</a>

[//]: # '[![Star History Chart](https://api.star-history.com/chart?repos=5-seasons/cc-toolkit&type=date&legend=top-left&sealed_token=-TBeFjComdn8Jy8uchCCu9Vjryufy7pRUn--ISXiFn26ellWVDpHb5s7fPd37jALrCvEhd8hMRAFLZoy2zFJ4NrZsFvBf4Na5vbj_m_2SaWMGgEQWAk8retDRSt2nAlBllEIAf8e7ewb0IzjOfzoAVpHZZl09bOPlgoLbI6i_oSzTN2MNTQOtPUss1kQ)](https://www.star-history.com/?repos=5-seasons%2Fcc-toolkit&type=date&legend=top-left)'

## License

[MIT](LICENSE) © 5-seasons
