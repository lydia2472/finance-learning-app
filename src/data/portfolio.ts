// 持仓工具数据层：资产类别、持有类型、风险等级定义与常见宽基/工具预设
// 注意：本工具不做行情抓取与收益预测，金额由用户自行填写，推演为情景假设。

export type AssetClass =
  | "usequity"
  | "cnbroad"
  | "hkequity"
  | "bond"
  | "gold"
  | "cash";

export type HoldingType =
  | "stock"
  | "fund"
  | "bond"
  | "deposit"
  | "gold"
  | "crypto"
  | "other";

export type RiskLevel = "low" | "medium" | "high";

export type Holding = {
  id: string;
  name: string;
  asset: AssetClass;
  holdingType: HoldingType;
  riskLevel: RiskLevel;
  amount: number;
};

export const assetMeta: Record<
  AssetClass,
  { name: string; nameEn: string; bar: string; chip: string; equity: boolean; group: string }
> = {
  usequity: { name: "美股", nameEn: "US Equity", bar: "bg-sky-500", chip: "bg-sky-100 text-sky-700", equity: true, group: "美股市场" },
  cnbroad: { name: "A股", nameEn: "A-Share", bar: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700", equity: true, group: "A股市场" },
  hkequity: { name: "港股", nameEn: "HK Equity", bar: "bg-teal-500", chip: "bg-teal-100 text-teal-700", equity: true, group: "港股市场" },
  bond: { name: "债券", nameEn: "Bond", bar: "bg-indigo-400", chip: "bg-indigo-100 text-indigo-700", equity: false, group: "债券" },
  gold: { name: "黄金", nameEn: "Gold", bar: "bg-amber-400", chip: "bg-amber-100 text-amber-700", equity: false, group: "黄金" },
  cash: { name: "现金/货基", nameEn: "Cash/MMF", bar: "bg-stone-400", chip: "bg-stone-200 text-stone-600", equity: false, group: "现金" },
};

export const holdingTypeMeta: Record<HoldingType, { name: string; nameEn: string }> = {
  stock: { name: "股票", nameEn: "Stock" },
  fund: { name: "基金", nameEn: "Fund" },
  bond: { name: "债券", nameEn: "Bond" },
  deposit: { name: "存款", nameEn: "Deposit" },
  gold: { name: "黄金", nameEn: "Gold" },
  crypto: { name: "加密货币", nameEn: "Crypto" },
  other: { name: "其他", nameEn: "Other" },
};

export const riskLevelMeta: Record<RiskLevel, { name: string; nameEn: string; chip: string }> = {
  low: { name: "低风险", nameEn: "Low", chip: "bg-emerald-100 text-emerald-700" },
  medium: { name: "中风险", nameEn: "Medium", chip: "bg-amber-100 text-amber-700" },
  high: { name: "高风险", nameEn: "High", chip: "bg-rose-100 text-rose-700" },
};

// 常见标的快捷预设（仅作录入快捷方式，不构成任何推荐）
export const presets: { name: string; asset: AssetClass; holdingType: HoldingType; riskLevel: RiskLevel }[] = [
  { name: "纳指100", asset: "usequity", holdingType: "fund", riskLevel: "high" },
  { name: "标普500", asset: "usequity", holdingType: "fund", riskLevel: "high" },
  { name: "上证50", asset: "cnbroad", holdingType: "fund", riskLevel: "high" },
  { name: "沪深300", asset: "cnbroad", holdingType: "fund", riskLevel: "high" },
  { name: "中证500", asset: "cnbroad", holdingType: "fund", riskLevel: "high" },
  { name: "恒生指数", asset: "hkequity", holdingType: "fund", riskLevel: "high" },
  { name: "国债/债基", asset: "bond", holdingType: "fund", riskLevel: "low" },
  { name: "黄金ETF", asset: "gold", holdingType: "gold", riskLevel: "medium" },
  { name: "货币基金", asset: "cash", holdingType: "fund", riskLevel: "low" },
];

// 情景推演：各资产类别对『情景年化 r』的假设系数（现金为固定值）
export function classAssumedRate(asset: AssetClass, r: number): number {
  switch (asset) {
    case "usequity":
    case "cnbroad":
    case "hkequity":
      return r;
    case "gold":
      return r * 0.6;
    case "bond":
      return r * 0.4;
    case "cash":
      return 0.015;
  }
}
