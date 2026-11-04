// CFA 知识地图数据
//
// 合规说明（重要）：CFA® 与 Chartered Financial Analyst® 是 CFA Institute 的注册商标。
// 本产品与 CFA Institute 无任何隶属、合作或授权关系；不复制、不翻译、不改编其任何
// 专有教材与试题。本文件仅参考其**公开发布的知识体系主题结构**（十大知识域 / 三级体系）
// 为自研课程打标签，帮助学习者建立知识地图。官方信息以 cfainstitute.org 为准。

export type CfaTopicId =
  | "ethics"
  | "quant"
  | "econ"
  | "fsa"
  | "corp"
  | "equity"
  | "fi"
  | "deriv"
  | "alt"
  | "pm";

export type CfaTopic = {
  id: CfaTopicId;
  zh: string;
  en: string;
  where: string; // 在本 App 中的对应位置
  status: "主线覆盖" | "部分覆盖" | "选修覆盖" | "进阶模块规划中";
};

// CFA 课程体系的十大知识域（Level I 全部涉及，Level III 以组合管理与道德为主）
export const CFA_TOPICS: CfaTopic[] = [
  {
    id: "ethics",
    zh: "道德与职业标准",
    en: "Ethical & Professional Standards",
    where: "阶段 3（防骗与维权）贯穿全课程的风险意识",
    status: "部分覆盖",
  },
  {
    id: "quant",
    zh: "数量方法",
    en: "Quantitative Methods",
    where: "阶段 1（复利/时间价值）+ 阶段 8 选修（第 151-157 课）",
    status: "选修覆盖",
  },
  {
    id: "econ",
    zh: "经济学",
    en: "Economics",
    where: "阶段 6（宏观与央行）+ 阶段 8 选修（第 163-167 课）",
    status: "选修覆盖",
  },
  {
    id: "fsa",
    zh: "财务报表与分析",
    en: "Financial Statement Analysis",
    where: "阶段 1 第 7-8 课 + 阶段 8 选修（第 158-161 课）",
    status: "选修覆盖",
  },
  {
    id: "corp",
    zh: "公司发行人",
    en: "Corporate Issuers",
    where: "阶段 8 选修（第 152、162 课）+ 阶段 4 浅涉及",
    status: "选修覆盖",
  },
  {
    id: "equity",
    zh: "权益投资",
    en: "Equity Investments",
    where: "阶段 4-5（股票与指数基金）",
    status: "部分覆盖",
  },
  {
    id: "fi",
    zh: "固定收益",
    en: "Fixed Income",
    where: "阶段 4（债券两课）+ 阶段 8 选修（第 168-169 课）",
    status: "选修覆盖",
  },
  {
    id: "deriv",
    zh: "衍生品",
    en: "Derivatives",
    where: "阶段 8 选修（第 170-171 课）",
    status: "选修覆盖",
  },
  {
    id: "alt",
    zh: "另类投资",
    en: "Alternative Investments",
    where: "阶段 8 选修（第 172 课）+ 阶段 4 一览",
    status: "选修覆盖",
  },
  {
    id: "pm",
    zh: "组合管理与财富规划",
    en: "Portfolio Management & Wealth Planning",
    where: "阶段 1/5/7 主线 + 阶段 8（第 173-175 课）",
    status: "主线覆盖",
  },
];

export function topicName(id: CfaTopicId): string {
  return CFA_TOPICS.find((t) => t.id === id)?.zh ?? id;
}

// 每一课的 CFA 知识域标签（level 指该主题在 CFA 考试体系中出现的主要级别）
export type CfaTag = {
  topic: CfaTopicId;
  level: string; // 如 "L1"、"L3"、"L1·L3"
  note: string;
};

