// JSON 响应格式示例：

// DeepSeek
response = {
  is_available: true,
  balance_infos: [
    {
      currency: 'CNY',
      total_balance: '110.00',
      granted_balance: '10.00',
      topped_up_balance: '100.00',
    },
  ],
}

response = {
  is_available: false,
  balance_infos: [
    {
      currency: 'CNY',
      total_balance: '0.00',
      granted_balance: '0.00',
      topped_up_balance: '0.00',
    },
  ],
}

response = {
  is_available: true,
  balance_infos: [
    {
      currency: 'CNY',
      total_balance: '80.00',
      granted_balance: '20.00',
      topped_up_balance: '60.00',
    },
    {
      currency: 'USD',
      total_balance: '30.00',
      granted_balance: '10.00',
      topped_up_balance: '20.00',
    },
  ],
}

// Kimi
response = {
  code: 123,
  data: {
    available_balance: 49.58894,
    voucher_balance: 46.58893,
    cash_balance: 3.00001,
  },
  scode: '0x0',
  status: true,
}

response = {
  code: 0,
  data: { available_balance: 14.782941, voucher_balance: 14.782941, cash_balance: 0 },
  scode: '0x0',
  status: true,
}

// Kimi en
response = {
  code: 123,
  data: {
    available_balance: 49.58894,
    voucher_balance: 46.58893,
    cash_balance: 3.00001,
  },
  scode: '0x0',
  status: true,
}

response = {
  code: 0,
  data: { available_balance: 0, voucher_balance: 0, cash_balance: 0 },
  scode: '0x0',
  status: true,
}

// MiniMax 余额
response = {
  available_amount: '0.00',
  cash_balance: '0.00',
  voucher_balance: '0.00',
  credit_balance: '0.00',
  owed_amount: '0.00',
  balance_alert_switch: false,
  balance_alert_threshold: '',
  base_resp: { status_code: 0, status_msg: 'success' },
}

// Zhipu GLM 余额
response = {
  code: 200,
  msg: '操作成功',
  data: {
    balance: 0e-9,
    rechargeAmount: 0.0,
    giveAmount: 0.0,
    totalSpendAmount: 0e-9,
    todaySpendAmount: null,
    availableBalance: 0e-9,
    frozenBalance: 0e-9,
    creditBalance: null,
    availableCreditBalance: null,
    creditStatus: 'NOT_OPEN',
    modelSpendAmountList: null,
    isKA: false,
  },
  success: true,
}

response = {
  code: 200,
  msg: '操作成功',
  data: {
    balance: 0,
    rechargeAmount: 0,
    giveAmount: 0,
    totalSpendAmount: 0,
    todaySpendAmount: null,
    availableBalance: 0,
    frozenBalance: 0,
    creditBalance: null,
    availableCreditBalance: null,
    creditStatus: 'NOT_OPEN',
    modelSpendAmountList: null,
    isKA: false,
  },
  success: true,
}

