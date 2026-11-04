// 市场快照数据层 —— 由 Wind 数据插件生成
//
// 数据来源：Wind（指数行情/估值/月K线）；行情快照每日早 8:00 由定时任务刷新，
// 风险统计基于 2016-10 至 2026-11 的月度 K 线（约 10 年）计算，月度手动更新即可。
// 年化收益为价格指数口径（不含股息再投资）；最大回撤采用「滚动月高 vs 其后月低」
// 口径，可捕捉月内盘中最深跌幅。历史数据不代表未来。
//
// 写入约定（给自动化任务）：仅更新 asOf / quotes / valuations 的数值；
// riskStats 结构不变。字符串内部一律用中文引号『』，禁止 ASCII 双引号。

export type Market = "CN" | "US" | "HK";

export type MarketQuote = {
  code: string;
  name: string;
  market: Market;
  chgPct: number; // 当日涨跌幅 %
  ytdPct: number; // 年初至今涨跌幅 %
};

export type IndexValuation = {
  code: string;
  name: string;
  peTtm: number; // 市盈率 TTM（倍）
};

export type IndexRiskStats = {
  code: string;
  name: string;
  annReturn: number; // 近10年年化收益 %（价格口径，不含股息）
  annVol: number; // 年化波动率 %
  maxDrawdown: number; // 最大回撤 %（负数）
};

export const marketSnapshot = {
  asOf: "2026-11-04",
  source: "Wind",
  quotes: [
    { code: "000016.SH", name: "上证50", market: "CN" as Market, chgPct: 1.45, ytdPct: -7.34 },
    { code: "000300.SH", name: "沪深300", market: "CN" as Market, chgPct: 2.31, ytdPct: -11.42 },
    { code: "000905.SH", name: "中证500", market: "CN" as Market, chgPct: 4.66, ytdPct: -11.3 },
    { code: "SPX.GI", name: "标普500", market: "US" as Market, chgPct: 0.36, ytdPct: 10.57 },
    { code: "NDX.GI", name: "纳斯达克100", market: "US" as Market, chgPct: 0.68, ytdPct: 11.61 },
    { code: "HSCI.HI", name: "恒生综合", market: "HK" as Market, chgPct: 1.86, ytdPct: -11.44 },
  ],
  valuations: [
    { code: "000016.SH", name: "上证50", peTtm: 11.76 },
    { code: "000300.SH", name: "沪深300", peTtm: 13.6 },
  ],
  // 基于 2016-10 至 2026-11 月度 K 线计算（价格口径；最大回撤含月内盘中）
  riskStats: [
    { code: "000016.SH", name: "上证50", annReturn: 2.1, annVol: 16.9, maxDrawdown: -47.4 },
    { code: "000300.SH", name: "沪深300", annReturn: 1.8, annVol: 17.6, maxDrawdown: -47.6 },
    { code: "000905.SH", name: "中证500", annReturn: -0.2, annVol: 21.8, maxDrawdown: -44.3 },
    { code: "SPX.GI", name: "标普500", annReturn: 13.4, annVol: 15.3, maxDrawdown: -35.4 },
    { code: "NDX.GI", name: "纳斯达克100", annReturn: 19.2, annVol: 19.1, maxDrawdown: -37.7 },
    { code: "HSCI.HI", name: "恒生综合", annReturn: 0.9, annVol: 21.3, maxDrawdown: -56.7 },
  ] as IndexRiskStats[],
};

// 预置标的 → 指数代码映射（用于持仓行显示参考行情）
export const indexCodeByName: Record<string, string> = {
  纳指100: "NDX.GI",
  标普500: "SPX.GI",
  上证50: "000016.SH",
  沪深300: "000300.SH",
  中证500: "000905.SH",
  恒生指数: "HSCI.HI",
};
