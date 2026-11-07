# 每日金融一课 📚

从金融小白到投资能手的完整学习系统。

**[English README](README.md)**

## 功能

- **175 课完整课程**：主线 7 阶段 + CFA 进阶选修
- **互动测验**：每课 3 道题，即时反馈与解析
- **学习进度追踪**：打卡连胜、阶段进度、收藏功能
- **CFA 进阶中心**：知识地图、备考追踪、报考实务
- **每日财经简报**：五分类新闻 + 市场行情 + 关联课程
- **持仓工具**：资产诊断、历史风险（Wind 数据）、情景推演
- **AI 助教**：基于课程内容的智能问答

## 安装与运行

### 前置要求

| 软件 | 版本 | 检查命令 | 下载 |
|------|------|---------|------|
| Node.js | ≥ 18.18 | `node -v` | [nodejs.org](https://nodejs.org) |
| npm | ≥ 9 | `npm -v` | 随 Node.js 安装 |

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/lydia2472/finance-learning-app.git
cd finance-learning-app

# 2. 安装依赖（国内用户可用镜像）
npm install
# 或：npm install --registry=https://registry.npmmirror.com

# 3. 启动
npm run dev        # 开发模式
# 或
npm run build && npm start  # 生产模式
```

浏览器打开 `http://localhost:3000`

## 启用 AI 助教（可选）

### 方式一：本地 Ollama（免费推荐）

```bash
brew install ollama
brew services start ollama
ollama pull qwen2.5:7b
```

### 方式二：云端 API

| 提供商 | Base URL | 模型名 |
|--------|----------|--------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| 智谱 AI | `https://open.bigmodel.cn/api/paas/v4` | `glm-4-flash` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |

## 免责声明

本产品全部内容仅为投资者教育之目的，不构成任何投资建议。

## License

MIT