// Zhipu GLM 资源包
response = {
  total: 6,
  rows: [
    {
      id: 27616463,
      tokenNo: 'bundle_913',
      customerId: 23851777983148590,
      tokenBalance: 5000000,
      expirationTime: '2026-06-05T23:59:54',
      purchaseTime: null,
      resourcePackageName: '【实名认证】500万GLM-4.7体验包',
      packageExpirationTime: '2026-08-05T23:59:54',
      purchaseOrderNo: '20260505e841aebf805a416d821',
      createTime: '2026-05-05T23:59:54',
      updateTime: '2026-05-05T23:59:54',
      pageNum: null,
      pageSize: null,
      status: 'EFFECTIVE',
      type: 'give',
      effectiveTime: '2026-05-05T23:59:54',
      usageType: 1,
      grantNo: null,
      tokensMagnitude: 5000000,
      suitableModel: 'glm-4.7',
      availableBalance: 5000000,
      frozenBalance: 0,
      suitableScene: '适用于glm-4.7模型的推理',
      consumeType: 'TOKENS',
      tokenPurpose: 'COMMON_MODEL_INFERENCE',
      filterEnabled: null,
    },
    {
      id: 27607970,
      tokenNo: 'bundle_933',
      customerId: 23851777983148590,
      tokenBalance: 20,
      expirationTime: '2026-08-05T20:12:29',
      purchaseTime: null,
      resourcePackageName: '【新用户专享】20次图片/视频生成资源包',
      packageExpirationTime: '2026-08-05T20:12:29',
      purchaseOrderNo: '2026050520bdbbb7bd5a441eb98',
      createTime: '2026-05-05T20:12:29',
      updateTime: '2026-05-05T20:12:29',
      pageNum: null,
      pageSize: null,
      status: 'EFFECTIVE',
      type: 'give',
      effectiveTime: '2026-05-05T20:12:29',
      usageType: 1,
      grantNo: null,
      tokensMagnitude: 20,
      suitableModel: '适用于通用大模型、超拟人大模型、向量模型使用',
      availableBalance: 20,
      frozenBalance: 0,
      suitableScene: '适用于所有按次计费的基础模型推理',
      consumeType: 'TIMES',
      tokenPurpose: 'COMMON_MODEL_INFERENCE',
      filterEnabled: null,
    },
    {
      id: 27607968,
      tokenNo: 'bundle_688',
      customerId: 23851777983148590,
      tokenBalance: 100,
      expirationTime: '2026-08-05T20:12:29',
      purchaseTime: null,
      resourcePackageName: '【新用户专享】100次搜索资源包',
      packageExpirationTime: '2026-08-05T20:12:29',
      purchaseOrderNo: '202605056fd24275cca046d3810',
      createTime: '2026-05-05T20:12:29',
      updateTime: '2026-05-05T20:12:29',
      pageNum: null,
      pageSize: null,
      status: 'EFFECTIVE',
      type: 'give',
      effectiveTime: '2026-05-05T20:12:29',
      usageType: 1,
      grantNo: null,
      tokensMagnitude: 100,
      suitableModel: 'search-std,search-pro,search-pro-quark,search-pro-sogou',
      availableBalance: 100,
      frozenBalance: 0,
      suitableScene: '适用于search-std,search-pro,search-pro-quark,search-pro-sogou模型的推理',
      consumeType: 'TIMES',
      tokenPurpose: 'COMMON_MODEL_INFERENCE',
      filterEnabled: null,
    },
    {
      id: 27607971,
      tokenNo: 'bundle_848',
      customerId: 23851777983148590,
      tokenBalance: 1999980,
      expirationTime: '2026-08-05T20:12:29',
      purchaseTime: null,
      resourcePackageName: '【新用户专享】200万通用模型推理资源包',
      packageExpirationTime: '2026-08-05T20:12:29',
      purchaseOrderNo: '20260505980f1a2d5d404fb9a89',
      createTime: '2026-05-05T20:12:29',
      updateTime: '2026-05-08T12:35:14',
      pageNum: null,
      pageSize: null,
      status: 'EFFECTIVE',
      type: 'give',
      effectiveTime: '2026-05-05T20:12:29',
      usageType: 1,
      grantNo: null,
      tokensMagnitude: 2000000,
      suitableModel: '适用于通用大模型、超拟人大模型、向量模型使用',
      availableBalance: 1999980,
      frozenBalance: 0,
      suitableScene: '适用于所有按tokens计费的基础模型推理',
      consumeType: 'TOKENS',
      tokenPurpose: 'COMMON_MODEL_INFERENCE',
      filterEnabled: null,
    },
    {
      id: 27607969,
      tokenNo: 'bundle_852',
      customerId: 23851777983148590,
      tokenBalance: 6000000,
      expirationTime: '2026-08-05T20:12:29',
      purchaseTime: null,
      resourcePackageName: '【新用户专享】600万GLM-4.6V资源包',
      packageExpirationTime: '2026-08-05T20:12:29',
      purchaseOrderNo: '202605059ef090ea53be474e877',
      createTime: '2026-05-05T20:12:29',
      updateTime: '2026-05-05T20:12:29',
      pageNum: null,
      pageSize: null,
      status: 'EFFECTIVE',
      type: 'give',
      effectiveTime: '2026-05-05T20:12:29',
      usageType: 1,
      grantNo: null,
      tokensMagnitude: 6000000,
      suitableModel: 'glm-4.6v',
      availableBalance: 6000000,
      frozenBalance: 0,
      suitableScene: '适用于glm-4.6v模型的推理',
      consumeType: 'TOKENS',
      tokenPurpose: 'COMMON_MODEL_INFERENCE',
      filterEnabled: null,
    },
    {
      id: 27607967,
      tokenNo: 'bundle_792',
      customerId: 23851777983148590,
      tokenBalance: 11952428,
      expirationTime: '2026-08-05T20:12:29',
      purchaseTime: null,
      resourcePackageName: '【新用户专享】1200万GLM-4.5-Air资源包',
      packageExpirationTime: '2026-08-05T20:12:29',
      purchaseOrderNo: '20260505e1a1b4f7b4ff4fc3b8f',
      createTime: '2026-05-05T20:12:29',
      updateTime: '2026-05-21T15:15:13',
      pageNum: null,
      pageSize: null,
      status: 'EFFECTIVE',
      type: 'give',
      effectiveTime: '2026-05-05T20:12:29',
      usageType: 1,
      grantNo: null,
      tokensMagnitude: 12000000,
      suitableModel: 'glm-4.5-air',
      availableBalance: 11952428,
      frozenBalance: 0,
      suitableScene: '适用于glm-4.5-air模型的推理',
      consumeType: 'TOKENS',
      tokenPurpose: 'COMMON_MODEL_INFERENCE',
      filterEnabled: null,
    },
  ],
  code: 200,
  msg: '查询成功',
}

