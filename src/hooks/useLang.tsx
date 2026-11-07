"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "zh" | "en";

const KEY = "app-language";

type Messages = typeof zh;

const zh = {
  // 导航
  appName: "每日金融一课",
  navNews: "新闻简报",
  navCfa: "CFA 进阶",
  navAbout: "来源与声明",
  navPortfolio: "持仓",
  // 首页
  todayLesson: "今日一课",
  perDay: "每天 5-10 分钟",
  startLearning: "开始学习",
  minutes: "分钟",
  difficulty: "难度",
  completed: "已完成",
  allCoursesComplete: "全部课程已上线",
  mainLine: "主线 7 阶段",
  elective: "进阶选修",
  electiveTag: "选修",
  units: "课",
  inProduction: "制作中",
  myBookmarks: "我的收藏",
  bookmarked: "已收藏",
  bookmark: "收藏",
  totalCourses: "共",
  // 课程页
  backToList: "返回课程列表",
  conceptSection: "概念讲解",
  exampleSection: "举个例子",
  quizSection: "小测验",
  furtherReading: "延伸阅读",
  relatedCourses: "关联课程",
  nextLesson: "下一课",
  prevPage: "返回首页",
  allDone: "全部课程已完成",
  // 测验
  question: "题",
  correct: "答对了！",
  wrong: "不对哦。",
  nextQuestion: "下一题",
  viewResults: "查看结果",
  correctCount: "答对",
  finishLesson: "完成本课",
  lessonCompleted: "本课已完成，进度已记录",
  score: "分",
  quizProgress: "测验",
  // AI 助教
  aiTutor: "AI 助教",
  askAnything: "问任何关于这课的问题…",
  send: "发送",
  thinking: "思考中…",
  apiSettings: "API 设置",
  saveSettings: "保存设置",
  close: "关闭",
  noMessages: "学习中遇到不懂的？直接问",
  // 新闻
  dailyBriefing: "每日财经简报",
  pastEditions: "往期简报",
  items: "条要闻",
  whatHappened: "发生了什么",
  whyWallet: "为什么和你的钱包有关",
  econCalendar: "经济日历",
  // 持仓
  portfolioTitle: "我的持仓与情景推演",
  addHolding: "添加持仓",
  target: "标的",
  customName: "自定义…",
  amount: "持仓金额（元）",
  add: "添加",
  clearAll: "清空全部",
  delete: "删除",
  assetAllocation: "资产分布",
  totalValue: "持仓总额",
  stockRatio: "股票类占比",
  refLine: "参考线",
  myAge: "我的年龄",
  structuralDiagnosis: "结构诊断",
  historicalRisk: "历史风险参考",
  scenarioProjection: "情景推演",
  projectionYears: "推演年限",
  monthlyInvest: "每月新增投入",
  conservative: "保守",
  neutral: "中性",
  optimistic: "乐观",
  historicalAnchor: "用历史锚填入",
  totalInvested: "累计投入",
  projectedValue: "年后推演值",
  blendedRate: "组合加权假设年化",
  fiNumber: "财务自由数字",
  monthlySpend: "月支出",
  currentProgress: "当前持仓",
  afterYears: "年后",
  // CFA
  cfaCenter: "CFA 进阶中心",
  threeLevelSystem: "三级体系",
  l1Weights: "Level I 权重分布",
  examLogistics: "报考实务",
  studyMethod: "备考方法",
  progressTracker: "备考进度追踪器",
  certComparison: "证书对比",
  advancementPath: "进阶路径",
  // 通用
  loading: "加载中…",
  notFound: "没有找到这一课",
  riskWarning: "不构成投资建议",
};

const en: Messages = {
  appName: "Daily Finance",
  navNews: "News",
  navCfa: "CFA",
  navAbout: "About",
  navPortfolio: "Portfolio",
  todayLesson: "Today's Lesson",
  perDay: "5-10 min per day",
  startLearning: "Start Learning",
  minutes: "min",
  difficulty: "Level",
  completed: "Completed",
  allCoursesComplete: "All Courses Available",
  mainLine: "Main Path · 7 Stages",
  elective: "Elective: CFA Level I in Plain Language",
  electiveTag: "Elective",
  units: "lessons",
  inProduction: "Coming Soon",
  myBookmarks: "My Bookmarks",
  bookmarked: "Bookmarked",
  bookmark: "Bookmark",
  totalCourses: "Total",
  backToList: "Back to Course List",
  conceptSection: "Key Concepts",
  exampleSection: "Real-World Example",
  quizSection: "Quick Quiz",
  furtherReading: "Further Reading",
  relatedCourses: "Related Lessons",
  nextLesson: "Next",
  prevPage: "Home",
  allDone: "All Courses Complete",
  question: "",
  correct: "Correct!",
  wrong: "Not quite.",
  nextQuestion: "Next →",
  viewResults: "See Results",
  correctCount: "Score",
  finishLesson: "Complete ✓",
  lessonCompleted: "Lesson completed — progress saved",
  score: "",
  quizProgress: "Quiz",
  aiTutor: "AI Tutor",
  askAnything: "Ask anything about this lesson…",
  send: "Send",
  thinking: "Thinking…",
  apiSettings: "API Settings",
  saveSettings: "Save",
  close: "Close",
  noMessages: "Stuck on something? Just ask",
  dailyBriefing: "Daily Financial Briefing",
  pastEditions: "Past Editions",
  items: "items",
  whatHappened: "What happened",
  whyWallet: "Why it matters for your wallet",
  econCalendar: "Economic Calendar",
  portfolioTitle: "Portfolio & Scenario Tool",
  addHolding: "Add Holding",
  target: "Asset",
  customName: "Custom…",
  amount: "Amount (¥)",
  add: "Add",
  clearAll: "Clear All",
  delete: "Delete",
  assetAllocation: "Asset Allocation",
  totalValue: "Total Value",
  stockRatio: "Equity Ratio",
  refLine: "Reference",
  myAge: "My age",
  structuralDiagnosis: "Structural Diagnosis",
  historicalRisk: "Historical Risk (10Y)",
  scenarioProjection: "Scenario Projection",
  projectionYears: "Years",
  monthlyInvest: "Monthly Addition",
  conservative: "Conservative",
  neutral: "Neutral",
  optimistic: "Optimistic",
  historicalAnchor: "Use Historical Anchor",
  totalInvested: "Total Invested",
  projectedValue: "Yr Projected",
  blendedRate: "Blended Rate",
  fiNumber: "Financial Independence",
  monthlySpend: "Monthly Spend",
  currentProgress: "Current",
  afterYears: "Yr Later",
  cfaCenter: "CFA Study Center",
  threeLevelSystem: "Three-Level System",
  l1Weights: "L1 Topic Weights",
  examLogistics: "Exam Logistics",
  studyMethod: "Study Methods",
  progressTracker: "Prep Progress Tracker",
  certComparison: "Certification Comparison",
  advancementPath: "Path Forward",
  loading: "Loading…",
  notFound: "Lesson not found",
  riskWarning: "Not investment advice",
};

const messages: Record<Lang, Messages> = { zh, en };

interface LangContextType {
  lang: Lang;
  t: Messages;
  toggle: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: "zh",
  t: zh,
  toggle: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "zh") setLang(saved);
    } catch {}
  }, []);

  const toggle = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, t: messages[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