export const lessonCfaMap: Record<number, CfaTag[]> = {
  1: [{ topic: "pm", level: "L1-L3", note: "投资行业概览：行业结构、参与者与职业伦理是 CFA 的起点话题" }],
  2: [{ topic: "quant", level: "L1", note: "Time Value of Money：复利是数量方法的第一课" }],
  3: [{ topic: "econ", level: "L1", note: "Inflation：宏观经济学的基础概念" }],
  4: [{ topic: "quant", level: "L1", note: "现值 / 终值 / 贴现现金流（DCF）思想" }],
  5: [{ topic: "quant", level: "L1", note: "TVM 的心算应用技巧" }],
  6: [
    { topic: "econ", level: "L1", note: "名义利率与实际利率" },
    { topic: "quant", level: "L1", note: "实际收益率的计算" },
  ],
  7: [{ topic: "fsa", level: "L1", note: "资产负债表思想的个人版：资产 − 负债 = 净资产" }],
  8: [{ topic: "fsa", level: "L1", note: "现金流量表思想的个人版：看清钱的流向" }],
  9: [{ topic: "pm", level: "L1·L3", note: "预算与储蓄规划属于财富规划（Wealth Planning）" }],
  10: [{ topic: "pm", level: "L3", note: "储蓄率决定财务目标的可行性与期限" }],
  11: [{ topic: "pm", level: "L1·L3", note: "流动性管理：先安全后收益的配置顺序" }],
  12: [{ topic: "pm", level: "L3", note: "SMART 目标是 IPS（投资政策声明）的个人版雏形" }],
  13: [{ topic: "econ", level: "L1", note: "机会成本：经济学的第一原则" }],
  14: [{ topic: "pm", level: "L3", note: "Behavioral Finance：个人投资者的经典行为偏差" }],
  15: [], // 综合复习，贯穿多域
  // ---- 阶段 2 · 个人财务底盘（16-35）----
  16: [{ topic: "pm", level: "L1·L3", note: "Wealth Planning：个人现金流管理" }],
  17: [{ topic: "pm", level: "L1·L3", note: "固定与变动支出的预算管理" }],
  18: [{ topic: "pm", level: "L3", note: "债务管理：好债与坏债的判别" }],
  19: [{ topic: "pm", level: "L1·L3", note: "循环利息与复利计息" }],
  20: [{ topic: "pm", level: "L1·L3", note: "信用评分：借款人信用分析的个人版" }],
  21: [{ topic: "pm", level: "L1·L3", note: "信用建立与维护" }],
  22: [
    { topic: "quant", level: "L1", note: "真实利率（IRR）的计算" },
    { topic: "pm", level: "L3", note: "消费信贷成本管理" },
  ],
  23: [
    { topic: "quant", level: "L1", note: "Annuity：等额本息即年金公式的应用" },
    { topic: "pm", level: "L3", note: "房贷规划" },
  ],
  24: [{ topic: "pm", level: "L3", note: "住房决策的持有成本法（OWN vs RENT 分析）" }],
  25: [{ topic: "pm", level: "L3", note: "大额耐用消费品与折旧" }],
  26: [{ topic: "pm", level: "L1·L3", note: "人力资本与教育投资融资" }],
  27: [{ topic: "pm", level: "L3", note: "债务偿还策略与行为坚持" }],
  28: [{ topic: "quant", level: "L1", note: "APR 与 APY：单利与复利口径" }],
  29: [{ topic: "pm", level: "L1", note: "存款工具与存款保险制度" }],
  30: [{ topic: "pm", level: "L1", note: "现金管理工具" }],
  31: [{ topic: "econ", level: "L1", note: "Exchange Rates：汇率基础" }],
  32: [{ topic: "econ", level: "L1", note: "外汇交易成本与跨境资本流动" }],
  33: [{ topic: "econ", level: "L1", note: "Taxation：直接税与间接税" }],
  34: [{ topic: "pm", level: "L3", note: "税优账户与递延纳税" }],
  35: [], // 综合复习，贯穿多域
  // ---- 阶段 3 · 保障先行（36-50）----
  36: [{ topic: "pm", level: "L1·L3", note: "保险原理：风险转移与大数法则" }],
  37: [{ topic: "pm", level: "L3", note: "Wealth Planning：家庭保险需求分析" }],
  38: [{ topic: "pm", level: "L3", note: "医疗保险与损失分摊" }],
  39: [{ topic: "pm", level: "L3", note: "收入保障与人力资本保护" }],
  40: [{ topic: "pm", level: "L1·L3", note: "人寿保险：定期与终身的结构差异" }],
  41: [{ topic: "pm", level: "L3", note: "财产与意外风险保障" }],
  42: [{ topic: "pm", level: "L3", note: "保险合同条款与如实告知义务" }],
  43: [{ topic: "pm", level: "L3", note: "保额与保费的需求分析（双十原则）" }],
  44: [{ topic: "pm", level: "L1", note: "社会保险体系" }],
  45: [{ topic: "pm", level: "L1·L3", note: "跨境保险安排" }],
  46: [
    { topic: "ethics", level: "L1", note: "投资者保护视角：识别欺诈与不当行为" },
    { topic: "pm", level: "L3", note: "财富保护" },
  ],
  47: [{ topic: "ethics", level: "L1", note: "监管框架与持牌经营" }],
  48: [{ topic: "pm", level: "L1", note: "账户安全与风险管理" }],
  49: [
    { topic: "ethics", level: "L1", note: "投资者救济渠道" },
    { topic: "pm", level: "L3", note: "风险事件的应急处置" },
  ],
  50: [], // 综合复习，贯穿多域
  // ---- 阶段 4 · 认识投资世界（51-75）----
  51: [{ topic: "equity", level: "L1", note: "投资与投机：收益来源的区分" }],
  52: [{ topic: "pm", level: "L1", note: "Risk-Return Tradeoff 风险收益权衡" }],
  53: [{ topic: "equity", level: "L1", note: "股票：所有权、分红权与剩余索取权" }],
  54: [{ topic: "equity", level: "L1", note: "Primary Market 一级市场与 IPO" }],
  55: [{ topic: "equity", level: "L1", note: "Market Organization：价格形成与有效市场" }],
  56: [{ topic: "equity", level: "L1", note: "Dividends 股利政策与股息率" }],
  57: [{ topic: "fi", level: "L1", note: "Fixed Income 债券的合同特征" }],
  58: [{ topic: "fi", level: "L1", note: "利率与债券价格的反向关系" }],
  59: [{ topic: "fi", level: "L1", note: "Credit Risk 信用评级与利差" }],
  60: [{ topic: "equity", level: "L1", note: "集合投资：基金的结构与功能" }],
  61: [{ topic: "equity", level: "L1", note: "Open-End vs Closed-End 基金结构" }],
  62: [{ topic: "equity", level: "L1", note: "ETF 的创设赎回与套利机制" }],
  63: [{ topic: "equity", level: "L1", note: "Security Market Indices 与被动投资" }],
  64: [{ topic: "equity", level: "L1", note: "Active vs Passive 主动与被动" }],
  65: [{ topic: "pm", level: "L1", note: "基金类型与风险光谱" }],
  66: [{ topic: "quant", level: "L1", note: "收益率度量：累计/年化/持有" }],
  67: [
    { topic: "quant", level: "L1", note: "波动率与最大回撤的风险度量" },
    { topic: "pm", level: "L1", note: "风险度量在组合中的应用" },
  ],
  68: [{ topic: "pm", level: "L1", note: "Diversification 分散投资" }],
  69: [
    { topic: "quant", level: "L1", note: "Correlation 相关性与协方差" },
    { topic: "pm", level: "L1", note: "组合波动的相关性来源" },
  ],
  70: [{ topic: "pm", level: "L1·L3", note: "Asset Allocation 资产配置（Brinson 研究）" }],
  71: [{ topic: "pm", level: "L1·L3", note: "Rebalancing 再平衡纪律" }],
  72: [{ topic: "alt", level: "L1", note: "黄金与大宗商品的配置角色" }],
  73: [
    { topic: "alt", level: "L1", note: "Real Estate 不动产投资（租售比与杠杆）" },
    { topic: "pm", level: "L3", note: "不动产在财富规划中的位置" },
  ],
  74: [{ topic: "alt", level: "L1", note: "另类投资：REITs/收藏品/加密资产风险" }],
  75: [], // 综合复习
  // ---- 阶段 5 · 基金与指数实战（76-100）----
  76: [{ topic: "pm", level: "L1", note: "开户与适当性管理" }],
  77: [{ topic: "pm", level: "L1", note: "基金费用结构" }],
  78: [{ topic: "pm", level: "L1", note: "费用的复利拖累" }],
  79: [{ topic: "pm", level: "L1", note: "基金尽职调查" }],
  80: [{ topic: "pm", level: "L1·L2", note: "Benchmark & Tracking Error 基准与跟踪误差" }],
  81: [{ topic: "equity", level: "L1·L2", note: "P/E 市盈率与估值入门" }],
  82: [{ topic: "equity", level: "L1·L2", note: "P/B、股息率与周期股估值陷阱" }],
  83: [{ topic: "pm", level: "L1·L3", note: "Dollar-Cost Averaging 定投纪律" }],
  84: [
    { topic: "quant", level: "L1", note: "调和平均与定投成本数学" },
    { topic: "pm", level: "L3", note: "定投的行为价值" },
  ],
  85: [{ topic: "pm", level: "L3", note: "止盈规则与再平衡的卖出侧" }],
  86: [{ topic: "pm", level: "L3", note: "Core-Satellite 核心-卫星结构" }],
  87: [{ topic: "pm", level: "L1·L3", note: "股债配比与风险承受力评估" }],
  88: [{ topic: "pm", level: "L3", note: "Goals-Based 规划：四笔钱框架" }],
  89: [{ topic: "pm", level: "L1·L3", note: "Target-Date Funds 与下滑轨道" }],
  90: [{ topic: "pm", level: "L1·L3", note: "Global Allocation 与本土偏好" }],
  91: [
    { topic: "pm", level: "L1·L3", note: "QDII 与全球投资工具" },
    { topic: "econ", level: "L1", note: "汇率风险敞口" },
  ],
  92: [{ topic: "pm", level: "L1", note: "模拟交易与决策日志" }],
  93: [{ topic: "pm", level: "L1", note: "业绩评价：幸存者偏差与均值回归" }],
  94: [{ topic: "pm", level: "L1·L2", note: "主动管理能力评估（α 与规模容量）" }],
  95: [
    { topic: "pm", level: "L3", note: "亏损诊断的行为清单" },
    { topic: "ethics", level: "L1", note: "投资决策中的行为偏差" },
  ],
  96: [{ topic: "pm", level: "L3", note: "组合的定期检视流程" }],
  97: [{ topic: "pm", level: "L3", note: "税优账户与递延纳税" }],
  98: [
    { topic: "ethics", level: "L1", note: "销售话术与投资者适当性" },
    { topic: "pm", level: "L1", note: "费用披露的理解" },
  ],
  99: [{ topic: "pm", level: "L3", note: "IPS 投资政策声明" }],
  100: [], // 综合复习
  // ---- 阶段 6 · 宏观与行为金融（101-125）----
  101: [{ topic: "econ", level: "L1", note: "中央银行体系与最后贷款人" }],
  102: [{ topic: "econ", level: "L1", note: "利率的决定与传导" }],
  103: [{ topic: "econ", level: "L1", note: "货币政策对股债汇的影响" }],
  104: [{ topic: "econ", level: "L1", note: "美联储与 FOMC 决策框架" }],
  105: [{ topic: "econ", level: "L1", note: "货币政策工具（准备金/OMO/QE）" }],
  106: [{ topic: "econ", level: "L1", note: "Inflation 度量：CPI/PPI/核心CPI" }],
  107: [{ topic: "econ", level: "L1", note: "通胀类型与成因" }],
  108: [{ topic: "econ", level: "L1", note: "Deflation 通缩与零下限" }],
  109: [{ topic: "econ", level: "L1", note: "Aggregate Output & GDP" }],
  110: [{ topic: "econ", level: "L1", note: "Employment 就业指标" }],
  111: [{ topic: "econ", level: "L1", note: "Leading Indicators 先行指标与 PMI" }],
  112: [{ topic: "econ", level: "L1", note: "Business Cycle 经济周期" }],
  113: [
    { topic: "econ", level: "L1", note: "周期与资产轮动（投资时钟）" },
    { topic: "pm", level: "L1·L3", note: "周期视角的资产配置" },
  ],
  114: [{ topic: "fi", level: "L1", note: "收益率曲线与利差" }],
  115: [{ topic: "econ", level: "L1", note: "Exchange Rate Regimes 与美元体系" }],
  116: [{ topic: "econ", level: "L1", note: "International Trade & Tariffs" }],
  117: [
    { topic: "econ", level: "L1", note: "地缘风险与商品/避险通道" },
    { topic: "alt", level: "L1", note: "黄金的避险属性" },
  ],
  118: [
    { topic: "econ", level: "L1", note: "金融危机史与政策应对" },
    { topic: "ethics", level: "L1", note: "危机后的监管改革" },
  ],
  119: [{ topic: "pm", level: "L3", note: "Behavioral Finance 行为金融总论" }],
  120: [{ topic: "pm", level: "L3", note: "Loss Aversion & Disposition Effect" }],
  121: [{ topic: "pm", level: "L3", note: "Herd Behavior 羊群效应" }],
  122: [{ topic: "pm", level: "L3", note: "Anchoring & Confirmation Bias" }],
  123: [{ topic: "pm", level: "L3", note: "FOMO 与过度交易的行为证据" }],
  124: [{ topic: "pm", level: "L3", note: "行为偏差的规则化应对" }],
  125: [], // 综合复习
  // ---- 阶段 7 · 长期财富管理（126-150）----
  126: [{ topic: "pm", level: "L3", note: "退休需求测算" }],
  127: [{ topic: "pm", level: "L3", note: "Safe Withdrawal Rate 与序列风险" }],
  128: [{ topic: "pm", level: "L1·L3", note: "养老金三支柱体系" }],
  129: [{ topic: "pm", level: "L3", note: "生命周期中段的财务压力管理" }],
  130: [{ topic: "pm", level: "L3", note: "保险与投资的功能边界" }],
  131: [{ topic: "pm", level: "L3", note: "教育金目标规划" }],
  132: [{ topic: "pm", level: "L3", note: "自住与投资房产的分账管理" }],
  133: [
    { topic: "pm", level: "L3", note: "提前还贷 vs 投资的决策" },
    { topic: "quant", level: "L1", note: "利率比较的数学" },
  ],
  134: [{ topic: "pm", level: "L3", note: "遗产规划：遗嘱/信托/受益人" }],
  135: [
    { topic: "pm", level: "L3", note: "资产保护的隔离结构" },
    { topic: "ethics", level: "L1", note: "合法边界与撤销风险" },
  ],
  136: [
    { topic: "pm", level: "L3", note: "资本利得与分红的税务处理" },
    { topic: "econ", level: "L1", note: "税收基本框架" },
  ],
  137: [
    { topic: "pm", level: "L3", note: "跨境税务居民身份规划" },
    { topic: "ethics", level: "L1", note: "合规申报义务" },
  ],
  138: [
    { topic: "ethics", level: "L1", note: "专业人员的职责与利益冲突" },
    { topic: "pm", level: "L3", note: "顾问的挑选框架" },
  ],
  139: [{ topic: "pm", level: "L1·L3", note: "Robo-Advisory 与算法配置" }],
  140: [{ topic: "pm", level: "L3", note: "Decumulation 提取顺序" }],
  141: [
    { topic: "pm", level: "L3", note: "Longevity Risk 与年金" },
    { topic: "fi", level: "L1", note: "年金产品的结构" },
  ],
  142: [{ topic: "pm", level: "L3", note: "通胀保护与 TIPS 类资产" }],
  143: [{ topic: "pm", level: "L3", note: "财务检视流程" }],
  144: [{ topic: "pm", level: "L3", note: "Family Investment Policy Statement" }],
  145: [{ topic: "pm", level: "L1", note: "持续学习的信源管理" }],
  146: [
    { topic: "pm", level: "L3", note: "常见谬误的辨析" },
    { topic: "ethics", level: "L1", note: "警惕误导性话术" },
  ],
  147: [
    { topic: "ethics", level: "L1", note: "专业服务的边界与选择" },
    { topic: "pm", level: "L3", note: "何时聘请专业人士" },
  ],
  148: [{ topic: "pm", level: "L3", note: "Financial Independence 的测算" }],
  149: [{ topic: "pm", level: "L3", note: "综合理财方案（Capstone）" }],
  150: [], // 结业总复习
  // ---- 阶段 8 · 进阶选修（151-175）----
  151: [{ topic: "quant", level: "L1", note: "Annuity & Perpetuity：年金与永续年金定价" }],
  152: [
    { topic: "quant", level: "L1", note: "Discounted Cash Flow 应用于资本预算" },
    { topic: "corp", level: "L1", note: "Capital Budgeting：项目投资决策" },
  ],
  153: [{ topic: "quant", level: "L1", note: "Statistical Concepts and Market Returns" }],
  154: [{ topic: "quant", level: "L1", note: "方差与标准差：离散程度的度量" }],
  155: [{ topic: "quant", level: "L1", note: "Common Probability Distributions：正态分布" }],
  156: [{ topic: "quant", level: "L1", note: "Probability Concepts：期望值" }],
  157: [{ topic: "quant", level: "L1", note: "Sampling and Estimation：抽样与置信区间" }],
  158: [{ topic: "fsa", level: "L1", note: "三张报表的框架与勾稽关系" }],
  159: [{ topic: "fsa", level: "L1", note: "Balance Sheet：资产结构与质量体检" }],
  160: [{ topic: "fsa", level: "L1", note: "Income Statement & Cash Flow：权责发生制 vs 收付实现制" }],
  161: [{ topic: "fsa", level: "L1", note: "财务比率与 DuPont 杜邦分解" }],
  162: [{ topic: "corp", level: "L1", note: "Capital Structure & Cost of Capital" }],
  163: [{ topic: "econ", level: "L1", note: "Demand and Supply Analysis" }],
  164: [{ topic: "econ", level: "L1", note: "Elasticity：需求价格弹性" }],
  165: [{ topic: "econ", level: "L1", note: "Market Structure：四种市场结构" }],
  166: [{ topic: "econ", level: "L1", note: "Aggregate Output：GDP 核算与局限" }],
  167: [{ topic: "econ", level: "L1", note: "International Trade & Exchange Rates：比较优势与 PPP" }],
  168: [{ topic: "fi", level: "L1", note: "Bond Valuation & YTM 债券定价" }],
  169: [{ topic: "fi", level: "L1·L2", note: "Duration & Convexity 利率风险度量" }],
  170: [{ topic: "deriv", level: "L1", note: "Option Basics：看涨与看跌" }],
  171: [{ topic: "deriv", level: "L1", note: "Forward, Futures & Swaps" }],
  172: [{ topic: "alt", level: "L1", note: "对冲基金/私募/REITs/大宗商品全景" }],
  173: [
    { topic: "equity", level: "L1", note: "Market Efficiency 市场有效性" },
    { topic: "pm", level: "L1", note: "指数投资的学术基础" },
  ],
  174: [{ topic: "pm", level: "L1·L2", note: "CAPM 与 Beta：系统性风险定价" }],
  175: [{ topic: "pm", level: "L1·L3", note: "有效前沿、两基金分离与 IPS" }],
};

