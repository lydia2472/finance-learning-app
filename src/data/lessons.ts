// 阶段 1 · 金钱观与理财启蒙 —— 全部 15 课内容
// 内容依据产品设计文档第 3 章流程生产：权威来源取材 → 改写为小白语言 → 人工核对数字
// 每课的数字例子均已人工验算

export type QuizItem = {
  question: string;
  options: string[];
  answer: number; // 正确选项下标
  explanation: string;
};

export type SourceLink = { label: string; url: string };

export type Lesson = {
  id: number;
  title: string;
  titleEn: string;
  difficulty: 1 | 2 | 3;
  minutes: number;
  intro: string;
  explanation: string; // markdown
  example: string; // markdown
  quiz: QuizItem[];
  sources: SourceLink[];
};

export type Stage = {
  no: number;
  name: string;
  desc: string;
  lessons: Lesson[];
};

export const stage1: Stage = {
  no: 1,
  name: "金钱观与理财启蒙",
  desc: "建立正确的金钱观：复利、通胀、记账、预算、应急基金——投资之前先打地基。",
  lessons: [
    {
      id: 1,
      title: "为什么你需要懂一点金融",
      titleEn: "Why Finance Matters",
      difficulty: 1,
      minutes: 6,
      intro: "学金融不是为了暴富，而是为了不踩坑。",
      explanation: `金融知识不是专业投资者的专利，而是现代人的生活技能。你每天都在做金融决策：房租占收入多少合适、保险怎么挑、要不要提前还贷、养老金怎么准备——不懂规则，就只能听别人安排。

不懂金融的代价往往是**隐性的**：存款被通胀慢慢侵蚀、买了不适合的保险、在高点跟风买入、掉进"高收益"骗局。它们不像被偷钱包那样明显，却可能让你损失更多。

这门课的目标不是教你预测市场、快速致富，而是帮你**理解规则、避开大多数可以避免的亏损**。用 150 节课、每天 5-10 分钟，把从小白到能独立管理投资所需的地图补全。`,
      example: `同样是 10 万元，放 30 年，不同"金融理解力"下的差别（只算这一笔钱，不再新增）：

- 全部放活期（年化 0.3%）：约 **10.9 万**
- 放货币基金（年化 3%）：约 **24.3 万**
- 做长期分散投资（年化 6%，大致是历史上分散股债组合的长期量级）：约 **57.4 万**

收益率的差异来自理解：知道通胀的存在、知道复利、知道分散——每一点理解，都会被时间放大几十年。`,
      quiz: [
        {
          question: "学这门课的首要目标是什么？",
          options: ["学会预测市场涨跌", "理解规则、避开可避免的亏损", "跟着买热门产品", "快速实现财务自由"],
          answer: 1,
          explanation: "短期市场几乎不可预测；对普通人来说，避开愚蠢的错误才是收益的主要来源。",
        },
        {
          question: "「不懂金融的代价」通常是怎样的？",
          options: ["一次性亏光", "隐性且持续（通胀侵蚀、买错产品、被骗）", "立刻就能察觉", "只影响有钱人"],
          answer: 1,
          explanation: "通胀侵蚀、买错保险、高点接盘——都是温水煮青蛙式的隐性损失。",
        },
        {
          question: "10 万元按年化 6% 复利 30 年，大约是多少？",
          options: ["18 万", "28 万", "57 万", "160 万"],
          answer: 2,
          explanation: "1.06 的 30 次方约 5.74，10 万 × 5.74 ≈ 57.4 万。",
        },
      ],
      sources: [
        { label: "SEC · Introduction to Investing（公共领域）", url: "https://www.investor.gov/introduction-investing" },
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
      ],
    },
    {
      id: 2,
      title: "复利：世界第八大奇迹",
      titleEn: "Compound Interest",
      difficulty: 1,
      minutes: 6,
      intro: "利息生利息，时间是普通人最大的杠杆。",
      explanation: `**复利**（Compound Interest）就是"利息也能生利息"：第一年赚的利息，第二年加入本金一起继续赚。公式：终值 = 本金 × (1 + 利率)^年数。

复利有三个变量：本金、利率、**时间**。大多数人盯着前两个，其实普通人最用得上的杠杆是时间——本金靠慢慢攒，高收益伴随高风险，唯有时间是每个人公平拥有、且效果最惊人的一个。

顺带说句诚实话：传说中爱因斯坦称复利为"世界第八大奇迹"，出处已不可考，多半是都市传说——但复利的效果本身是真的。`,
      example: `10 万元，年化 8%，放着不动：

- 10 年后：10 × 1.08¹⁰ ≈ **21.6 万**
- 20 年后：10 × 1.08²⁰ ≈ **46.6 万**
- 30 年后：10 × 1.08³⁰ ≈ **100.6 万**

再看"早 10 年"的差距——每年投 1 万元、年化 6%、都投到 60 岁：

- 25 岁开始（投 35 年）：约 **111 万**
- 35 岁开始（投 25 年）：约 **55 万**

晚开始 10 年，结果少了一半。这就是"时间是最大的杠杆"。`,
      quiz: [
        {
          question: "10 万元按年化 8% 复利 10 年，大约是多少？",
          options: ["18 万", "21.6 万", "28 万", "80 万"],
          answer: 1,
          explanation: "1.08 的 10 次方约 2.16，10 万 × 2.16 ≈ 21.6 万。",
        },
        {
          question: "对普通人来说，复利三变量中最可控、杠杆最大的通常是？",
          options: ["本金", "利率", "时间", "运气"],
          answer: 2,
          explanation: "本金靠攒、高利率伴随高风险，只有时间是人人平等拥有、且可以立刻开始用的。",
        },
        {
          question: "25 岁与 35 岁开始每年定投 1 万（年化 6%，都到 60 岁），结果大约相差多少？",
          options: ["几乎一样", "25 岁者多约一倍", "35 岁者更多", "无法比较"],
          answer: 1,
          explanation: "约 111 万 vs 55 万——早 10 年，最终结果翻倍还多。",
        },
      ],
      sources: [
        { label: "SEC · Saving and Investing 指南 PDF（公共领域）", url: "https://www.investor.gov/sites/investorgov/files/2019-02/Saving-and-Investing.pdf" },
        { label: "SEC · Introduction to Investing", url: "https://www.investor.gov/introduction-investing" },
      ],
    },
    {
      id: 3,
      title: "通胀：你的钱正在悄悄缩水",
      titleEn: "Inflation",
      difficulty: 1,
      minutes: 6,
      intro: "看似最安全的现金，其实每年都在被收一笔隐形税。",
      explanation: `**通货膨胀**（Inflation）就是"东西变贵了，钱变毛了"。今年一碗面 10 元，通胀率 3%，明年这碗面就是 10.3 元——你的 10 元没变，但能买到的东西变少了。

通胀最狠的地方，是它对**现金和存款**的持续隐形扣血：物价每年涨一点，存款利率若跑不赢通胀，购买力就在原地缩水。这也是为什么"把钱全放活期"看似最安全，长期看其实是有成本的。

各国央行（如美联储、中国人民银行）通常把 **2% 左右**视为温和健康的通胀水平，明显偏离时会用利率工具调节——这是阶段 6 才展开的话题。`,
      example: `你有 10 万元，放活期（利率 0.3%），通胀率 3%：

- 一年后账上有 100,300 元；
- 但同样的生活成本涨到了 103,000 元；
- 换算成"去年的钱"：10.03 万 ÷ 1.03 ≈ **9.74 万**

购买力一年蒸发约 2,600 元。记住近似公式：**实际收益 ≈ 名义利率 − 通胀率**。`,
      quiz: [
        {
          question: "通胀率 3%、存款利率 1%，你的实际购买力变化大约是？",
          options: ["+1%", "−2%", "+4%", "不变"],
          answer: 1,
          explanation: "实际收益 ≈ 名义利率 1% − 通胀 3% = −2%。",
        },
        {
          question: "以下哪种人受通胀伤害最小？",
          options: ["全部资产是现金的人", "持有能随物价上涨而涨价资产的人", "借出长期固定利率借款的人", "每月领固定金额养老金的人"],
          answer: 1,
          explanation: "通胀期资产价格水涨船高，而现金和固定收入者的购买力被侵蚀最重。",
        },
        {
          question: "按 72 法则，3% 的通胀大约多少年让物价翻倍？",
          options: ["10 年", "24 年", "36 年", "72 年"],
          answer: 1,
          explanation: "72 ÷ 3 = 24 年。第 5 课会专门讲 72 法则。",
        },
      ],
      sources: [
        { label: "SEC · Saving and Investing 指南 PDF（公共领域）", url: "https://www.investor.gov/sites/investorgov/files/2019-02/Saving-and-Investing.pdf" },
        { label: "国家统计局 · CPI 数据发布", url: "https://www.stats.gov.cn/sj/zxfb/" },
      ],
    },
    {
      id: 4,
      title: "货币的时间价值",
      titleEn: "Time Value of Money",
      difficulty: 2,
      minutes: 6,
      intro: "今天的一块钱，比明年的一块钱更值钱。",
      explanation: `**货币的时间价值**：今天的一块钱比未来的一块钱更值钱。原因有两个：① 今天的钱可以立刻投资产生收益（机会成本）；② 通胀让未来的钱购买力更低。

于是有了两个基础工具：

- **现值（Present Value）**：未来的钱换算成今天值多少 → 现值 = 未来金额 ÷ (1 + 利率)^年数
- **终值（Future Value）**：今天的钱未来会变成多少 → 终值 = 现在金额 × (1 + 利率)^年数

"贴现"思维是所有金融估值的地基：租房划算吗、返还型保险值不值、分期"免息"真的免费吗——本质都是把不同时点的钱换算到同一时点，再比较。`,
      example: `朋友向你借 1 万元，承诺一年后原样还 1 万。假设你这笔钱本来能稳拿 2% 的收益：

一年后的 1 万，今天的价值 = 10,000 ÷ 1.02 ≈ **9,804 元**

也就是说，即使对方分文不少地还钱，你也悄悄付出了约 196 元的机会成本。"免息借钱"从来不是真的免费。`,
      quiz: [
        {
          question: "一年后收到的 10,200 元，按 2% 贴现，现值是多少？",
          options: ["10,404 元", "10,000 元", "9,804 元", "10,200 元"],
          answer: 1,
          explanation: "10,200 ÷ 1.02 = 10,000 元。",
        },
        {
          question: "为什么今天的钱比未来的钱值钱？",
          options: ["纸币会磨损", "可以立即投资获利，且通胀侵蚀未来购买力", "银行的规定", "纯粹是心理感觉"],
          answer: 1,
          explanation: "机会成本 + 通胀，是时间价值的两大来源。",
        },
        {
          question: "通胀上升时，未来固定金额（如长期固定房租）的现值会？",
          options: ["上升", "下降", "不变", "先升后降"],
          answer: 1,
          explanation: "贴现率上升、货币购买力下降，未来固定现金流的现值随之下降。",
        },
      ],
      sources: [
        { label: "SEC · Introduction to Investing", url: "https://www.investor.gov/introduction-investing" },
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
      ],
    },
    {
      id: 5,
      title: "72 法则：快速估算翻倍时间",
      titleEn: "Rule of 72",
      difficulty: 1,
      minutes: 5,
      intro: "一招心算：多少钱年、多少年翻倍。",
      explanation: `**72 法则**是一个心算近似：**翻倍所需年数 ≈ 72 ÷ 年收益率（%）**。

- 年化 6% → 约 12 年翻一倍
- 年化 8% → 约 9 年
- 年化 9% → 约 8 年

它同样适用于通胀：通胀率 3% → 约 24 年物价翻倍（也即现金购买力减半）。

注意它是**估算工具**：在 6%-10% 的利率区间最准，利率越极端误差越大。但它足以回答"这个收益率是什么量级"——日常决策完全够用。`,
      example: `用 72 法则快速回答三个问题：

1. "这个产品说年化 12%" → 72 ÷ 12 = 6 年翻倍。若属实非常可观——但请先想起阶段 3 的防骗课：**承诺高收益的，不是高风险就是骗局**。
2. "通胀 4% 时物价多久翻倍？" → 72 ÷ 4 = 18 年。
3. "我想 10 年内让钱翻倍，需要多少收益？" → 72 ÷ 10 = **7.2%**。这个数字能帮你瞬间判断某类资产够不够格。`,
      quiz: [
        {
          question: "年化 6%，大约几年翻倍？",
          options: ["6 年", "12 年", "20 年", "72 年"],
          answer: 1,
          explanation: "72 ÷ 6 = 12 年。",
        },
        {
          question: "通胀 4%，物价大约多少年翻倍？",
          options: ["4 年", "10 年", "18 年", "36 年"],
          answer: 2,
          explanation: "72 ÷ 4 = 18 年。",
        },
        {
          question: "72 法则最适合的用途是？",
          options: ["精确计算", "快速粗略估算量级", "报税", "选股票"],
          answer: 1,
          explanation: "它是近似工具，在 6%-10% 区间最准，用来建立数量级概念。",
        },
      ],
      sources: [
        { label: "SEC · Introduction to Investing", url: "https://www.investor.gov/introduction-investing" },
        { label: "Bogleheads Wiki（CC BY-SA）", url: "https://www.bogleheads.org/wiki" },
      ],
    },
    {
      id: 6,
      title: "名义收益 vs 实际收益",
      titleEn: "Nominal vs Real Return",
      difficulty: 2,
      minutes: 6,
      intro: "决定你能买多少东西的，是实际收益。",
      explanation: `**名义收益**（Nominal Return）是账面数字：银行告诉你的利率、APP 显示的涨幅。**实际收益**（Real Return）是扣除通胀之后，真正代表购买力变化的数字。

近似公式：**实际收益 ≈ 名义收益 − 通胀率**。

这就是"负利率"现象的含义：存款利率 1.5%、通胀 2.5%，账面在涨、购买力在跌。评价任何投资，都要换上"实际收益"这把尺子——否则容易被"看起来在赚钱"的幻觉骗了。`,
      example: `三种放法，同样 10 万放 10 年（通胀假设 3%）：

| 去处 | 名义年化 | 实际年化（近似） | 10 年后购买力 |
|---|---|---|---|
| 活期 | 0.3% | ≈ −2.7% | 约 7.7 万 |
| 货币基金 | 2% | ≈ −1% | 约 9.1 万 |
| 长期分散股债组合 | 7% | ≈ 4% | 约 14.6 万 |

算法：名义终值 ÷ 1.03¹⁰。这张表说明一件事：**跑不赢通胀的"安全"，其实是缓慢亏损**。`,
      quiz: [
        {
          question: "名义利率 2%、通胀 3%，实际收益约为？",
          options: ["+5%", "+2%", "−1%", "−3%"],
          answer: 2,
          explanation: "2% − 3% = −1%。",
        },
        {
          question: "哪个数字决定你未来能买到多少东西？",
          options: ["名义收益", "实际收益", "本金", "交易次数"],
          answer: 1,
          explanation: "购买力只看扣掉通胀后的实际收益。",
        },
        {
          question: "名义收益 10%、通胀也是 10%，实际收益约为？",
          options: ["10%", "5%", "0%", "20%"],
          answer: 2,
          explanation: "10% − 10% = 0%，购买力原地踏步。",
        },
      ],
      sources: [
        { label: "国家统计局 · CPI 数据发布", url: "https://www.stats.gov.cn/sj/zxfb/" },
        { label: "SEC · Saving and Investing 指南 PDF", url: "https://www.investor.gov/sites/investorgov/files/2019-02/Saving-and-Investing.pdf" },
      ],
    },
    {
      id: 7,
      title: "净资产：你的财务体检表",
      titleEn: "Net Worth",
      difficulty: 1,
      minutes: 6,
      intro: "收入是流量，净资产才是家底。",
      explanation: `**净资产 = 总资产 − 总负债**。

- **资产**：把钱放进口袋、或将来能变现的东西——存款、基金、房产市值等
- **负债**：把钱从口袋掏出去的义务——房贷余额、信用卡欠款、消费贷

收入高 ≠ 有钱：收入是"流量"，净资产是"存量"。月入 5 万但月月光还负债的人，财务状况可能不如月入 1 万、净资产稳步增长的人。

建议每季度做一次"财务体检"：左边列资产、右边列负债，相减。盯着这个数字的**变化趋势**，比盯着工资条更能反映你走在哪个方向。`,
      example: `小林的季度体检表：

| 资产 | 金额 | 负债 | 金额 |
|---|---|---|---|
| 房产市值 | 300 万 | 房贷余额 | 200 万 |
| 存款 + 基金 | 30 万 | 信用卡欠款 | 2 万 |
| 汽车（折旧后） | 15 万 | | |
| **合计** | **345 万** | **合计** | **202 万** |

净资产 = 345 − 202 = **143 万**。注意汽车：它算资产，但每年都在贬值——资产的"质量"也很重要（阶段 4 展开）。`,
      quiz: [
        {
          question: "净资产 = ？",
          options: ["收入 − 支出", "总资产 − 总负债", "存款 + 基金", "房产市值"],
          answer: 1,
          explanation: "净资产是存量概念：你拥有的减去你欠的。",
        },
        {
          question: "自用的汽车在净资产表里属于？",
          options: ["负债", "资产（但会持续贬值）", "不算任何项目", "净资产"],
          answer: 1,
          explanation: "它能变现所以是资产，但贬值特性让它属于『低质量资产』。",
        },
        {
          question: "月入很高但净资产很低，最可能的原因是？",
          options: ["运气差", "高消费 + 高负债", "净资产算错了", "收入不稳定"],
          answer: 1,
          explanation: "流量大不代表存量大：花得多、欠得多，净资产就上不去。",
        },
      ],
      sources: [
        { label: "CFPB · 消费者金融保护（公共领域）", url: "https://www.consumerfinance.gov" },
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
      ],
    },
    {
      id: 8,
      title: "记账的极简方法",
      titleEn: "Budgeting",
      difficulty: 1,
      minutes: 6,
      intro: "记账不是为了记录每一笔，而是看清钱的大方向。",
      explanation: `记账失败的头号原因是"太细"：坚持记每杯咖啡的人，大多一个月后放弃。**极简记账**只追求一件事：看清钱的大流向。

两个可行方法：

- **大项法**：只记三类——固定支出（房租/订阅/保险）、可变大额（单笔超过门槛的）、储蓄。其余归入"日常零花"，给个预算包干。
- **倒推法**：根本不逐笔记。月初总资产 − 月末总资产 + 本月新储蓄 = 本月支出。每月 5 分钟。

记账的真正产出不是流水账，而是**发现漏财点**：那个每月悄悄扣费却没在用的订阅、外卖占比、冲动消费的规模。`,
      example: `用倒推法：月初存款 12 万，月末 12.8 万（净增 0.8 万），当月工资到账 1.5 万。

→ 本月支出 ≈ 1.5 − 0.8 = **0.7 万**，储蓄率 ≈ 53%。

再花 10 分钟翻银行 APP 账单，把 0.7 万分进"房租 3500 / 餐饮 2000 / 其他 1500"，发现"其他"里有 600 元是三个几乎不用的订阅——这 10 分钟，就是记账的全部回报。`,
      quiz: [
        {
          question: "极简记账的核心目标是？",
          options: ["记下每一笔", "看清钱的大流向", "替银行干活", "发朋友圈"],
          answer: 1,
          explanation: "颗粒度过细必然放弃，大流向才是决策需要的信息。",
        },
        {
          question: "倒推法中『本月支出』怎么算？",
          options: ["月末资产 − 月初资产", "收入 − 资产净增加额", "只算刷卡部分", "凭感觉估"],
          answer: 1,
          explanation: "收入进了口袋，要么花掉、要么沉淀为资产：支出 = 收入 − 资产净增。",
        },
        {
          question: "记账最重要的产出是？",
          options: ["一份完整流水账", "发现漏财点和可优化项", "银行要求的材料", "记账软件会员"],
          answer: 1,
          explanation: "记是为了看清，看清是为了改——发现可优化项才是价值所在。",
        },
      ],
      sources: [
        { label: "CFPB · 消费者金融保护（公共领域）", url: "https://www.consumerfinance.gov" },
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
      ],
    },
    {
      id: 9,
      title: "50/30/20 预算法则",
      titleEn: "The 50/30/20 Rule",
      difficulty: 1,
      minutes: 6,
      intro: "给每块钱先派任务：一个足够好的预算起点。",
      explanation: `**50/30/20 法则**（美国参议员伊丽莎白·沃伦在合著理财书中推广的框架）：税后收入分三份——

- **50% 必要**：房租/房贷、水电、基础餐饮、通勤、保险
- **30% 想要**：娱乐、外食、购物、旅行
- **20% 储蓄与投资**：应急基金、定投、偿还额外债务

它是**起点不是圣旨**：房租昂贵的城市可能是 60/20/20；收入波动的人按年执行而不是按月。

关键是顺序——**先储蓄，再消费（Pay Yourself First）**：发薪日先把 20% 转走，剩下的才是能花的。靠"月底剩多少存多少"的人，几乎永远存不下钱。`,
      example: `税后月入 10,000 元：

- 必要 5,000（房租 3,000 + 吃饭通勤 1,500 + 保险水电 500）
- 想要 3,000
- 储蓄投资 2,000 —— **发薪日自动转出**，而不是月底"剩多少存多少"

每月 2,000、一年 2.4 万。坚持 30 年、年化 6%：2.4 万 × [(1.06³⁰ − 1) ÷ 0.06] ≈ **190 万**。普通人一生最大的资产，往往就是这样一小笔一小笔攒出来的。`,
      quiz: [
        {
          question: "50/30/20 中的「20%」通常指？",
          options: ["娱乐支出", "储蓄与投资", "房租", "人情往来"],
          answer: 1,
          explanation: "必要 50 / 想要 30 / 储蓄投资 20。",
        },
        {
          question: "「Pay Yourself First（先储蓄后消费）」的意思是？",
          options: ["先给自己买礼物", "发薪日先转储蓄，剩下的才用于消费", "先还清所有债", "先把钱花完"],
          answer: 1,
          explanation: "把储蓄当成第一笔『账单』，自动化执行。",
        },
        {
          question: "月入 1 万按 50/30/20 执行，「必要支出」预算大约是？",
          options: ["2,000 元", "3,000 元", "5,000 元", "8,000 元"],
          answer: 2,
          explanation: "50% × 10,000 = 5,000 元。如果实际超过太多，通常要调比例（如 60/20/20）。",
        },
      ],
      sources: [
        { label: "CFPB · 消费者金融保护（公共领域）", url: "https://www.consumerfinance.gov" },
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
      ],
    },
    {
      id: 10,
      title: "储蓄率：比收入更重要的数字",
      titleEn: "Savings Rate",
      difficulty: 2,
      minutes: 6,
      intro: "决定你多久实现财务安全的，不是收入，是储蓄率。",
      explanation: `**储蓄率 = (收入 − 支出) ÷ 收入**。它比收入更能预测一个人的财务未来：收入决定"进水速度"，储蓄率决定"留下多少"。

储蓄率 10% 的人，工作一年攒下约 1.2 个月生活费；储蓄率 40% 的人，一年攒下 8 个月——差距不是线性而是乘法级的，因为攒下的钱还会复利（第 2 课）。

提高储蓄率的两条路：**降支**（见效快，优先砍住房、交通这类大额固定支出）和**增收**（天花板高但周期长）。最有效的做法通常是：先自动化储蓄（第 9 课），再优化一两个大项，而不是苛待每一顿饭。`,
      example: `小 A 月入 1.25 万、月花 1 万（储蓄率 20%）；小 B 月入 1 万、月花 0.6 万（储蓄率 40%）：

- A 每年存 3 万，攒下的钱够撑 3 个月不上班
- B 每年存 4.8 万，够撑 8 个月

B 赚得更少，财务安全度反而更高。而且**支出同时决定目标**：按"年支出 25 倍"粗估财务自由门槛（来历见阶段 7 的 4% 法则），A 需要 300 万，B 只需要 180 万。少花钱一举两得：存得更多，需要存的也更少。`,
      quiz: [
        {
          question: "储蓄率的公式是？",
          options: ["储蓄 ÷ 总资产", "(收入 − 支出) ÷ 收入", "支出 ÷ 收入", "收入 ÷ 储蓄"],
          answer: 1,
          explanation: "分子是每月留下来的钱，分母是收入。",
        },
        {
          question: "小 A 月入 1.25 万存 0.25 万，小 B 月入 1 万存 0.4 万，谁的储蓄率高？",
          options: ["A（20%）", "B（40%）", "一样高", "算不出来"],
          answer: 1,
          explanation: "A 是 20%，B 是 40%——收入更高不等于储蓄率更高。",
        },
        {
          question: "提高储蓄率通常见效最快的做法是？",
          options: ["苛待每一顿饭", "优化住房、交通等大额固定支出", "多办几张信用卡", "等公司加薪"],
          answer: 1,
          explanation: "大项占大头：房租降 10% 常常超过省下所有的奶茶。",
        },
      ],
      sources: [
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
        { label: "Bogleheads Wiki（CC BY-SA）", url: "https://www.bogleheads.org/wiki" },
      ],
    },
    {
      id: 11,
      title: "应急基金：财务安全垫",
      titleEn: "Emergency Fund",
      difficulty: 1,
      minutes: 6,
      intro: "投资之前，先系好安全带。",
      explanation: `**应急基金 = 3-6 个月基本生活费的流动资金**，专门应对失业、疾病、意外维修这类"不想发生但迟早发生"的事。

三个特征：

1. **够用**：3 个月起步；家庭经济支柱、自由职业者、单一收入家庭取 6 个月
2. **随取随用**：放活期或货币基金——流动性优先，收益其次
3. **专款专用**：不用于消费，也不拿去投股票基金

它是所有投资的前提装备：没有应急基金的人，遇到急事只能被迫在市场低点卖出投资，把"临时波动"变成"永久亏损"。**先有安全带，再谈速度。**`,
      example: `月基本支出 8,000 元 → 目标 2.4 万 - 4.8 万。

- 每月发薪先转 2,000 进货币基金，一年建成 2.4 万"初版"
- 存放对比：2.4 万放活期（0.3%）一年利息约 72 元；放货币基金（2%）约 480 元——同样随取随用，收益差 6 倍多

急用钱时的取用顺序：先动应急基金，才轮到卖出投资（且优先卖盈利的）。**动用之后优先补齐，再继续其他投资。**`,
      quiz: [
        {
          question: "应急基金的通常规模是？",
          options: ["1 个月生活费", "3-6 个月基本生活费", "1 年生活费", "越多越好"],
          answer: 1,
          explanation: "3 个月起步，责任重或收入不稳的取 6 个月。",
        },
        {
          question: "应急基金存放的首要考虑是？",
          options: ["收益最大化", "流动性（随取随用）", "买成股票", "锁定期越长越好"],
          answer: 1,
          explanation: "应急的钱关键时刻必须马上到账，收益是次要的。",
        },
        {
          question: "为什么说应急基金是投资的前提？",
          options: ["银行强制要求", "避免急用时被迫在低点卖出投资", "能提高投资收益", "法律规定"],
          answer: 1,
          explanation: "没有安全垫的人，一次急事就可能把浮亏变成实亏。",
        },
      ],
      sources: [
        { label: "SEC · Saving and Investing 指南 PDF（公共领域）", url: "https://www.investor.gov/sites/investorgov/files/2019-02/Saving-and-Investing.pdf" },
        { label: "CFPB · 消费者金融保护", url: "https://www.consumerfinance.gov" },
      ],
    },
    {
      id: 12,
      title: "SMART 理财目标设定",
      titleEn: "SMART Goals",
      difficulty: 2,
      minutes: 6,
      intro: "「我要变有钱」不是目标，是愿望。",
      explanation: `有效的理财目标要过 **SMART** 五关：

- **S**pecific 具体：攒钱做什么？
- **M**easurable 可衡量：多少钱算达成？
- **A**chievable 可实现：与收入匹配吗？
- **R**elevant 相关：和你在乎的事有关吗？
- **T**ime-bound 有时限：什么时候完成？

目标不只是仪式感，它**直接决定工具选择**：1-2 年内要用的钱（婚礼、学费、首付）只能放低风险工具；5 年以上不用的钱，才谈得上承受波动换取收益。没有时限的目标，配不到合适的工具。`,
      example: `改造一个模糊目标：

- ❌ "我要多存钱"
- ✅ "3 年内攒 10 万教育金：每月 2,800 元自动转入货币基金+短债组合（预期年化 2.5%），缺口的最后一季度用年终奖补上"

验算：2,800 × 36 = 100,800 元——仅本金就已达标，收益做安全垫。这就是 M（可衡量）和 A（可实现）的含义：**目标要算得出来**。`,
      quiz: [
        {
          question: "SMART 中的「T」代表？",
          options: ["Trend（趋势）", "Time-bound（有时限）", "Tax（税务）", "Total（总额）"],
          answer: 1,
          explanation: "没有截止时间的目标会无限期拖延。",
        },
        {
          question: "两年内要用的买房首付，适合放在？",
          options: ["股票基金", "低风险、流动性好的工具", "加密货币", "30 年期国债"],
          answer: 1,
          explanation: "短期要用的钱承受不起波动，保本和流动性优先。",
        },
        {
          question: "下面哪个是 SMART 目标？",
          options: ["实现财务自由", "5 年攒 50 万首付，每月定投 6,500 元", "多赚点钱", "少花点钱"],
          answer: 1,
          explanation: "具体（首付）、可衡量（50 万）、有时限（5 年）、可实现（月 6,500 可验算）。",
        },
      ],
      sources: [
        { label: "CFPB · 消费者金融保护（公共领域）", url: "https://www.consumerfinance.gov" },
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
      ],
    },
    {
      id: 13,
      title: "机会成本：每个决定都有代价",
      titleEn: "Opportunity Cost",
      difficulty: 2,
      minutes: 6,
      intro: "每个选择的真实价格，是你放弃的那个最好选择。",
      explanation: `**机会成本（Opportunity Cost）**：做一个选择时，你放弃的最佳替代选项的价值。钱花在 A 上，就不能同时花在 B 上——B 的价值就是这笔钱的隐形价格。

这个思维让很多"感觉免费/便宜"的东西显出原形：

- "免息"分期：占用了未来的现金流
- 闲置的存款：放弃了投资收益
- 冲动买的第 5 双鞋：放弃了这笔钱未来 30 年的复利

它不是让人不花钱，而是**花钱时把两边的账都摆上桌面**，再决定。`,
      example: `20 万预算买车 vs 不买：

- 买车：得到便利与生活品质（这是真实价值，不该被否定），代价是车辆持续折旧
- 不买（20 万按年化 5% 投资）：10 年后 ≈ 20 × 1.05¹⁰ ≈ **32.6 万**

所以这个决策的真实题面是："这辆车未来 10 年带来的便利，值不值约 12.6 万元的增值差额加上折旧？"——可能值，也可能不值，但至少现在你是在**看清价格之后**做的决定。`,
      quiz: [
        {
          question: "机会成本指的是？",
          options: ["买东西花的钱", "放弃的最佳替代选项的价值", "投资亏损", "手续费"],
          answer: 1,
          explanation: "账单上的价格是显性成本；放弃的最好选择才是完整成本。",
        },
        {
          question: "20 万按年化 5% 投资 10 年大约变成？",
          options: ["25 万", "28 万", "32.6 万", "40 万"],
          answer: 2,
          explanation: "1.05 的 10 次方约 1.63，20 × 1.63 ≈ 32.6 万。",
        },
        {
          question: "「免费」的东西有没有机会成本？",
          options: ["没有", "有——占用了时间、资金或注意力", "只有大件才有", "只对富人有"],
          answer: 1,
          explanation: "免费排一小时队领 10 元礼品，机会成本是你这一小时的其他用途。",
        },
      ],
      sources: [
        { label: "Khan Academy · Economics & Finance", url: "https://www.khanacademy.org/economics-finance-domain" },
        { label: "SEC · Introduction to Investing", url: "https://www.investor.gov/introduction-investing" },
      ],
    },
    {
      id: 14,
      title: "理财常见的心理陷阱",
      titleEn: "Behavioral Pitfalls",
      difficulty: 2,
      minutes: 7,
      intro: "你最大的财务对手，常常是你自己。",
      explanation: `四个最常见的理财心理陷阱：

1. **即时满足**：先享受、后储蓄——结果永远轮不到储蓄
2. **心理账户**：对工资精打细算，对年终奖/红包大手大脚——钱明明是一样的钱
3. **沉没成本谬误**："已经亏了，卖了就真亏了"——理性决策只应看未来，不看已经花掉或亏掉的钱
4. **从众**：别人抢什么我抢什么——常常正好买在高点

对策不是"变得更理性"（人性战胜不了），而是**用机制代替意志力**：自动转账、定投规则、大额消费冷静期（等 72 小时再买）、写下每笔投资的买入理由。`,
      example: `两个真实场景：

- **心理账户**：同样 2 万块，来自工资结余时你反复比价，来自年终奖时你三天花完。破解法：所有进账先汇入同一个池子，再按 50/30/20 分配（第 9 课）。
- **沉没成本**：一只基金亏了 20%、拿了两年，"等回本再卖"。正确问法不是"我已经亏了多少"，而是"**如果我今天现金在手，还会买它吗**"——不会，就换；会，就留。决策只和未来有关。`,
      quiz: [
        {
          question: "「不卖就不算亏」是哪种陷阱？",
          options: ["心理账户", "沉没成本谬误", "从众", "即时满足"],
          answer: 1,
          explanation: "浮亏和实亏只是会计形式；拒绝面对它，只会让错误继续。",
        },
        {
          question: "对年终奖大手大脚、对工资精打细算，属于？",
          options: ["理性分配", "心理账户", "风险偏好", "分散投资"],
          answer: 1,
          explanation: "钱没有标签——同样的 2 万元应该按同一套规则分配。",
        },
        {
          question: "对抗「先享受后储蓄」最有效的机制是？",
          options: ["靠意志力", "发薪日自动转账储蓄", "每天记账反省", "少看购物广告"],
          answer: 1,
          explanation: "自动化让你根本接触不到诱惑：钱已经转走了。",
        },
      ],
      sources: [
        { label: "CFPB · 消费者金融保护（公共领域）", url: "https://www.consumerfinance.gov" },
        { label: "中国投资者网 · 投资者课堂", url: "https://www.investor.org.cn" },
      ],
    },
    {
      id: 15,
      title: "阶段 1 复习与周测",
      titleEn: "Stage 1 Review",
      difficulty: 2,
      minutes: 8,
      intro: "14 个知识点串成 7 句话，用 6 道题检验。",
      explanation: `阶段 1 的 14 课，浓缩成 7 句话：

1. 金融知识的作用是**避开可避免的亏损**，不是预测市场（第 1 课）
2. 复利最强变量是**时间**：25 岁开始比 35 岁开始，结果多一倍（第 2、5 课）
3. 通胀是现金的隐形税：**实际收益 ≈ 名义收益 − 通胀率**（第 3、6 课）
4. 今天的钱比未来的钱值钱：**现值 = 未来金额 ÷ (1 + 利率)^年数**（第 4 课）
5. **净资产 = 资产 − 负债**，比收入更反映家底；记账只需看清大流向（第 7、8 课）
6. 预算的起点是 **50/30/20 + 先储蓄后消费**；储蓄率比收入更重要（第 9、10 课）
7. **先备 3-6 个月应急基金再投资**；目标要 SMART；花钱看机会成本；用机制对抗心理陷阱（第 11-14 课）

能脱稿复述这 7 句，就可以进入阶段 2《个人财务底盘》了。`,
      example: `进入阶段 2 前，给自己打个分（每项 1 分）：

□ 我能说出自己净资产的大概数字
□ 我知道上个月支出大约多少、花在哪三大类
□ 我有 3 个月以上的应急基金（或在建立中）
□ 我发薪日会自动/手动先转储蓄
□ 我能写出 1 个 SMART 理财目标

**4 分以上**：阶段 2 会很顺。**2 分以下**：把第 7-11 课再过一遍，重点是净资产表和应急基金。`,
      quiz: [
        {
          question: "复利三变量中，普通人杠杆最大的是？",
          options: ["本金", "利率", "时间", "运气"],
          answer: 2,
          explanation: "时间人人都有、立刻可用，且效果最惊人——这是第 2 课的核心。",
        },
        {
          question: "名义利率 2%、通胀 3%，实际收益约为？",
          options: ["+5%", "+1%", "−1%", "−3%"],
          answer: 2,
          explanation: "实际 ≈ 名义 − 通胀 = −1%。",
        },
        {
          question: "净资产 = ？",
          options: ["收入 − 支出", "总资产 − 总负债", "存款 + 基金", "年薪 × 5"],
          answer: 1,
          explanation: "第 7 课：你拥有的，减去你欠的。",
        },
        {
          question: "应急基金存放的第一原则是？",
          options: ["收益最大化", "流动性", "买入股票", "定期最长"],
          answer: 1,
          explanation: "关键时刻必须马上取用——第 11 课。",
        },
        {
          question: "「等回本再卖」属于哪种心理陷阱？",
          options: ["心理账户", "沉没成本谬误", "从众", "即时满足"],
          answer: 1,
          explanation: "决策只应看未来：如果今天现金在手你不会买它，就该换——第 14 课。",
        },
        {
          question: "50/30/20 法则的正确执行顺序是？",
          options: ["先消费，月底剩多少存多少", "发薪日先把储蓄部分转走，剩下的再消费", "先还债再消费最后储蓄", "顺序无所谓"],
          answer: 1,
          explanation: "Pay Yourself First——第 9 课。",
        },
      ],
      sources: [
        { label: "SEC · Saving and Investing 指南 PDF（公共领域）", url: "https://www.investor.gov/sites/investorgov/files/2019-02/Saving-and-Investing.pdf" },
        { label: "Khan Academy · Personal Finance", url: "https://www.khanacademy.org/college-careers-more/personal-finance" },
      ],
    },
  ],
};

import { stage2 } from "./stage2";
import { stage3 } from "./stage3";
import { stage4 } from "./stage4";
import { stage5 } from "./stage5";
import { stage6 } from "./stage6";
import { stage7 } from "./stage7";
import { stage8 } from "./stage8";

export { stage2, stage3, stage4, stage5, stage6, stage7, stage8 };

export const stages: Stage[] = [
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
  stage7,
  stage8,
];

export const allLessons: Lesson[] = stages.flatMap((s) => s.lessons);

export function getLesson(id: number): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}

export function stageOf(id: number): Stage {
  return stages.find((s) => s.lessons.some((l) => l.id === id)) ?? stage1;
}

export const upcomingStages: { no: number; name: string; lessons: number; topics: string }[] = [];
