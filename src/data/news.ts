// 每日财经简报数据层
//
// 数据来源：ZCode 每日早 8:00 定时任务检索生成（检索真实新闻并附来源链接），
// 生成后自动写入本文件并重新构建。内容仅为教育信息，不构成投资建议。
//
// 写入约定（给自动化任务）：新的一期作为对象插到 editions 数组的最前面，
// 字符串内部一律使用中文引号『』，禁止使用 ASCII 双引号，确保 TS 语法有效。

export type NewsCategory =
  | "geopolitics" // 国际时政与地缘政治
  | "macro" // 宏观经济与央行
  | "china" // 中国国内政策与经济
  | "markets" // 市场行情
  | "industry"; // 行业与公司

export type NewsItem = {
  title: string;
  sourceName: string;
  sourceUrl: string;
  fact: string; // 发生了什么（一句话事实）
  why: string; // 为什么和你的钱包有关（小白解读）
  category: NewsCategory;
  relatedLessons?: number[]; // 关联课程 id（新闻 → 学习入口）
};

export type NewsEdition = {
  date: string; // YYYY-MM-DD
  headline: string; // 当日主线（一两句）
  items: NewsItem[];
  calendar?: string[]; // 今日/近期经济日历
};

export const categoryMeta: Record<
  NewsCategory,
  { name: string; chip: string }
> = {
  geopolitics: { name: "国际时政", chip: "bg-rose-100 text-rose-700" },
  macro: { name: "宏观央行", chip: "bg-sky-100 text-sky-700" },
  china: { name: "国内政策", chip: "bg-amber-100 text-amber-700" },
  markets: { name: "市场行情", chip: "bg-emerald-100 text-emerald-700" },
  industry: { name: "行业公司", chip: "bg-violet-100 text-violet-700" },
};

