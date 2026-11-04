// 持仓工具数据层：资产类别定义与常见宽基/工具预设
// 注意：本工具不做行情抓取与收益预测，金额由用户自行填写，推演为情景假设。

export type AssetClass =
  | "usequity" // 美股（含纳指100、标普500等）
  | "cnbroad" // A股宽基（上证50、沪深300、中证500等）
  | "hkequity" // 港股
  | "bond" // 债券/债基
  | "gold" // 黄金
  | "cash"; // 现金/货币基金

export type Holding = {
  id: string;
  name: string;
  asset: AssetClass;
  amount: number; // 持仓金额（元）
};

export const assetMeta: Record<
  AssetClass,
  { name: string; bar: string; chip: string; equity: boolean; group: string }
> = {
  usequity: {
    name: "美股",
    bar: "bg-sky-500",
    chip: "bg-sky-100 text-sky-700",
    equity: true,
    group: "美股市场",
  },
  cnbroad: {
    name: "A股",
    bar: "bg-emerald-500",
    chip: "bg-emerald-100 text-emerald-700",
    equity: true,
    group: "A股市场",
  },
  hkequity: {
    name: "港股",
    bar: "bg-teal-500",
    chip: "bg-teal-100 text-teal-700",
    equity: true,
    group: "港股市场",
  },
  bond: {
    name: "债券",
    bar: "bg-indigo-400",
    chip: "bg-indigo-100 text-indigo-700",
    equity: false,
    group: "债券",
  },
  gold: {
    name: "黄金",
    bar: "bg-amber-400",
    chip: "bg-amber-100 text-amber-700",
    equity: false,
    group: "黄金",
  },
  cash: {
    name: "现金/货基",
    bar: "bg-stone-400",
    chip: "bg-stone-200 text-stone-600",
    equity: false,
    group: "现金",
  },
};

// 常见标的快捷预设（仅作录入快捷方式，不构成任何推荐）
export const presets: { name: string; asset: AssetClass }[] = [
  { name: "纳指100", asset: "usequity" },
  { name: "标普500", asset: "usequity" },
  { name: "上证50", asset: "cnbroad" },
  { name: "沪深300", asset: "cnbroad" },
  { name: "中证500", asset: "cnbroad" },
  { name: "恒生指数", asset: "hkequity" },
  { name: "国债/债基", asset: "bond" },
  { name: "黄金ETF", asset: "gold" },
  { name: "货币基金", asset: "cash" },
];

// 情景推演：各资产类别对『情景年化 r』的假设系数（现金为固定值）
// 股票类按情景利率；黄金按 0.6 倍、债券按 0.4 倍（更保守的量级）、现金固定 1.5%
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