// StepFun
response = {
  object: 'account',
  type: 'prepaid',
  balance: 0.0,
  total_cash_balance: 0.0,
  total_voucher_balance: 26.0,
}

response = {
  object: 'account',
  type: 'prepaid',
  balance: 14.94,
  total_cash_balance: 0,
  total_voucher_balance: 14.94,
}

// StepFun en
response = {
  object: 'account',
  type: 'prepaid',
  balance: 0.0,
  total_cash_balance: 0.0,
  total_voucher_balance: 26.0,
}

response = {
  object: 'account',
  type: 'prepaid',
  balance: 0,
  total_cash_balance: 0,
  total_voucher_balance: 0,
}

// SiliconFlow
response = {
  code: 20000,
  message: 'Ok',
  status: true,
  data: {
    id: 'userid',
    name: '个人',
    image: '',
    email: '',
    isAdmin: false,
    balance: '0',
    status: 'normal',
    introduction: '',
    role: '',
    chargeBalance: '-0.3924',
    totalBalance: '-0.3924',
    category: '0',
  },
}

// SiliconFlow en
response = {
  code: 20000,
  message: 'OK',
  status: true,
  data: {
    id: 'userid',
    name: 'username',
    image: 'user_avatar_image_url',
    email: 'user_email_address',
    isAdmin: false,
    balance: '0.88',
    status: 'normal',
    introduction: '',
    role: '',
    chargeBalance: '88.00',
    totalBalance: '88.88',
  },
}

response = {
  code: 20000,
  message: 'Ok',
  status: true,
  data: {
    id: 'userid',
    name: '个人',
    image: '',
    email: '',
    isAdmin: false,
    balance: '1',
    status: 'normal',
    introduction: '',
    role: '',
    chargeBalance: '0',
    totalBalance: '1',
    category: '0',
  },
}

// OpenRouter
response = {
  data: {
    total_credits: 100.5,
    total_usage: 25.75,
  },
}

response = {
  data: { total_credits: 0, total_usage: 0 },
}

// Novita AI
response = {
  availableBalance: '1000000',
  cashBalance: '800000',
  creditLimit: '200000',
  pendingCharges: '0',
  outstandingInvoices: '0',
}

response = {
  availableBalance: '0',
  cashBalance: '0',
  creditLimit: '0',
  pendingCharges: '0',
  outstandingInvoices: '0',
}

// Xiaomi MiMo
response = {
  code: 0,
  message: '',
  data: {
    balance: '74.62',
    frozenBalance: '0.00',
    currency: 'CNY',
    overdraftLimit: '0.00',
    remainingOverdraftLimit: '0.00',
    giftBalance: '74.62',
    cashBalance: '0.00',
  },
}

// Xiaomi MiMo Token Plan
response = {
  code: 0,
  message: '',
  data: {
    monthUsage: {
      percent: 0,
      items: [
        {
          name: 'month_total_token',
          used: 0,
          limit: 82000000000,
          percent: 0,
        },
      ],
    },
    usage: {
      percent: 0.0,
      items: [
        {
          name: 'plan_total_token',
          used: 0,
          limit: 82000000000,
          percent: 0.0,
        },
        {
          name: 'compensation_total_token',
          used: 0,
          limit: 24493506494,
          percent: 0.0,
        },
      ],
    },
  },
}
