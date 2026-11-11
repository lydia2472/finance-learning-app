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
  | "ai" // AI 行业与科技
  | "industry"; // 行业与公司

export type NewsItem = {
  title: string;
  titleEn?: string; // English title
  sourceName: string;
  sourceUrl: string;
  fact: string; // 发生了什么（一句话事实）
  factEn?: string; // English fact
  why: string; // 为什么和你的钱包有关（小白解读）
  whyEn?: string; // English why
  category: NewsCategory;
  relatedLessons?: number[]; // 关联课程 id（新闻 → 学习入口）
};

export type NewsEdition = {
  date: string; // YYYY-MM-DD
  headline: string; // 当日主线（一两句）
  headlineEn?: string; // English headline
  items: NewsItem[];
  calendar?: string[]; // 今日/近期经济日历
  calendarEn?: string[]; // English calendar
};

export const categoryMeta: Record<
  NewsCategory,
  { name: string; nameEn: string; chip: string }
> = {
  geopolitics: { name: "国际时政", nameEn: "Geopolitics", chip: "bg-rose-100 text-rose-700" },
  macro: { name: "宏观央行", nameEn: "Macro & Central Banks", chip: "bg-sky-100 text-sky-700" },
  china: { name: "国内政策", nameEn: "China Policy", chip: "bg-amber-100 text-amber-700" },
  markets: { name: "市场行情", nameEn: "Markets", chip: "bg-emerald-100 text-emerald-700" },
  ai: { name: "AI 科技", nameEn: "AI & Tech", chip: "bg-violet-100 text-violet-700" },
  industry: { name: "行业公司", nameEn: "Industry", chip: "bg-orange-100 text-orange-700" },
};