// 后续阶段（2-7）与 CFA 知识域的对应关系
export const stageCfaMap: Record<number, CfaTopicId[]> = {
  2: ["pm", "econ"], // 信用/债务/汇率/税务
  3: ["pm", "ethics"], // 保险与防骗（消费者保护视角）
  4: ["equity", "fi", "deriv", "alt", "corp", "pm"], // 投资工具全景
  5: ["pm", "equity", "quant"], // 组合构建与估值
  6: ["econ", "pm"], // 宏观经济 + 行为金融
  7: ["pm", "ethics"], // 长期财富管理与识别不当销售
  8: ["quant", "fsa", "corp", "econ", "fi", "deriv", "alt", "equity", "pm"], // 进阶选修：系统覆盖
};

// 进阶路径三步
export const cfaRoadmap = [
  {
    step: 1,
    title: "学完本 App 阶段 1-5",
    desc: "约 100 课，建立从金融小白到独立投资者的完整基础，覆盖 CFA 十大知识域的入门层。",
    url: null as string | null,
  },
  {
    step: 2,
    title: "CFA Investment Foundations Certificate（官方入门证书）",
    desc: "CFA Institute 面向入门者的证书：60-90 小时在线课程 + 在线终考，12 个月访问权。2026 年标准价约 350 美元、全日制学生约 79 美元（曾长期免费，现已收费，以官网为准）。",
    url: "https://www.cfainstitute.org/programs/investment-foundations-certificate",
  },
  {
    step: 3,
    title: "CFA Level I → II → III（职业资格路线）",
    desc: "面向想进入投资行业的人：依次通过三级考试，叠加约 4,000 小时相关工作经验后可申请特许资格。2026 年 2 月起费用为一次性注册费 350 美元 + 每级报名费（早鸟约 1,140~1,240 美元、标准最高约 1,590 美元），以官网为准。",
    url: "https://www.cfainstitute.org/programs/cfa",
  },
];