export const editions: NewsEdition[] = [
  {
    date: "2026-11-04",
    headline:
      "中国央行降息点燃 A 股大涨（中证500 +4.66%）；美国中期选举民主党夺回国会，马斯克旗下 SpaceX/Tesla 盘后重挫 4%+；Binance 遭 60 亿美元史上最大加密黑客攻击。",
    items: [
      {
        title: "中国央行 11 月 4 日起降息，A 股三大指数大涨",
        sourceName: "新浪财经",
        sourceUrl: "https://finance.sina.com.cn",
        fact: "央行公告自 11 月 4 日起实施降息；当日沪深300 大涨 2.31%、中证500 涨 4.66%、上证50 涨 1.45%，恒生综合涨 1.86%。",
        why: "降息是债券和股市的双重利好——债券价格上涨（第 58 课跷跷板）、股票估值抬升（第 55 课折现率下降）。这是第 102 课的教科书演示。",
        category: "china",
        relatedLessons: [102, 58, 103],
      },
      {
        title: "美国中期选举『蓝色浪潮』：民主党夺回国会",
        sourceName: "CNN",
        sourceUrl: "https://www.cnn.com",
        fact: "民主党在中期选举中超预期表现，夺回国会控制权；选民对特朗普政府发出强烈否定信号。",
        why: "国会分裂意味着财政刺激可能加码但预算博弈加剧——对美股短期加大波动，对债市影响取决于通胀路径（第 112/113 课周期框架）。",
        category: "geopolitics",
        relatedLessons: [112, 113],
      },
      {
        title: "SpaceX/Tesla 因民主党胜利盘后大跌 4%+",
        sourceName: "Bloomberg / TipRanks",
        sourceUrl:
          "https://www.bloomberg.com/news/articles/2026-11-04/tesla-spacex-shares-take-early-hit-as-midterm-blue-wave-unfolds",
        fact: "民主党夺回国会后，SPCX 和 TSLA 盘后下跌超 4%；国会原定审议的 175 亿美元 SpaceX 额外政府资金面临不确定性；马斯克本轮中期选举投入约 3.66~4.74 亿美元支持共和党。",
        why: "SpaceX 的核心收入依赖政府合同（军事+NASA）——民主党控制国会可能削减导弹防御预算、加强对马斯克的政治审查。这是第 117 课地缘政治影响市场的典型案例。",
        category: "industry",
        relatedLessons: [117, 54, 55],
      },
      {
        title: "Binance 遭 60 亿美元史上最大加密黑客攻击",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/01/business/binance-withdrawals-crypto-heist",
        fact: "黑客从 Binance 窃取 60 亿美元加密资产；提现已恢复，但这是加密史上最大盗窃案。",
        why: "第 74 课的警告成真：加密资产托管风险真实存在。如果你的组合中有加密仓位，这提醒你平台安全和私钥管理的重要性。",
        category: "industry",
        relatedLessons: [74, 46],
      },
      {
        title: "A 股与美股走势继续分化",
        sourceName: "Wind（本站市场快照）",
        sourceUrl: "https://q.stock.sohu.com/zs/000001/index.shtml",
        fact: "11 月 4 日收盘：A 股三大指数大涨（沪深300 +2.31%、中证500 +4.66%）；美股 11 月 3 日收盘涨跌互现（标普500 +0.36%、纳指100 +0.68%）。",
        why: "降息驱动的 A 股反弹 vs 选举不确定性的美股观望——两地不同步正是全球配置的 Core 逻辑（第 68/90 课）。",
        category: "markets",
        relatedLessons: [90, 68],
      },
    ],
    calendar: [
      "11 月 10 日（周二）：美国 10 月 CPI（北京时间 20:30/21:30）——决定 12 月 FOMC 是否加息",
      "11 月 10 日：对华 25% 关税措施原定生效日",
      "11 月 15 日：中国外汇存款准备金率上调正式实施",
    ],
  },
  {
    date: "2026-11-03",
    headline:
      "美联储暂停加息但保留紧缩选项、通胀反弹，与中国制造业景气回落形成对照——全球市场正围绕『利率更高更久』重新定价。",
    items: [
      {
        title: "美联储按兵不动，年内仍可能加息",
        sourceName: "21经济网",
        sourceUrl:
          "https://www.21jingji.com/article/20261102/herald/ce4562cadd108dff3d600625d978b7da.html",
        fact: "美联储最新决议维持利率不变；若 10 月核心 CPI 环比明显高于预期、就业走强，年内仍可能加息。美国 9 月 CPI 同比已反弹至 3.7%。",
        why: "美国利率是全球资产定价的锚——利率更高更久意味着债券基金承压、成长股估值受压，而你的货基收益维持高位。",
        category: "macro",
        relatedLessons: [103, 106, 115],
      },
      {
        title: "中国 10 月制造业 PMI 回落至 49.3%",
        sourceName: "新浪财经",
        sourceUrl:
          "https://finance.sina.com.cn/roll/2026-10-31/doc-inixavkx7585374.shtml",
        fact: "10 月制造业 PMI 49.3%，比上月下降 0.8 个百分点，重回荣枯线下；高技术制造业（51.3%）仍处扩张区间。",
        why: "PMI 是经济先行指标——低于 50 提示制造业收缩，常伴随政策加码宽松的预期，对债券和政策受益风格资产是重要背景变量。",
        category: "china",
        relatedLessons: [111, 112],
      },
      {
        title: "A 股与美股走势分化",
        sourceName: "搜狐证券 / moomoo",
        sourceUrl: "https://q.stock.sohu.com/zs/000001/index.shtml",
        fact: "上证指数最新收涨 1.08% 报 3638 点；美股最近一夜受半导体与 AI 相关股票拖累下跌，纳指 100 一度跌至三个月低点。",
        why: "两地分化正是全球配置价值的活例子——重仓单一市场的人只能被动接受，做了全球配置的人体验平缓得多。",
        category: "markets",
        relatedLessons: [90, 68],
      },
    ],
    calendar: [
      "11 月 10 日（周二）：美国 10 月 CPI（北京时间 20:30/21:30）——本月最重要数据，直接决定 12 月利率预期",
    ],
  },
];
