// Stage 1 English content — merged into stage1 lessons at build time
// Maps lesson ID → English explanation, example, and quiz

type EnPatch = {
  explanationEn: string;
  exampleEn: string;
  quizEn: { question: string; options: string[]; answer: number; explanation: string }[];
};

export const stage1En: Record<number, EnPatch> = {
  6: {
    explanationEn: `**Nominal return** is the headline number — what the bank quotes, what the app displays. **Real return** is what's left after inflation — the number that represents actual purchasing power.

Rule of thumb: **real return ≈ nominal return − inflation rate**.

This is what "negative real rates" mean: if your deposit earns 1.5% and inflation is 2.5%, you're gaining on paper but losing purchasing power. Always evaluate investments using the "real return" ruler.`,
    exampleEn: `¥100K placed for 10 years (assuming 3% inflation):

| Where | Nominal | Real | Purchasing power after 10Y |
|-------|---------|------|---------------------------|
| Checking (0.3%) | 0.3% | ≈ −2.7% | ≈ ¥77K |
| Money market (2%) | 2% | ≈ −1% | ≈ ¥91K |
| 60/40 portfolio (7%) | 7% | ≈ +4% | ≈ ¥146K |

The table shows: "safe" options that don't beat inflation are actually slow losses.`,
    quizEn: [
      { question: "Nominal rate 2%, inflation 3% → real return?", options: ["+5%", "+2%", "−1%", "−3%"], answer: 2, explanation: "2% − 3% = −1%." },
      { question: "Which number determines what you can actually buy?", options: ["Nominal return", "Real return", "Principal", "Trade frequency"], answer: 1, explanation: "Only inflation-adjusted returns reflect true purchasing power." },
      { question: "Nominal return 10%, inflation 10% → real return?", options: ["10%", "5%", "0%", "20%"], answer: 2, explanation: "10% − 10% = 0% — purchasing power stays flat." },
    ],
  },
  7: {
    explanationEn: `**Net worth = Total Assets − Total Liabilities**.

- **Assets**: things that put money in your pocket — savings, investments, property value
- **Liabilities**: obligations that take money out — mortgage balance, credit card debt, consumer loans

High income ≠ wealthy: income is a "flow," net worth is a "stock." Someone earning ¥50K/month but spending it all with debt may be worse off than someone earning ¥10K/month with steadily growing net worth.

Do a quarterly "financial checkup": list assets on the left, liabilities on the right, subtract. Watch the **trend** — it tells you your real financial direction.`,
    exampleEn: `Lin's quarterly checkup:

| Assets | ¥ | Liabilities | ¥ |
|--------|---|-------------|---|
| Property | 3.0M | Mortgage | 2.0M |
| Savings + funds | 300K | Credit card | 20K |
| Car (depreciated) | 150K | | |
| **Total** | **3.45M** | **Total** | **2.02M** |

Net worth = 3.45M − 2.02M = **¥1.43M**. Note: the car counts as an asset but depreciates every year — asset "quality" matters too.`,
    quizEn: [
      { question: "Net worth = ?", options: ["Income − Expenses", "Total Assets − Total Liabilities", "Savings + Funds", "Property value"], answer: 1, explanation: "Net worth is a stock measure: what you own minus what you owe." },
      { question: "A personal car is classified as:", options: ["A liability", "An asset (but depreciating)", "Not counted", "Net worth"], answer: 1, explanation: "It can be sold so it's an asset, but depreciation makes it low-quality." },
      { question: "High income but low net worth is most likely due to:", options: ["Bad luck", "High spending + high debt", "Calculation error", "Unstable income"], answer: 1, explanation: "Big flows don't mean big stocks." },
    ],
  },
  8: {
    explanationEn: `The #1 reason budgeting fails is being too detailed — people who track every coffee quit within a month. **Minimalist budgeting** has one goal: see the big picture of where money goes.

Two workable methods:

- **Big Categories**: Track only three things — fixed expenses (rent/subscriptions/insurance), large variable items (above a threshold), and savings. Everything else is "daily spending" with a budget cap.
- **Backward Method**: Don't track anything. Monthly assets beginning − monthly assets end + known savings = monthly spending. 5 minutes per month.

The real output isn't a ledger — it's **discovering leaks**: unused subscriptions, takeout percentage, impulse spending scale.`,
    exampleEn: `Using the backward method: Start of month ¥120K, end of month ¥128K (net increase ¥8K), salary received ¥15K.

→ Monthly spending ≈ 15 − 8 = **¥7K**, savings rate ≈ 53%.

Spend 10 minutes sorting the ¥7K into "rent 3.5K / food 2K / other 1.5K" and find ¥600 in unused subscriptions — that 10 minutes IS the entire payoff of budgeting.`,
    quizEn: [
      { question: "The core goal of minimalist budgeting is:", options: ["Track every penny", "See the big picture of money flow", "Save the bank work", "Post on social media"], answer: 1, explanation: "Too much detail leads to abandonment; big-picture is what decisions need." },
      { question: "In the backward method, monthly spending =", options: ["End assets − start assets", "Income − net asset increase", "Only card transactions", "Rough estimate"], answer: 1, explanation: "Money either gets spent or accumulates as assets." },
      { question: "The most important output of budgeting is:", options: ["A complete ledger", "Discovering leaks and areas to optimize", "Material for the bank", "Budgeting software subscription"], answer: 1, explanation: "Track to see, see to change." },
    ],
  },
  9: {
    explanationEn: `The **50/30/20 rule**: divide after-tax income into three buckets:

- **50% Needs**: rent/mortgage, utilities, basic groceries, transport, insurance
- **30% Wants**: entertainment, dining out, shopping, travel
- **20% Savings & Investments**: emergency fund, investing, extra debt repayment

It's a **starting point, not a commandment**: expensive cities might need 60/20/20. The key is the ORDER — **pay yourself first**: transfer the 20% on payday BEFORE spending, not "save whatever's left at month end."`,
    exampleEn: `After-tax income ¥10,000/month:

- Needs ¥5,000 (rent 3,000 + food/transport 1,500 + insurance/utilities 500)
- Wants ¥3,000
- Savings/Investments ¥2,000 — **auto-transferred on payday**

¥2,000/month = ¥24K/year. Over 30 years at 6%: ¥24K × 79.06 ≈ **¥1.9M**. The average person's largest asset is built this way — one small transfer at a time.`,
    quizEn: [
      { question: "In the 50/30/20 rule, the 20% refers to:", options: ["Entertainment", "Savings & investments", "Rent", "Social obligations"], answer: 1, explanation: "Needs 50 / Wants 30 / Savings 20." },
      { question: "Pay Yourself First means:", options: ["Buy yourself a gift", "Transfer savings on payday before spending", "Pay off all debts first", "Spend it all"], answer: 1, explanation: "Treat savings as the first bill, not a leftover." },
      { question: "At ¥10K/month income, the needs budget is approximately:", options: ["¥2,000", "¥3,000", "¥5,000", "¥8,000"], answer: 2, explanation: "50% × ¥10,000 = ¥5,000." },
    ],
  },
  10: {
    explanationEn: `**Savings rate = (Income − Expenses) ÷ Income**. It predicts your financial future better than income does: income determines how fast money flows in, but savings rate determines how much stays.

Someone saving 10% of income saves ~1.2 months of living expenses per year. Someone saving 40% saves ~8 months. The gap is multiplicative because saved money also compounds.

Two paths to increase it: **cut expenses** (focus on big fixed items like housing and transport — not micro-optimizing meals) and **increase income** (higher ceiling but slower). The most effective approach: automate savings first, then optimize one or two big items.`,
    exampleEn: `Person A: earns ¥125K, spends ¥100K (20% savings rate). Person B: earns ¥100K, spends ¥60K (40% savings rate).

B earns less but is far more financially secure. And "financial independence" targets differ: at 25× annual expenses, A needs ¥25M but B only needs ¥15M. Spending less does double duty: you save more AND need less to retire.`,
    quizEn: [
      { question: "Savings rate formula:", options: ["Savings ÷ Total assets", "(Income − Expenses) ÷ Income", "Expenses ÷ Income", "Income ÷ Savings"], answer: 1, explanation: "How much of each yuan earned actually stays." },
      { question: "A saves ¥2.5K of ¥12.5K income; B saves ¥4K of ¥10K. Who has a higher savings rate?", options: ["A (20%)", "B (40%)", "Same", "Can't calculate"], answer: 1, explanation: "A = 20%, B = 40% — higher income doesn't mean higher savings rate." },
      { question: "The fastest way to increase savings rate is usually:", options: ["Cut every meal", "Optimize housing/transport (big fixed expenses)", "Get more credit cards", "Wait for a raise"], answer: 1, explanation: "Housing is the biggest item — cutting 10% off rent often beats skipping all bubble tea." },
    ],
  },
  1: {
    explanationEn: `Financial literacy isn't just for professional investors — it's a life skill. You make financial decisions every day: how much rent you can afford, which insurance to pick, whether to pay off your mortgage early. Without understanding the rules, you're leaving it to others to decide for you.

The cost of financial ignorance is usually **invisible**: savings eroded by inflation, wrong insurance purchased, buying at market peaks, falling for "guaranteed high return" scams. These losses aren't as obvious as a stolen wallet, but they can cost you far more.

This course won't teach you to predict markets or get rich quick. It will help you **understand the rules and avoid avoidable mistakes**. 150 lessons, 5-10 minutes each.`,
    exampleEn: `The same ¥100,000 invested for 30 years at different levels of financial understanding:

- All in checking account (0.3%): ≈ **¥109K**
- Money market fund (3%): ≈ **¥243K**
- Diversified long-term portfolio (6%): ≈ **¥574K**

Every bit of understanding — knowing about inflation, compound interest, diversification — gets amplified by time.`,
    quizEn: [
      { question: "What is the primary goal of this course?", options: ["Learn to predict market movements", "Understand rules and avoid avoidable mistakes", "Follow hot stock tips", "Get rich quickly"], answer: 1, explanation: "Predicting short-term markets is nearly impossible; avoiding costly mistakes is the main source of returns for most people." },
      { question: "The cost of financial ignorance is typically:", options: ["A one-time total loss", "Hidden and ongoing (inflation erosion, wrong products, scams)", "Immediately noticeable", "Only affects the wealthy"], answer: 1, explanation: "Losses from financial ignorance are like slow leaks — hard to notice but devastating over time." },
      { question: "¥100K at 6% compound interest for 30 years ≈ ?", options: ["¥180K", "¥280K", "¥570K", "¥1.6M"], answer: 2, explanation: "1.06^30 ≈ 5.74, so ¥100K × 5.74 ≈ ¥574K." },
    ],
  },
  2: {
    explanationEn: `**Compound interest** means "earning interest on your interest." Year one, you earn interest on your principal. Year two, you earn interest on your principal PLUS the interest from year one. The formula: Final Value = Principal × (1 + rate)^years.

Three variables drive compound interest: principal, rate, and **time**. Most people fixate on the first two, but for ordinary investors, **time** is the most powerful lever — it's the one thing everyone has equally, and its effect is astonishing.

Yes, the famous "Einstein called it the 8th wonder" quote is likely apocryphal — but the math is real.`,
    exampleEn: `¥100,000 at 8% annual return, left untouched:

- 10 years: ¥216K
- 20 years: ¥466K
- 30 years: ¥1,006K

Starting 10 years earlier matters more: investing ¥10K/year at 6% until age 60 — starting at 25 yields ≈ **¥1.11M**; starting at 35 yields ≈ **¥550K**. That's double, just from starting earlier.`,
    quizEn: [
      { question: "¥100K at 8% compound interest for 10 years ≈ ?", options: ["¥180K", "¥216K", "¥280K", "¥800K"], answer: 1, explanation: "1.08^10 ≈ 2.16, so ¥100K × 2.16 ≈ ¥216K." },
      { question: "Which variable is the biggest lever for most people?", options: ["Principal", "Interest rate", "Time", "Luck"], answer: 2, explanation: "Time is equally available to everyone and can be started today." },
      { question: "Starting at 25 vs 35, investing ¥10K/year at 6% until 60:", options: ["About the same", "25-year-old ends up with roughly double", "35-year-old ends up with more", "Can't compare"], answer: 1, explanation: "≈¥1.11M vs ≈¥550K — starting 10 years earlier doubles the result." },
    ],
  },
  3: {
    explanationEn: `**Inflation** means things get more expensive and your money buys less. If a bowl of noodles costs ¥10 today and inflation is 3%, next year it costs ¥10.30 — your ¥10 is unchanged, but it buys less.

Inflation's cruelest effect is the **invisible tax on cash**: if your savings account earns less than inflation, your purchasing power shrinks silently. This is why keeping all your money in a checking account — seemingly the "safest" option — actually has a long-term cost.

Central banks (Fed, PBOC) typically target **~2%** as healthy inflation. Rule of thumb: **real return ≈ nominal rate − inflation rate**.`,
    exampleEn: `You have ¥100K in a checking account (0.3% interest), inflation is 3%:

- After one year: ¥100,300 nominal
- But the same lifestyle now costs ¥103,000
- In "last year's money": ¥100,300 ÷ 1.03 ≈ **¥97,400**

Your purchasing power silently lost ≈ ¥2,600 in one year.`,
    quizEn: [
      { question: "Inflation 3%, savings rate 1% → real purchasing power changes by?", options: ["+1%", "−2%", "+4%", "No change"], answer: 1, explanation: "Real return ≈ 1% − 3% = −2%." },
      { question: "Who is hurt LEAST by inflation?", options: ["Someone holding all cash", "Someone holding assets that rise with prices", "Someone with a fixed-rate loan", "Someone on a fixed pension"], answer: 1, explanation: "Asset prices tend to rise with inflation; cash and fixed incomes are eroded." },
      { question: "Using the Rule of 72, 3% inflation doubles prices in ~?", options: ["10 years", "24 years", "36 years", "72 years"], answer: 1, explanation: "72 ÷ 3 = 24 years." },
    ],
  },
  4: {
    explanationEn: `**Time value of money**: ¥1 today is worth more than ¥1 in the future, because today's yuan can be invested immediately (opportunity cost) and inflation erodes future purchasing power.

Two fundamental tools:

- **Present Value (PV)**: discounting future money to today → PV = FV ÷ (1 + r)^n
- **Future Value (FV)**: compounding today's money forward → FV = PV × (1 + r)^n

This "discounting" mindset is the foundation of ALL financial valuation: rent vs buy, insurance returns, interest-free installments — they're all about comparing money at different points in time.`,
    exampleEn: `A friend borrows ¥10,000 and promises to repay the same ¥10,000 one year later. If you could earn 2% risk-free:

The future ¥10,000 is worth 10,000 ÷ 1.02 ≈ **¥9,804 today**

Even if they repay every cent, you've lost ≈ ¥196 in opportunity cost. "Interest-free lending" is never truly free.`,
    quizEn: [
      { question: "¥10,200 received one year from now, discounted at 2% =", options: ["¥10,404", "¥10,000", "¥9,804", "¥10,200"], answer: 1, explanation: "10,200 ÷ 1.02 = ¥10,000." },
      { question: "Why is money today worth more than future money?", options: ["Paper wears out", "Can be invested immediately + inflation erodes future value", "Bank regulations", "Just psychology"], answer: 1, explanation: "Opportunity cost + inflation are the two sources of time value." },
      { question: "When inflation rises, the PV of a fixed future amount will:", options: ["Increase", "Decrease", "Stay the same", "Rise then fall"], answer: 1, explanation: "Higher discount rates reduce the present value of future cash flows." },
    ],
  },
  5: {
    explanationEn: `The **Rule of 72** is a mental math shortcut: **years to double ≈ 72 ÷ annual return (%)**.

- At 6% → doubles in ~12 years
- At 8% → doubles in ~9 years
- At 9% → doubles in ~8 years

It also works for inflation: at 3% inflation, prices double in ~24 years (your cash loses half its purchasing power).

Note: it's an **estimate**, most accurate for rates between 6-10%. But it's enough to answer "what magnitude of return am I looking at?" for everyday decisions.`,
    exampleEn: `Three quick applications:

1. "This product promises 12% returns" → 72÷12 = 6 years to double. If true, that's extraordinary — but recall Stage 3's fraud lessons: **high guaranteed returns = high risk or scam**.
2. "At 4% inflation, when do prices double?" → 72÷4 = 18 years.
3. "I want to double my money in 10 years" → 72÷10 = **7.2%** needed. This instantly tells you which asset class fits your goal.`,
    quizEn: [
      { question: "At 6% annual return, approximately how many years to double?", options: ["6 years", "12 years", "20 years", "72 years"], answer: 1, explanation: "72 ÷ 6 = 12 years." },
      { question: "At 4% inflation, prices double in approximately?", options: ["4 years", "10 years", "18 years", "36 years"], answer: 2, explanation: "72 ÷ 4 = 18 years." },
      { question: "The Rule of 72 is best used for:", options: ["Precise calculations", "Quick mental estimates of magnitude", "Filing taxes", "Stock picking"], answer: 1, explanation: "It's an approximation tool, most accurate for 6-10% rates." },
    ],
  },
  11: {
    explanationEn: `An **emergency fund** = 3-6 months of basic living expenses in liquid assets. Three rules: **sufficient** (3-6 months), **accessible** (checking/MMF), **untouchable** (not for spending or stocks). It's the prerequisite for all investing — without it, emergencies force you to sell at market lows.`,
    exampleEn: `Monthly expenses ¥8,000 → target ¥24K-¥48K. Auto-transfer ¥2,000/month into a MMF → ¥24K in one year. Emergency fund first → then invest.`,
    quizEn: [
      { question: "Typical emergency fund size:", options: ["1 month", "3-6 months", "1 year", "Unlimited"], answer: 1, explanation: "3 months minimum, 6 for sole earners." },
      { question: "Emergency fund's #1 priority:", options: ["Returns", "Liquidity", "Stocks", "Longest duration"], answer: 1, explanation: "Must be instantly accessible." },
      { question: "Why is it a prerequisite for investing?", options: ["Bank mandate", "Avoid forced selling at lows", "Increases returns", "Law"], answer: 1, explanation: "Without a cushion, emergencies turn paper losses into real ones." },
    ],
  },
  12: {
    explanationEn: `Effective goals pass **SMART**: Specific, Measurable, Achievable, Relevant, Time-bound. Goals **determine your tools**: money needed in 1-2 years → low-risk; 5+ years → can handle volatility.`,
    exampleEn: `❌ "Save more money" → ✅ "Save ¥100K in 3 years: ¥2,800/month into MMF + short bonds at ~2.5%". ¥2,800 × 36 = ¥100,800 — goal achieved on principal alone.`,
    quizEn: [
      { question: "The T in SMART stands for:", options: ["Trend", "Time-bound", "Tax", "Total"], answer: 1, explanation: "No deadline = indefinite procrastination." },
      { question: "Down payment needed in 2 years → use:", options: ["Stock funds", "Low-risk instruments", "Crypto", "30Y bonds"], answer: 1, explanation: "Short-term money can't afford volatility." },
      { question: "Which is SMART?", options: ["Financial freedom", "¥500K in 5 years, ¥6,500/month DCA", "More money", "Less spending"], answer: 1, explanation: "Specific, measurable, time-bound, achievable." },
    ],
  },
  13: {
    explanationEn: `**Opportunity cost**: the value of the best alternative you give up. Money spent on A can't buy B — B's value is the hidden price. This exposes "free" things: idle savings forgo investment returns; impulse buys forgo 30 years of compounding.`,
    exampleEn: `¥200K for a car vs investing at 5%: in 10 years, invested = ¥326K. The real question: "Is 10 years of car convenience worth the ~¥126K difference?" Decide with full information.`,
    quizEn: [
      { question: "Opportunity cost = ?", options: ["What you paid", "Value of the best alternative forgone", "Losses", "Fees"], answer: 1, explanation: "The best alternative given up is the true cost." },
      { question: "¥200K at 5% for 10 years ≈ ?", options: ["¥250K", "¥280K", "¥326K", "¥400K"], answer: 2, explanation: "1.05^10 ≈ 1.63." },
      { question: "'Free' things have opportunity cost?", options: ["No", "Yes — they consume time/money/attention", "Only big items", "Only for the rich"], answer: 1, explanation: "Everything consumes your limited resources." },
    ],
  },
  14: {
    explanationEn: `Four behavioral traps: **instant gratification** (save never), **mental accounting** (bonus ≠ salary? same money!), **sunk cost** ("haven't sold = haven't lost"), **herding** (buy at tops). Fix with **systems, not willpower**: auto-transfers, DCA, cooling periods, written buy theses.`,
    exampleEn: `Sunk cost: A fund is down 20% for 2 years. Wrong question: "How much have I lost?" Right question: "**If I had cash today, would I buy this?**" No → switch. Yes → hold. Decisions only concern the future.`,
    quizEn: [
      { question: "'Not selling = not losing' is:", options: ["Mental accounting", "Sunk cost fallacy", "Herding", "Instant gratification"], answer: 1, explanation: "Refusing to face losses only lets mistakes compound." },
      { question: "Splurging bonuses but pinching salary pennies is:", options: ["Rational", "Mental accounting", "Risk preference", "Diversification"], answer: 1, explanation: "Money has no labels." },
      { question: "Best mechanism against 'spend first, save later':", options: ["Willpower", "Auto-transfer on payday", "More news", "Fewer ads"], answer: 1, explanation: "Automation bypasses temptation." },
    ],
  },
  15: {
    explanationEn: `Stage 1 in 7 sentences: ① Financial literacy = avoid avoidable losses ② **Time** is the strongest compound interest variable ③ **Real return = nominal − inflation** ④ A yuan today > tomorrow: **PV = FV ÷ (1+r)^n** ⑤ **Net worth = assets − liabilities** ⑥ Start with **50/30/20 + pay yourself first**; savings rate > income ⑦ **Emergency fund → SMART goals → opportunity cost → behavioral systems**.`,
    exampleEn: `Self-check before Stage 2: □ Know my net worth □ Know last month's spending □ Have 3+ months emergency fund □ Auto-transfer on payday □ Can write 1 SMART goal. 4+ = ready. ≤2 = revisit Lessons 7-11.`,
    quizEn: [
      { question: "Purpose of financial knowledge:", options: ["Avoid avoidable losses", "Get rich", "Follow trends", "Predict markets"], answer: 0, explanation: "Lesson 1." },
      { question: "Emergency fund first principle:", options: ["Returns", "Liquidity", "Growth", "Duration"], answer: 1, explanation: "Lesson 11." },
      { question: "'Wait to break even' = which bias?", options: ["Anchoring", "Sunk cost fallacy", "Herding", "FOMO"], answer: 1, explanation: "Lesson 14." },
      { question: "50/30/20 correct order:", options: ["Spend then save", "Auto-save on payday then spend", "Debt then saving then spending", "Any order"], answer: 1, explanation: "Pay Yourself First — Lesson 9." },
      { question: "Which best predicts financial security?", options: ["Income", "Savings rate", "Net worth", "Stock picks"], answer: 1, explanation: "Lesson 10." },
      { question: "Compound interest's strongest variable:", options: ["Principal", "Time", "Rate", "Luck"], answer: 1, explanation: "Lesson 2." },
    ],
  },
};
