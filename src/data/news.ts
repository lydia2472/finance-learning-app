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
  { name: string; chip: string }
> = {
  geopolitics: { name: "国际时政", chip: "bg-rose-100 text-rose-700" },
  macro: { name: "宏观央行", chip: "bg-sky-100 text-sky-700" },
  china: { name: "国内政策", chip: "bg-amber-100 text-amber-700" },
  markets: { name: "市场行情", chip: "bg-emerald-100 text-emerald-700" },
  ai: { name: "AI 科技", chip: "bg-violet-100 text-violet-700" },
  industry: { name: "行业公司", chip: "bg-orange-100 text-orange-700" },
};

export const editions: NewsEdition[] = [
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