// ---- CFA 进阶中心扩展数据（费用与权重信息核对于 2026-11，均以官网为准）----

// 三级体系详情
export const cfaLevels = [
  {
    level: "Level I",
    focus: "概念与工具：十大知识域的入门全覆盖，考『知不知道』",
    format: "180 道单项选择题，分两个各 2 小时 15 分的机考时段",
    windows: "每年 4 个考期（2 / 5 / 8 / 11 月），一年最多报考 2 次",
    passRate: "近年通过率约 40% 量级",
    hours: "官方调研平均 300 小时+",
    color: "emerald",
  },
  {
    level: "Level II",
    focus: "估值与分析：案例（Vignette）+ 选择题，考『会不会算』",
    format: "案例集 + 单选，两个机考时段",
    windows: "每年 3 个考期（5 / 8 / 11 月）",
    passRate: "近年通过率约 45%~55% 量级",
    hours: "官方调研平均约 330 小时",
    color: "amber",
  },
  {
    level: "Level III",
    focus: "组合管理与财富规划：论述题（Essay）+ 案例，考『会不会用』",
    format: "构造性回答（论述）+ 案例选择，两个机考时段",
    windows: "2026 年起每年 2 个考期（2 / 8 月）",
    passRate: "近年通过率约 50% 量级",
    hours: "官方调研平均约 350 小时",
    color: "indigo",
  },
];

