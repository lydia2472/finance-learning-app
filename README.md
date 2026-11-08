# Daily Finance 📚

A complete bilingual (English / 中文) learning system that takes you from finance beginner to confident investor.

**[中文说明](README_CN.md)**

## Features

- **Bilingual Support (English / 中文)**: Switch languages instantly via the dropdown in the navigation bar. Stage 1 (15 lessons) has full English content pre-written; remaining stages fall back to Chinese with English key terms.
- **175 Complete Lessons**: 7 main stages + CFA elective track
  - Stage 1: Money Mindset & Financial Awakening (compound interest, inflation, budgeting, emergency fund)
  - Stage 2: Personal Financial Foundation (credit, debt, mortgage, currency exchange, taxes)
  - Stage 3: Protection First (four types of insurance, social security, fraud prevention)
  - Stage 4: Understanding Investment Tools (stocks, bonds, funds, ETFs, asset allocation)
  - Stage 5: Fund & Index Investing in Practice (DCA, valuation, fees, investment policy statement)
  - Stage 6: Macro & Behavioral Finance (central banks, economic cycles, behavioral biases)
  - Stage 7: Long-Term Wealth Management (retirement, estate planning, financial independence)
  - Elective: CFA Level I in Plain Language (25 lessons)
- **Interactive Quizzes**: 3 questions per lesson with instant feedback and explanations
- **Progress Tracking**: Daily streaks, stage progress, bookmarking
- **CFA Study Center**: Knowledge map, 3-level system, exam prep tracker, registration guide
- **Daily Financial Briefing**: 5-category news (Geopolitics / Macro & Central Banks / China Policy / Markets / AI Tech) with "Why it matters for your wallet" analysis + linked course lessons
- **Portfolio Tool**: Asset allocation diagnostics, historical risk reference (Wind data), scenario projections (not predictions)
- **AI Tutor**: Ask questions about any lesson, answered based on course content (local Ollama or any OpenAI-compatible API)

## Installation & Setup

### Prerequisites

| Software | Version | Check | Download |
|----------|---------|-------|----------|
| Node.js | ≥ 18.18 | `node -v` | [nodejs.org](https://nodejs.org) |
| npm | ≥ 9 | `npm -v` | Included with Node.js |

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/lydia2472/finance-learning-app.git
cd finance-learning-app

# Install dependencies
npm install

# If npm is slow in your region, use a mirror:
# npm install --registry=https://registry.npmmirror.com
```

### Step 2: Run the App

**Option A: Development mode (hot reload, best for development)**
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

**Option B: Production mode (better performance)**
```bash
npm run build
npm start
```
Open `http://localhost:3000` in your browser.

### Troubleshooting

**Q: `npm install` fails or is very slow?**
```bash
npm install --registry=https://registry.npmmirror.com
```

**Q: Node.js version is too old?**
```bash
# Using nvm (Node Version Manager)
brew install nvm
nvm install 22
nvm use 22
node -v  # Should show v22.x.x
```

**Q: Page loads blank?**
- Check the terminal for errors
- Hard refresh: `⌘+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear browser cache and retry

## Enabling the AI Tutor (Optional, Highly Recommended)

The AI Tutor lets you ask questions about any lesson you're studying. It answers based on the current lesson's content.

### Option 1: Local Ollama (Free, Recommended)

```bash
# 1. Install Ollama
brew install ollama

# 2. Start the service (auto-starts on login)
brew services start ollama

# 3. Download a Chinese-capable model (~4.7GB, takes a few minutes)
ollama pull qwen2.5:7b

# 4. Verify installation
ollama list
# Should show: qwen2.5:7b    ...    4.7 GB
```

Once installed, open any lesson → click the 💬 button (bottom-right) → type your question. The default configuration points to local Ollama—no extra setup needed.

> ⚠️ If you use a VPN/proxy, the model download may be blocked. Temporarily disable your proxy during download, then re-enable afterward.

### Option 2: Cloud API

| Provider | Base URL | Model Name | Sign Up |
|----------|----------|------------|---------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` | [platform.deepseek.com](https://platform.deepseek.com) |
| Zhipu AI | `https://open.bigmodel.cn/api/paas/v4` | `glm-4-flash` | [open.bigmodel.cn](https://open.bigmodel.cn) |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` | [platform.openai.com](https://platform.openai.com) |

After getting an API key: Open a lesson → 💬 → ⚙️ Settings → enter Base URL / Model / API Key → Save

## User Guide

| Page | Features | Access |
|------|----------|--------|
| Home | Today's lesson, progress overview, bookmarks | Top navigation |
| Lesson | Concept + Example + Quiz + AI Tutor | Click any lesson card |
| News Briefing | Daily 5-category news + Market snapshot | "News" in navigation |
| Portfolio | Holdings input, allocation diagnostics, projections | "Portfolio" in navigation |
| CFA Center | Knowledge map, exam prep tracker | "CFA" in navigation |

## Project Structure

```
finance-learning-app/
├── src/
│   ├── app/              # Next.js page routes
│   │   ├── page.tsx      # Home page
│   │   ├── lesson/[id]/  # Lesson pages
│   │   ├── news/         # Daily briefing
│   │   ├── portfolio/    # Portfolio tool
│   │   ├── cfa-map/      # CFA study center
│   │   └── api/chat/     # AI Tutor backend
│   ├── components/       # UI components
│   ├── data/             # Course content & market data
│   └── hooks/            # Progress/bookmark state management
├── package.json
└── README.md
```

## Data Sources

| Data | Source | Notes |
|------|--------|-------|
| Course content | Original (based on SEC/CFPB/Khan Academy public domain frameworks) | AI-assisted + human-reviewed |
| Market data | Wind | Index quotes, PE valuations, historical K-lines |
| Daily news | Multi-source + CNN Business + Wind | AI-generated with source links |

## Disclaimer

All content in this product is for investor education and financial literacy purposes only. It does **not constitute investment advice** or a recommendation of any security, fund, or financial product. Past performance and scenario projections do not guarantee future results. See the "Sources & Disclaimer" page within the app for details.

## License

MIT (Course content is for personal learning use only)
