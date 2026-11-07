# 每日金融一课 📚

从金融小白到投资能手的完整学习系统。

## 功能

- **175 课完整课程**：主线 7 阶段 + CFA 进阶选修
  - 阶段 1：金钱观与理财启蒙（复利、通胀、预算、应急基金）
  - 阶段 2：个人财务底盘（信用、债务、房贷、换汇、税务）
  - 阶段 3：保障先行（四类保险、社保、防骗与维权）
  - 阶段 4：认识投资世界（股票、债券、基金、ETF、资产配置）
  - 阶段 5：基金与指数实战（定投、估值、费率、投资计划书）
  - 阶段 6：宏观与行为金融（央行、经济周期、行为偏差）
  - 阶段 7：长期财富管理（退休、传承、财务自由）
  - 进阶选修：小白话讲 CFA 一级（25 课）
- **互动测验**：每课 3 道题，即时反馈与解析
- **学习进度追踪**：打卡连胜、阶段进度、收藏功能
- **CFA 进阶中心**：知识地图、三级体系、备考进度追踪、报考实务
- **每日财经简报**：五分类新闻（国际政治/宏观央行/国内政策/市场行情/AI 科技）+ 「为什么和你的钱包有关」解读 + 关联课程链接
- **持仓工具**：资产分布诊断、历史风险参考（Wind 数据）、情景推演（非预测）
- **AI 助教**：基于课程内容的智能问答（本地 Ollama / OpenAI 兼容 API）

## 安装与运行

### 前置要求

| 软件 | 版本要求 | 检查命令 | 下载地址 |
|------|---------|---------|---------|
| Node.js | ≥ 18.18 | `node -v` | [nodejs.org](https://nodejs.org) |
| npm | ≥ 9 | `npm -v` | 随 Node.js 安装 |

### 方式一：从 GitHub 克隆（推荐）

```bash
# 1. 克隆仓库
git clone https://github.com/lydia2472/finance-learning-app.git
cd finance-learning-app

# 2. 安装依赖
npm install

# 3. 启动开发模式（适合开发调试，支持热更新）
npm run dev
```

启动后浏览器打开 `http://localhost:3000`

### 方式二：生产模式运行（性能更好）

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

启动后浏览器打开 `http://localhost:3000`

### 常见问题

**Q: `npm install` 很慢或失败？**
```bash
# 使用国内镜像
npm install --registry=https://registry.npmmirror.com
```

**Q: `npm run dev` 报 Node 版本不够？**

用 nvm 升级 Node：
```bash
brew install nvm          # macOS
nvm install 22            # 安装 Node 22
nvm use 22                # 切换版本
node -v                   # 确认 ≥ 18.18
```

**Q: 页面打开是空白的？**
- 确认终端没有报错
- 尝试强制刷新（`⌘+Shift+R` / `Ctrl+Shift+R`）
- 清除浏览器缓存后重试

## 启用 AI 助教（可选，但强烈推荐）

AI 助教让你在学习任何一课时可以直接提问，AI 会基于当前课程内容回答。

### 方式一：本地 Ollama（免费，推荐）

```bash
# 1. 安装 Ollama
brew install ollama

# 2. 启动服务（设为开机自启）
brew services start ollama

# 3. 下载中文模型（约 4.7GB，需几分钟）
ollama pull qwen2.5:7b

# 4. 验证安装成功
ollama list
# 应显示：qwen2.5:7b    ...    4.7 GB
```

安装完成后，打开任何课程 → 点击右下角 💬 按钮 → 输入问题即可。默认配置已指向本地 Ollama，无需额外设置。

> ⚠️ 如果你有 VPN/代理软件，下载模型时可能被拦截。请暂时关闭代理，下载完后再开启。

### 方式二：云端 API（如 DeepSeek）

| 提供商 | Base URL | 模型名 | 注册地址 |
|--------|----------|--------|---------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` | [platform.deepseek.com](https://platform.deepseek.com) |
| 智谱 AI | `https://open.bigmodel.cn/api/paas/v4` | `glm-4-flash` | [open.bigmodel.cn](https://open.bigmodel.cn) |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` | [platform.openai.com](https://platform.openai.com) |

获取 API Key 后：打开课程 → 💬 → ⚙️ 设置 → 填入 Base URL / 模型名 / API Key → 保存

## 使用指南

| 页面 | 功能 | 入口 |
|------|------|------|
| 首页 | 今日一课、进度总览、收藏列表 | 顶部导航 |
| 课程页 | 概念讲解 + 例子 + 测验 + AI 助教 | 点击课程卡片 |
| 新闻简报 | 每日五分类财经要闻 + 市场快照 | 顶部「新闻简报」 |
| 持仓工具 | 录入持仓、诊断结构、情景推演 | 顶部「持仓」 |
| CFA 进阶 | 知识地图、备考追踪 | 顶部「CFA 进阶」 |

## 项目结构

```
finance-learning-app/
├── src/
│   ├── app/              # Next.js 页面路由
│   │   ├── page.tsx      # 首页
│   │   ├── lesson/[id]/  # 课程页
│   │   ├── news/         # 每日简报
│   │   ├── portfolio/    # 持仓工具
│   │   ├── cfa-map/      # CFA 进阶中心
│   │   └── api/chat/     # AI 助教后端
│   ├── components/       # UI 组件
│   ├── data/             # 课程内容与市场数据
│   └── hooks/            # 进度/收藏状态管理
├── package.json
└── README.md
```

## 数据来源

| 数据 | 来源 | 说明 |
|------|------|------|
| 课程内容 | 自研（参考 SEC/CFPB/Khan Academy 公共领域框架） | AI 辅助创作 + 人工审核 |
| 市场行情 | Wind | 指数涨跌幅、PE 估值、历史 K 线 |
| 每日新闻 | 多源检索 + CNN Business + Wind | AI 检索生成，附原文链接 |

## 免责声明

本产品全部内容仅为投资者教育与知识普及之目的，**不构成任何投资建议**，亦不构成对任何证券、基金等金融产品的推荐。据此操作，风险自担。历史数据与情景推演均不代表未来。详见 App 内「来源与声明」页。

## License

MIT（课程内容仅供个人学习使用）