// Level I 十大知识域权重（2026 年官方区间）+ 与本 App 的衔接
export const l1TopicWeights = {
  note: "以下为 2026 年官方公布的权重区间（180 道题折算）。注意：2027 年起官方调整权重——道德降至 10-15%，数量方法升至 11-14%。以官网当年公布为准。",
  rows: [
    { topic: "ethics" as const, weight: "15-20%", questions: "约 27-36 题", bridge: "阶段 3（46-49 课）+ 阶段 7（138/146/147 课）" },
    { topic: "quant" as const, weight: "6-9%", questions: "约 11-16 题", bridge: "阶段 1（2/4-6 课）+ 阶段 8（151-157 课）" },
    { topic: "econ" as const, weight: "6-9%", questions: "约 11-16 题", bridge: "阶段 6（101-118 课）+ 阶段 8（163-167 课）" },
    { topic: "fsa" as const, weight: "11-14%", questions: "约 20-25 题", bridge: "阶段 2（7/8 课）+ 阶段 8（158-161 课）" },
    { topic: "corp" as const, weight: "6-9%", questions: "约 11-16 题", bridge: "阶段 4（54 课）+ 阶段 8（152/162 课）" },
    { topic: "equity" as const, weight: "11-14%", questions: "约 20-25 题", bridge: "阶段 4（51-56/60-64 课）+ 阶段 5（81/82 课）+ 阶段 8（173 课）" },
    { topic: "fi" as const, weight: "11-14%", questions: "约 20-25 题", bridge: "阶段 4（57-59 课）+ 阶段 8（168/169 课）" },
    { topic: "deriv" as const, weight: "5-8%", questions: "约 9-14 题", bridge: "阶段 8（170/171 课）" },
    { topic: "alt" as const, weight: "7-10%", questions: "约 13-18 题", bridge: "阶段 4（72-74 课）+ 阶段 8（172 课）" },
    { topic: "pm" as const, weight: "8-12%", questions: "约 14-22 题", bridge: "阶段 4（65-71 课）+ 阶段 5（83-89 课）+ 阶段 7（126-148 课）" },
  ],
};