export const editions: NewsEdition[] = [
  {
    date: "2026-11-11",
    headline: "美国 10 月 CPI 超预期，债券收益率创 19 个月最大涨幅；Anthropic 寻求 1.4 万亿美元 IPO 估值；中国贸易顺差 10 个月破 1 万亿美元；A 股涨跌互现。",
    headlineEn: "US October CPI hotter than expected — bond yields surge most in 19 months; Anthropic seeks $1.4 trillion IPO valuation; China trade surplus tops $1 trillion in 10 months; A-shares mixed.",
    items: [
      {
        title: "美国 10 月 CPI 超预期，加息预期升温",
        titleEn: "US October CPI comes in hot — rate hike expectations rise",
        sourceName: "CNN Business",
        sourceUrl: "https://www.cnn.com/2026/11/10/business/us-inflation-cpi-consumer-prices-october",
        fact: "美国 10 月 CPI 环比 +0.4%、核心 CPI 环比 +0.3%，均超市场预期；数据公布后美债收益率飙升——创 19 个月最大单日涨幅，交易员大幅提高 12 月加息概率。",
        factEn: "US October CPI rose 0.4% MoM (headline) and 0.3% (core), both above expectations; Treasury yields surged — the biggest jump in 19 months — as traders sharply increased December rate hike odds.",
        why: "通胀超预期→加息概率上升→债券价格下跌、成长股估值承压（第 103 课利率传导）。这是本周最重要的数据，如果你持有美债基金或纳指基金，昨晚的波动就是原因。",
        whyEn: "Hot inflation → higher rate odds → bond prices fall, growth stocks pressured (Lesson 103). This was the week's most important data — if you hold US bond or Nasdaq funds, last night's volatility is why.",
        category: "macro",
        relatedLessons: [103, 106, 58],
      },
      {
        title: "Anthropic 寻求 1.4 万亿美元 IPO 估值",
        titleEn: "Anthropic to seek $1.4 trillion valuation in blockbuster IPO",
        sourceName: "CNN Business",
        sourceUrl: "https://www.cnn.com/2026/11/10/investing/weve-never-seen-anything-like-anthropic-ipo",
        fact: "Anthropic 计划以约 1.4 万亿美元估值进行 IPO，或成为史上最大规模之一。公司同时警告部分 AI 模型可能很快具备自我复制能力，构成安全隐患。",
        factEn: "Anthropic plans to IPO at a ~$1.4 trillion valuation — potentially one of the largest ever. The company simultaneously warned that certain AI models could soon self-replicate, posing safety concerns.",
        why: "1.4 万亿估值意味着 Anthropic 超过了绝大多数上市公司——但该公司自己也承认存在『生存风险』（第 146 课的『这次不一样』值得重读）。AI 泡沫还是革命？市场即将投票。",
        whyEn: "$1.4T valuation would make Anthropic larger than almost all public companies — yet the company itself warns of existential risks (Lesson 146's 'this time is different' is worth re-reading). AI bubble or revolution? The market is about to vote.",
        category: "ai",
        relatedLessons: [146, 74, 55],
      },
      {
        title: "中国贸易顺差 10 个月突破 1 万亿美元，AI 热潮推动出口",
        titleEn: "China trade surplus tops $1 trillion in 10 months as AI boom drives exports",
        sourceName: "CNN Business",
        sourceUrl: "https://www.cnn.com/2026/11/09/business/china-trade-surplus-1-trillion-intl-hnk",
        fact: "受益于 AI 产业链需求爆发，中国 2026 年前 10 个月贸易顺差突破 1 万亿美元，创历史纪录。芯片、电子元器件等出口大幅增长。",
        factEn: "Driven by AI supply chain demand, China's trade surplus exceeded $1 trillion in the first 10 months of 2026 — a record. Chip and electronics exports surged.",
        why: "巨额顺差推升人民币升值压力——这正是央行 11 月 15 日上调外汇存款准备金率的背景（第 115 课汇率制度）。出口相关板块基本面有支撑，但贸易摩擦风险也在积累。",
        whyEn: "Massive surplus adds upward pressure on the yuan — this is why the PBOC is hiking FX reserve requirements on Nov 15 (Lesson 115). Export-linked sectors have fundamental support, but trade friction risks are building.",
        category: "china",
        relatedLessons: [115, 116, 31],
      },
      {
        title: "全球市场涨跌互现：A 股小涨、美股因 CPI 回落",
        titleEn: "Markets mixed: A-shares up slightly, US stocks fall on CPI",
        sourceName: "Wind",
        sourceUrl: "https://q.stock.sohu.com/zs/000001/index.shtml",
        fact: "11 月 10 日收盘：沪深300 +0.07%、中证500 +0.91%、恒生综合 +0.74%；美股因 CPI 超预期回落（标普500 −0.38%、纳指100 −0.60%）。",
        factEn: "Nov 10 close: CSI300 +0.07%, CSI500 +0.91%, Hang Seng +0.74%; US stocks fell on hot CPI (S&P500 −0.38%, Nasdaq100 −0.60%).",
        why: "A 股因 PPI 强劲和贸易顺差利好而相对坚挺，美股因通胀超预期承压——两地再次分化，全球配置的优势持续显现（第 90 课）。",
        whyEn: "A-shares held up on strong PPI and record trade surplus, while US stocks fell on hot CPI — divergence continues, highlighting global allocation's advantage (Lesson 90).",
        category: "markets",
        relatedLessons: [90, 68, 103],
      },
    ],
    calendar: [
      "本周：中国 10 月 M2/社融/新增贷款数据",
      "11 月 15 日：中国外汇存款准备金率上调正式实施",
      "12 月 FOMC：市场因 CPI 超预期大幅提高 12 月加息概率",
    ],
    calendarEn: [
      "This week: China October M2 / aggregate financing / new loans",
      "Nov 15: China FX reserve requirement hike takes effect",
      "December FOMC: Hot CPI sharply increased December rate hike odds",
    ],
  },
  {
    date: "2026-11-10",
    headline: "中国 PPI 同比 +5.7% 创 52 个月新高，上游通胀压力大；美股周一强劲反弹（纳指 +3.40%）；英伟达 CEO 调查持续发酵；今日美国 CPI + 关税生效日双重节点。",
    headlineEn: "China PPI surges 5.7% YoY — highest in 52 months, upstream inflation pressure builds; US markets rebound strongly Monday (Nasdaq +3.40%); Nvidia CEO investigation deepens; US CPI + tariff deadline hit today.",
    items: [
      {
        title: "中国 10 月 PPI 同比 +5.7%，创近 52 个月新高",
        titleEn: "China October PPI jumps 5.7% YoY — highest in 52 months",
        sourceName: "国家统计局",
        sourceUrl: "https://www.stats.gov.cn/sj/zxfb/",
        fact: "10 月 PPI 同比上涨 5.7%（环比 +0.7%），创近四年新高；但 CPI 同比仅涨 0.7%——上游成本大涨尚未传导至消费品端。",
        factEn: "October PPI rose 5.7% YoY (0.7% MoM), the highest in nearly four years; but CPI rose only 0.7% — upstream cost surges have not yet reached consumer prices.",
        why: "PPI 与 CPI 的巨大剪刀差意味着企业利润被挤压或未来成本将传导至消费端（第 107 课成本推动型通胀）。央行面临两难：PPI 高企限制宽松空间，但 CPI 温和又支持宽松——对债市影响取决于哪个信号占上风。",
        whyEn: "The huge PPI-CPI gap means either corporate margins are squeezed or costs will eventually pass through to consumers (Lesson 107 cost-push inflation). The central bank faces a dilemma: high PPI limits easing, but mild CPI supports it.",
        category: "china",
        relatedLessons: [107, 106, 108],
      },
      {
        title: "美股周一强劲反弹：纳指 +3.40%，标普 +2.35%",
        titleEn: "US markets rebound strongly Monday: Nasdaq +3.40%, S&P 500 +2.35%",
        sourceName: "Wind / TradingKey",
        sourceUrl: "https://www.cnn.com/2026/11/09/investing/nvidia-stock-huang-investigation",
        fact: "11 月 9 日（周一）收盘：标普500 +2.35%、纳指100 +3.40%——上周暴跌后的强劲修复；但英伟达逆势下跌 7%（CEO 调查影响持续）。",
        factEn: "Nov 9 (Mon) close: S&P500 +2.35%, Nasdaq100 +3.40% — strong recovery after last week's crash; but Nvidia fell 7% on CEO investigation concerns.",
        why: "V 型反弹印证了第 84 课微笑曲线——定投者在暴跌中买入的份额此刻正在获利。但英伟达的逆势下跌提醒你：系统性和个体风险要分开管理（第 68 课）。",
        whyEn: "V-shaped rebound confirms Lesson 84's smile curve — DCA investors who bought during the crash are now profiting. But Nvidia's divergence reminds you: systematic and idiosyncratic risks need separate management (Lesson 68).",
        category: "markets",
        relatedLessons: [84, 68, 67],
      },
      {
        title: "英伟达 CEO 调查持续：没有黄仁勋的英伟达能活吗？",
        titleEn: "Nvidia CEO investigation deepens: Can it survive without Jensen Huang?",
        sourceName: "CNN Business",
        sourceUrl: "https://www.cnn.com/2026/11/09/business/nvidia-survive-without-jensen-huang",
        fact: "CNN 发文质疑英伟达在 CEO 黄仁勋被调查后的前景；股价周一逆势下跌 7%。英伟达是 AI 芯片供应链的核心，其动荡波及整个 AI 板块。",
        factEn: "CNN questions Nvidia's future after CEO Jensen Huang investigation; stock fell 7% Monday against the market rebound. Nvidia is central to the AI chip supply chain — its turmoil ripples through the entire AI sector.",
        why: "关键人物风险是单一公司最大的非系统性风险（第 94 课）。如果你持有 AI 主题基金，英伟达很可能是前三大权重股——CEO 风险会放大整个基金的波动。",
        whyEn: "Key-person risk is the biggest company-specific risk (Lesson 94). If you hold AI-themed funds, Nvidia is likely a top-3 holding — CEO risk amplifies the entire fund's volatility.",
        category: "ai",
        relatedLessons: [94, 68, 55],
      },
      {
        title: "今日双重节点：美国 10 月 CPI + 对华关税生效日",
        titleEn: "Double event today: US October CPI + China tariff deadline",
        sourceName: "BLS / 大西洋理事会",
        sourceUrl: "https://www.bls.gov",
        fact: "北京时间今晚 20:30/21:30 美国公布 10 月 CPI——直接决定 12 月 FOMC 是否加息；同日为对华 25% 关税措施原定生效日，结果待确认。",
        factEn: "US October CPI releases tonight (Beijing 20:30/21:30) — will directly determine December FOMC decision; today is also the original deadline for 25% China tariffs, outcome pending.",
        why: "CPI 高于预期→加息概率上升→债券和成长股承压（第 103 课利率传导）；关税生效→进口成本上升→成本推动通胀（第 116 课）。两个事件叠加可能放大今晚市场波动。",
        whyEn: "Hot CPI → higher rate expectations → pressure on bonds and growth stocks (Lesson 103); tariffs → import cost rise → cost-push inflation (Lesson 116). Both events together could amplify tonight's volatility.",
        category: "macro",
        relatedLessons: [103, 116, 110],
      },
    ],
    calendar: [
      "今日 20:30/21:30：美国 10 月 CPI — 本周最重要数据，决定 12 月是否加息",
      "今日：对华 25% 关税措施原定生效日（结果待确认）",
      "本周：中国 10 月 M2/社融/新增贷款数据",
      "11 月 15 日：中国外汇存款准备金率上调正式实施",
    ],
    calendarEn: [
      "Tonight 20:30/21:30 Beijing: US October CPI — most important data this week",
      "Today: 25% China tariff originally scheduled to take effect",
      "This week: China October M2 / aggregate financing / new loans data",
      "Nov 15: China FX reserve requirement hike takes effect",
    ],
  },
  {
    date: "2026-11-09",
    headline: "英伟达调查 CEO 黄仁勋；SpaceX 反弹 8% 后马斯克称政府合同占比将降至 10% 以下；中国今日发布 10 月 PPI 数据；A股/美股上周五企稳。",
    headlineEn: "Nvidia launches investigation into CEO Jensen Huang; SpaceX rebounds 8% as Musk says gov contracts will fall below 10% of revenue; China releases October PPI today; Markets stabilized Friday.",
    items: [
      {
        title: "英伟达调查 CEO 黄仁勋涉外国情报问题",
        titleEn: "Nvidia launches investigation into CEO Jensen Huang over foreign intelligence concerns",
        sourceName: "CNN Business",
        sourceUrl: "https://www.cnn.com/2026/11/08/business/nvidia-investigation-ceo-jensen-huang",
        fact: "英伟达宣布对 CEO 黄仁勋展开调查，涉及外国情报相关问题。这是 AI 芯片龙头在经历上周股价暴跌后面临的又一重大不确定性。",
        factEn: "Nvidia announced an investigation into CEO Jensen Huang over foreign intelligence concerns — another major uncertainty for the AI chip leader after last week's sell-off.",
        why: "CEO 风险是单一公司最大的非系统性风险之一（第 68 课）——如果你持有英伟达或重仓半导体基金，这条新闻直接影响你的仓位。分散投资可以大幅降低这种个体风险。",
        whyEn: "CEO risk is one of the biggest company-specific risks (Lesson 68) — if you hold NVDA or semiconductor funds, this directly impacts your position. Diversification significantly reduces this idiosyncratic risk.",
        category: "ai",
        relatedLessons: [68, 55, 94],
      },
      {
        title: "SpaceX 反弹 8%，马斯克称政府合同将降至收入 10% 以下",
        titleEn: "SpaceX rebounds 8% as Musk says government contracts to fall below 10% of revenue",
        sourceName: "Reuters / Barchart",
        sourceUrl: "https://www.reuters.com/business/media-telecom/spacex-tesla-extend-losses-midterm-results-cloud-data-center-merger-outlook-2026-11-05",
        fact: "SpaceX 上周五涨约 8% 至 $123.62；马斯克表示 Q4 政府合同收入占比将降至 10% 以下，缓解了市场对民主党控制国会后削减政府合同的担忧。但苏格兰抵押贷款投资信托清仓了剩余 Tesla 持仓。",
        factEn: "SpaceX rose ~8% to $123.62 on Friday; Musk said Q4 government contract revenue will fall below 10% of total, easing concerns about Democratic Congress cutting contracts. However, Scottish Mortgage Trust sold its remaining Tesla stake.",
        why: "降低政府合同依赖是 SpaceX 对冲政治风险的正确策略（第 117 课地缘政治通道），但长期股东 Scottish Mortgage 的清仓是一个值得注意的信号——『聪明钱』用脚投票。",
        whyEn: "Reducing government dependence is the right strategy to hedge political risk (Lesson 117). But long-time backer Scottish Mortgage selling its remaining stake is a signal worth noting — 'smart money' votes with its feet.",
        category: "industry",
        relatedLessons: [117, 63, 94],
      },
      {
        title: "中国今日发布 10 月 PPI，通胀路径关注焦点",
        titleEn: "China releases October PPI today — focus on inflation path",
        sourceName: "国家统计局",
        sourceUrl: "https://www.stats.gov.cn/sj/zxfb/",
        fact: "国家统计局今日 9:30 发布 10 月工业生产者价格指数（PPI）月度报告。PPI 反映上游生产成本，是 CPI 的领先指标之一。",
        factEn: "China's National Bureau of Statistics releases October PPI (Producer Price Index) today at 9:30 AM. PPI reflects upstream production costs and is a leading indicator for CPI.",
        why: "PPI 持续为负意味着上游通缩压力仍在（第 108 课），央行可能维持宽松——对债券和股市都是支撑。PPI 回升则暗示成本推动型通胀可能传导至消费品（第 107 课）。",
        whyEn: "Persistent negative PPI means upstream deflation pressure (Lesson 108), supporting central bank easing — positive for bonds and stocks. Rising PPI suggests cost-push inflation may reach consumers (Lesson 107).",
        category: "china",
        relatedLessons: [107, 108, 106],
      },
      {
        title: "全球市场上周五企稳：A 股反弹、美股芯片股领涨",
        titleEn: "Markets stabilized Friday: A-shares rebound, US chip stocks lead",
        sourceName: "Wind / CNN Business",
        sourceUrl: "https://www.cnn.com/2026/11/07/investing/ai-nerves-diversify-portfolio",
        fact: "11 月 6 日（周五）收盘：美股纳指100 +1.35%、费半 +4.21%；A 股本周前四日大跌后周五有所回稳。上周全球市场经历了中期选举后的剧烈波动。",
        factEn: "Nov 6 (Fri) close: Nasdaq100 +1.35%, Philly Semi +4.21%; A-shares stabilized after a volatile week. Global markets experienced sharp swings following the midterm elections.",
        why: "市场在大跌后企稳反弹是正常的均值回归——但如果你在暴跌中恐慌卖出，就错过了反弹（第 95 课五问清单）。定投者则利用下跌积累了便宜份额（第 84 课微笑曲线）。",
        whyEn: "Post-crash stabilization is normal mean reversion — but panic sellers missed the rebound (Lesson 95 checklist). DCA investors accumulated cheap shares during the dip (Lesson 84 smile curve).",
        category: "markets",
        relatedLessons: [95, 84, 67],
      },
    ],
    calendar: [
      "今日：中国 10 月 PPI 数据发布（9:30）",
      "11 月 10 日（周二）：美国 10 月 CPI（北京时间 20:30/21:30）——本周最重要数据",
      "11 月 10 日：对华 25% 关税措施原定生效日",
      "11 月 15 日：中国外汇存款准备金率上调正式实施",
    ],
    calendarEn: [
      "Today: China October PPI release (9:30 AM Beijing)",
      "Nov 10 (Tue): US October CPI (Beijing 20:30/21:30) — most important data this week",
      "Nov 10: 25% China tariff measure originally scheduled",
      "Nov 15: China FX reserve requirement hike takes effect",
    ],
  },
  {
    date: "2026-11-08",
    headline:
      "周末版：AI 恐慌强化分散投资价值；A 股受美股暴跌冲击回落但相对抗跌；OpenAI/Anthropic 支持英国强制 AI 监管；SpaceX/Tesla 连续第三天反弹。",
    headlineEn:
      "Weekend Edition: AI panic reinforces the value of diversification; A-shares fell on US crash but showed relative resilience; OpenAI/Anthropic back binding UK AI regulation; SpaceX/Tesla rebound for third straight day.",
    items: [
      {
        title: "AI 恐慌给投资者上了一课：分散投资",
        titleEn: "AI panic teaches investors an age-old lesson: diversify",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/07/investing/ai-nerves-diversify-portfolio",
        fact: "CNN 发表分析文章指出，本周科技股 2.5 万亿美元的抛售再次证明了分散投资的永恒价值——重仓 AI 或科技板块的投资者遭受了远超大盘的损失。",
        factEn: "CNN analysis: this week's $2.5 trillion tech sell-off proves the timeless value of diversification — investors concentrated in AI/tech suffered losses far exceeding the broader market.",
        why: "这正是我们课程第 68 课『分散投资：唯一的免费午餐』的现实教材——本周全球配置者的最大回撤远小于单一科技仓位持有者。如果你还没做分散，现在就是最好的时机。",
        whyEn: "This is the real-world textbook for Lesson 68 — globally diversified investors experienced far smaller drawdowns than concentrated tech holders. If you haven't diversified yet, now is the best time.",
        category: "markets",
        relatedLessons: [68, 90, 70],
      },
      {
        title: "A 股受美股暴跌冲击回落，但展现相对韧性",
        titleEn: "A-shares fell on US crash impact but showed relative resilience",
        sourceName: "Wind（本站市场快照）",
        sourceUrl: "https://q.stock.sohu.com/zs/000001/index.shtml",
        fact: "11 月 6 日（周五）收盘：上证50 −0.84%、沪深300 −1.44%、中证500 −2.13%；同日美股企稳反弹（标普500 +0.31%、纳指100 +1.35%、费半 +4.21%）。",
        factEn: "Nov 6 (Fri) close: SSE50 −0.84%, CSI300 −1.44%, CSI500 −2.13%; US markets rebounded same day (S&P500 +0.31%, Nasdaq100 +1.35%, Philly Semi +4.21%).",
        why: "A 股受隔夜美股暴跌影响低开回落，但跌幅远小于美股前日（纳指 −6.36%）——这正是两地不完全相关的证据（第 69 课），也是全球配置有效性的数学基础。",
        whyEn: "A-shares fell far less than US markets did the previous day (Nasdaq −6.36%) — evidence of imperfect correlation (Lesson 69), the mathematical foundation of global allocation.",
        category: "markets",
        relatedLessons: [69, 90, 68],
      },
      {
        title: "OpenAI 与 Anthropic 支持英国强制 AI 监管",
        titleEn: "OpenAI and Anthropic back binding UK AI regulation",
        sourceName: "MLQ.ai",
        sourceUrl:
          "https://mlq.ai/news/openai-and-anthropic-split-with-rivals-over-binding-uk-ai-rules",
        fact: "OpenAI 和 Anthropic 告知英国议员，前沿 AI 的自愿承诺应被强制要求取代，与反对强制监管的竞争对手分裂；美国 FTC 已对两家公司展开广泛调查；欧盟 AI 法案已于 8 月 2 日全面生效。",
        factEn: "OpenAI and Anthropic told UK lawmakers that voluntary AI commitments should be replaced by binding requirements; the US FTC has opened investigations into both; the EU AI Act fully took effect Aug 2.",
        why: "AI 监管趋严是确定性趋势——民主党夺回国会后可能加速美国 AI 立法。持有 AI 主题基金的人需要理解：监管是估值变量之一（第 146 课），过度集中的 AI 仓位正在被市场重新定价。",
        whyEn: "Tighter AI regulation is a certainty — Democratic control of Congress may accelerate US AI legislation. AI fund holders should understand: regulation is a valuation variable (Lesson 146).",
        category: "ai",
        relatedLessons: [146, 55, 74],
      },
      {
        title: "SpaceX/Tesla 连续第三天反弹，从暴跌中恢复",
        titleEn: "SpaceX/Tesla rebound for third straight day after crash",
        sourceName: "Yahoo Finance",
        sourceUrl:
          "https://www.cnn.com/2026/11/05/business/musk-texas-donations-midterms-spacex-tesla",
        fact: "SpaceX 本周暴跌 22% 后连续第三天上涨，TSLA 反弹 +4.57%；SPCX 已被纳入罗素 1000 和纳斯达克 100 指数，强制被动买盘提供了一定支撑。",
        factEn: "SpaceX rose for a third day after a 22% weekly crash; TSLA rebounded +4.57%. SPCX was added to the Russell 1000 and Nasdaq-100, providing passive buying support.",
        why: "纳入指数意味着指数基金必须买入——这是一种结构性的买盘来源（第 63 课指数化）。但单周 ±9% 的波动也提醒你 SPCX 的风险特征更接近单一公司而非分散指数（第 67 课）。",
        whyEn: "Index inclusion means index funds must buy — a structural buying source (Lesson 63). But ±9% weekly swings remind you SPCX behaves more like a single stock than a diversified index (Lesson 67).",
        category: "industry",
        relatedLessons: [63, 67, 68],
      },
      {
        title: "俄罗斯柴油即将运抵美国，制裁体系现裂缝",
        titleEn: "Russian diesel headed for US shores as sanctions show cracks",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/07/business/russian-diesel-us-sanctions-trump-intl",
        fact: "一艘装载俄罗斯柴油的油轮正驶向美国东海岸——自 2022 年制裁以来首次，显示制裁体系出现松动。",
        factEn: "A tanker carrying Russian diesel is heading for the US East Coast — the first since 2022 sanctions, showing the regime is loosening.",
        why: "制裁松动可能压低国际柴油价格，进而影响通胀路径——第 107 课的『成本推动型通胀』变量正在变化。持有能源相关资产的人需要关注（第 117 课地缘政治四通道）。",
        whyEn: "Loosening sanctions could depress diesel prices, affecting the inflation path (Lesson 107 cost-push inflation). Energy asset holders should watch this (Lesson 117 geopolitics channel).",
        category: "geopolitics",
        relatedLessons: [107, 117, 116],
      },
    ],
    calendar: [
      "11 月 10 日（周二）：美国 10 月 CPI（北京时间 20:30/21:30）——本周最重要数据，决定 12 月 FOMC 是否加息",
      "11 月 10 日：对华 25% 关税措施原定生效日",
      "11 月 15 日：中国外汇存款准备金率上调正式实施",
    ],
    calendarEn: [
      "Nov 10 (Tue): US October CPI (Beijing 20:30/21:30) — the most important data this week",
      "Nov 10: 25% China tariff measure originally scheduled to take effect",
      "Nov 15: China FX reserve requirement hike takes effect",
    ],
  },
  {
    date: "2026-11-07",
    headline:
      "特斯拉宣布停产 Cybertruck；SpaceX 暴跌后强劲反弹 9.37%；美国 10 月非农新增 16.5 万超预期；A 股回落、美股企稳。",
    items: [
      {
        title: "特斯拉宣布停产 Cybertruck",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/06/business/tesla-winding-down-production-of-cybertruck",
        fact: "特斯拉即将终止 Cybertruck 的生产。这款曾被视为特斯拉增长引擎的电动皮卡，在销量持续低迷后成为公司最大的产品失败之一。",
        why: "产品线收缩通常伴随减值和重组成本——特斯拉本周已因选举结果蒸发 4200 亿市值，Cybertruck 停产将进一步压估值。持有 TSLA 或汽车行业基金的人需要关注（第 94 课）。",
        category: "industry",
        relatedLessons: [94, 55, 146],
      },
      {
        title: "SpaceX 暴跌后强劲反弹 9.37%",
        sourceName: "Yahoo Finance",
        sourceUrl:
          "https://www.cnn.com/2026/11/05/markets/asian-markets-us-rout-ai-investment-intl-hnk",
        fact: "SPCX 在 11 月 5 日暴跌 9.17% 后，11 月 6 日反弹 9.37% 至 $134.27；两日暴跌 12.5% 后买盘涌入，分析师认为超卖反弹叠加芯片股全线回暖。",
        why: "V 型反转正是第 84 课微笑曲线的现实版——定投者在下跌中买入的份额此刻正在获利。但也提醒你：单日 ±9% 的波动说明 SPCX 的年化波动率远超指数（第 67 课）。",
        category: "markets",
        relatedLessons: [84, 67, 68],
      },
      {
        title: "美国 10 月非农新增 16.5 万，失业率下降",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/06/economy/us-jobs-report-october",
        fact: "美国 10 月非农就业新增 16.5 万人，失业率下降，超出市场预期；数据公布后美股芯片股反弹，费城半导体指数大涨约 500 点。",
        why: "强劲就业=经济没那么差=企业盈利有支撑——但第 110 课的提醒：过热期强劲非农也可能是『好消息变坏消息』，因为它降低降息概率。11 月 10 日 CPI 将是关键。",
        category: "macro",
        relatedLessons: [110, 103, 104],
      },
      {
        title: "A 股回调：沪深300 跌 1.44%，隔日跟随全球市场情绪",
        sourceName: "Wind（本站市场快照）",
        sourceUrl: "https://q.stock.sohu.com/zs/000001/index.shtml",
        fact: "11 月 6 日收盘：上证50 −0.84%、沪深300 −1.44%、中证500 −2.13%、恒生综合 −1.63%；美股同日企稳（标普500 +0.31%、纳指100 +1.35%）。",
        why: "A 股在前两日央行降息驱动的大涨后回落属于正常——第 84 课的定投纪律：涨了不追、跌了不停扣。全球配置者此刻的美股反弹正好对冲了 A 股回调。",
        category: "markets",
        relatedLessons: [84, 90, 68],
      },
    ],
    calendar: [
      "11 月 10 日（周二）：美国 10 月 CPI（北京时间 20:30/21:30）——暴跌反弹后的市场走向将由这份数据定调",
      "11 月 10 日：对华 25% 关税措施原定生效日",
      "11 月 15 日：中国外汇存款准备金率上调正式实施",
    ],
  },
  {
    date: "2026-11-06",
    headline:
      "美股科技股大崩盘：纳指100 暴跌 6.36%、标普500 跌 4.36%，市值蒸发 2.5 万亿美元；马斯克帝国两日蒸发超 4200 亿；A 股逆势坚挺（中证500 +1.80%）。",
    items: [
      {
        title: "美股科技股大崩盘：纳指跌入回调区间，2.5 万亿美元市值蒸发",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/05/investing/tech-heavy-nasdaq-plunges",
        fact: "11 月 5 日标普500 跌 4.36%、纳指100 暴跌 6.36%，跌入技术性回调；民主党夺回国会后市场重新评估 AI 景气周期的可持续性，大型科技股遭大幅抛售。",
        why: "这就是第 67 课『最大回撤』的现场版——你的组合里如果有美股科技仓位，今天感受的波动就是历史统计里那 −35%~-40% 回撤的组成部分。第 95 课的五问清单现在正该用上。",
        category: "markets",
        relatedLessons: [67, 95, 112],
      },
      {
        title: "马斯克帝国两日蒸发 4200 亿美元，SpaceX 单日跌 9.17%",
        sourceName: "CNBC / Yahoo Finance",
        sourceUrl:
          "https://www.cnn.com/2026/11/05/business/musk-texas-donations-midterms-spacex-tesla",
        fact: "中期选举民主党在德州获胜后，SpaceX 11 月 5 日暴跌 9.17%至 $135.92 以下，Tesla 同步下跌；马斯克两家公司两日合计市值蒸发超 4200 亿美元，此前传闻的 SpaceX-Tesla 合并计划面临搁浅。",
        why: "政治押注的代价还在持续——第 117 课的地缘政治传导链完整呈现：选举结果→政府合同不确定性→AI 基建审批收紧→股价重挫。如果你重仓了 SPCX/TSLA，这提醒你单一公司集中度风险（第 68 课）。",
        category: "industry",
        relatedLessons: [117, 68, 94],
      },
      {
        title: "A 股逆势坚挺：中证500 涨 1.80%，与美股走势罕见分化",
        sourceName: "Wind（本站市场快照）",
        sourceUrl: "https://q.stock.sohu.com/zs/000001/index.shtml",
        fact: "11 月 5 日收盘：上证50 +0.09%、沪深300 +0.29%、中证500 +1.80%；同日美股标普500 −4.36%、纳指100 −6.36%。两地走势罕见大幅分化。",
        why: "A 股受中国央行降息支撑、美股受选举结果冲击——这正是第 90 课全球配置的核心价值：两地不相关时，全球组合的波动远小于单一市场满仓。",
        category: "markets",
        relatedLessons: [90, 68, 69],
      },
      {
        title: "Anthropic IPO 在即：AI 安全与华尔街利益的碰撞",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/03/tech/anthropic-ipo-ai-safety",
        fact: "Anthropic——以『安全优先』著称的 AI 公司——即将上市；其近 100 页的风险清单涵盖从生物武器到敲诈，引发市场对 AI 商业化与安全平衡的讨论。",
        why: "AI 板块正处在关键转折：选举后监管可能收紧+估值高企+安全争议——第 146 课的『这次不一样』值得在追入 AI 主题基金前重读一遍。",
        category: "industry",
        relatedLessons: [146, 74, 55],
      },
    ],
    calendar: [
      "11 月 10 日（周二）：美国 10 月 CPI（北京时间 20:30/21:30）——数据好坏将决定暴跌后的市场走向",
      "11 月 10 日：对华 25% 关税措施原定生效日",
      "11 月 15 日：中国外汇存款准备金率上调正式实施",
    ],
  },
  {
    date: "2026-11-05",
    headline:
      "中国央行 3000 亿逆回购+降息双管齐下，A 股全线大涨；美股道指暴涨 1200 点庆祝民主党夺回国会；马斯克 5 亿美元选举豪赌惨败，SpaceX/Tesla 蒸发 1200 亿美元市值。",
    items: [
      {
        title: "中国央行 3000 亿逆回购 + 下调再贷款利率至 1%",
        sourceName: "新华财经 / 人民网",
        sourceUrl: "https://m.cnfin.com/yw-lb//zixun/20261104/4491028_1.html",
        fact: "央行 11 月 5 日开展 3000 亿元 3 个月买断式逆回购；同日起下调股票回购增持再贷款利率 0.25 个百分点至 1%，维护资本市场平稳运行。",
        why: "双管齐下注入流动性+降低资金成本——这是第 102 课降息传导的完整版：债券受益、股票估值抬升、你的货基收益短期不受影响。",
        category: "china",
        relatedLessons: [102, 103, 58],
      },
      {
        title: "美股道指暴涨 1200 点，民主党夺回国会获市场欢迎",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/04/investing/us-markets-midterm-elections",
        fact: "道琼斯指数 11 月 4 日收涨 1200 点（+2%+），标普500 涨 1.58%，纳指100 涨 0.91%；市场解读民主党夺回国会为财政刺激可能加码的信号。",
        why: "选举不确定性消除后市场反弹——但注意第 112 课的提醒：『国会分裂=财政博弈加剧』，长期通胀路径才是债市的关键变量。",
        category: "markets",
        relatedLessons: [112, 113, 55],
      },
      {
        title: "马斯克 5 亿美元选举豪赌惨败，SpaceX/Tesla 蒸发 1200 亿",
        sourceName: "Bloomberg / NYT",
        sourceUrl:
          "https://www.bloomberg.com/news/articles/2026-11-04/tesla-spacex-shares-take-early-hit-as-midterm-blue-wave-unfolds",
        fact: "SpaceX 盘初跌 6.9%、Tesla 跌 5%；马斯克旗下公司合计蒸发超 1200 亿美元市值；他投入近 5 亿美元支持的共和党候选人多数落败，SpaceX-Tesla 合并计划也被打上问号。",
        why: "这是第 117 课地缘政治影响市场的教科书案例——政治押注的代价直接反映在你的持仓上（如果你持有 SPCX 或 TSLA）。",
        category: "industry",
        relatedLessons: [117, 55, 94],
      },
      {
        title: "CVS 宣布拆分为两家公司",
        sourceName: "CNN Business",
        sourceUrl:
          "https://www.cnn.com/2026/11/04/business/cvs-to-split-into-two-companies",
        fact: "CVS Health 宣布将其 1170 亿美元医疗帝国拆分为保险公司和药店零售两家独立上市公司。",
        why: "大型企业拆分往往释放价值（第 162 课 WACC 的逻辑：不同业务的资本成本不同）；也提醒你持仓的行业基金可能面临成分股变动。",
        category: "industry",
        relatedLessons: [162, 79],
      },
      {
        title: "A 股全线大涨，中证500 领涨 4.66%",
        sourceName: "Wind（本站市场快照）",
        sourceUrl: "https://q.stock.sohu.com/zs/000001/index.shtml",
        fact: "11 月 4 日收盘：沪深300 +2.31%、中证500 +4.66%、上证50 +1.45%、恒生综合 +1.86%；美股同日也大涨（标普500 +1.58%）。",
        why: "中美市场罕见同步上涨——中国靠降息、美国靠选举落地。但A股年内仍跌 11%+，美股涨 12%+——第 90 课的全球配置逻辑不变。",
        category: "markets",
        relatedLessons: [90, 68, 102],
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