// 报考实务
export const examLogistics = [
  { k: "报考条件（满足其一）", v: "本科学历（或毕业前 23 个月内可考 L1）；或 4,000 小时工作经验（任意领域，至少跨 36 个月）" },
  { k: "一次性注册费", v: "350 美元（2026 年 2 月起的新价格结构，首次报考 L1 时缴纳）" },
  { k: "每级报名费", v: "早鸟约 1,140~1,240 美元 / 标准最高约 1,590 美元（越早报名越便宜）" },
  { k: "改期费", v: "考试窗口内改期约 250 美元；报名截止前可退部分费用" },
  { k: "证件", v: "国际旅行护照（报名与考试唯一有效证件）" },
  { k: "成绩与重考", v: "考后约 5-10 周出分；L1 每年至多考 2 次（两次间隔至少 6 个月）；未通过可重考" },
  { k: "特许资格", v: "通过三级 + 4,000 小时合格工作经验（36 个月以上）+ 2-3 位推荐人 + 遵守 ethics code" },
];

// 备考方法论
export const studyStrategy = [
  {
    title: "时间是第一变量",
    desc: "官方调研平均每级 300+ 小时——按每周 10 小时算约 7~8 个月。倒排日历比挑选资料更重要：先定考期，再分配周小时。",
  },
  {
    title: "三轮复习法",
    desc: "第一轮过知识（理解为主）→ 第二轮刷题库（QBank）+ 错题本 → 第三轮模拟考（严格计时两个时段）+ 道德准则重读。",
  },
  {
    title: "题库优先于刷书",
    desc: "机考时代题感决定成败：目标正确率稳定在 70%+ 再上考场（通过线 MPS 不公布，但 70%+ 历史上基本安全）。",
  },
  {
    title: "道德（Ethics）的特殊地位",
    desc: "占比最高（15-20%）且有 ethics adjustment——边缘分数常按道德表现定生死。策略：第一轮就学，考前一周再完整重读一遍。",
  },
  {
    title: "官方教材 vs 第三方 Notes",
    desc: "官方 curriculum 最全但篇幅巨大；第三方 Notes 精简但需配合官方题库。常见组合：Notes 过知识点 + 官方 Practice Pack 刷题。",
  },
  {
    title: "先易后难排科目",
    desc: "从权重大的下手（Ethics/FSA/权益/固收四座大山占约五成分值），衍生品等低权重科目后置——分数是按题数算的。",
  },
];

// 证书对比
export const certificateCompare = [
  {
    name: "CFA",
    org: "CFA Institute",
    focus: "投资分析与组合管理（全流程）",
    format: "三级机考 + 4,000 小时经验",
    fit: "想做投研、资产管理、买方分析师",
    note: "全球投资业主流资格，周期约 3-4 年",
  },
  {
    name: "FRM",
    org: "GARP",
    focus: "金融风险管理（市场/信用/操作风险）",
    format: "两级机考",
    fit: "想做风控、合规、量化风控",
    note: "聚焦风险一个纵深的短周期选择",
  },
  {
    name: "CPA",
    org: "各国注册会计师协会",
    focus: "审计、会计与税务",
    format: "多科目分科考试（各国不同）",
    fit: "审计、财务会计、税务方向",
    note: "深度在『账』，与 CFA 的『投资』互补",
  },
];

// CFA 背景速览
export const cfaFacts = [
  { k: "全称", v: "Chartered Financial Analyst（特许金融分析师）" },
  { k: "颁证机构", v: "CFA Institute（美国，全球性投资专业人士协会）" },
  { k: "体系", v: "三级考试（Level I / II / III），机考，全球统一命题" },
  { k: "特许条件", v: "通过全部三级 + 约 4000 小时相关工作/实践经验（分布在至少 36 个月）+ 遵守道德准则" },
  { k: "认可度", v: "投资分析、基金管理等领域的全球主流职业资格之一" },
];
