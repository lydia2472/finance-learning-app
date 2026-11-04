"use client";

import { useEffect, useRef, useState } from "react";
import type { Lesson } from "@/data/lessons";

// ---- 配置管理 ----
// 当前使用本地 Ollama，直接硬编码（后续如需切换云端 API，通过设置面板修改）
const CONFIG_KEY = "lesson-chat-config-v1";
type ChatConfig = { apiKey: string; baseUrl: string; model: string };

const OLLAMA_CONFIG: ChatConfig = {
  apiKey: "ollama",
  baseUrl: "http://localhost:11434/v1",
  model: "qwen2.5:7b",
};

// ---- 消息类型 ----
type Msg = { role: "user" | "assistant"; content: string };

// ---- 快捷提问（无需 API，直接展示答案）----
function quickQuestions(lesson: Lesson): { q: string; a: string }[] {
  const qs: { q: string; a: string }[] = [
    {
      q: "这课的核心一句话是什么？",
      a: lesson.intro,
    },
    {
      q: "这课的例子里的数字是怎么算的？",
      a: `关键数字：${lesson.example.replace(/[#*`]/g, "").slice(0, 200)}…（完整推导见课程正文）`,
    },
    {
      q: "这课和哪几课有关联？",
      a: lesson.sources.length > 0
        ? `延伸阅读来源：${lesson.sources.map((s) => s.label).join("、")}。相邻课程（前后课）通常与本课构成一条知识线。`
        : "查看相邻课程（前后课）获取关联内容。",
    },
  ];
  return qs;
}

export default function LessonChat({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<ChatConfig>(OLLAMA_CONFIG);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [configReady, setConfigReady] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 始终使用本地 Ollama 配置，不从 localStorage 读取旧配置
    setConfig(OLLAMA_CONFIG);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveConfig = (c: ChatConfig) => {
    setConfig(c);
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(c));
    } catch {}
    setShowSettings(false);
  };

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: q };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      // 构建带课程上下文的系统消息
      const systemPrompt = `你是一个友好的金融教育助手。用户正在学习以下课程，请基于课程内容回答问题，用通俗易懂的中文解释，适当举例。如果问题超出课程范围，可以延伸回答但要标注。课程内容如下：\n\n【第${lesson.id}课：${lesson.title}】\n${lesson.explanation}\n\n【例子】\n${lesson.example}`;

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...newMessages,
          ],
          ...config,
        }),
      });

      const data = await resp.json();
      if (data.error) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: `⚠️ ${data.error}` },
        ]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      }
    } catch (e) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `⚠️ 网络请求失败：${e instanceof Error ? e.message : String(e)}`,
        },
      ]);
    }
    setLoading(false);
  };

  const quick = quickQuestions(lesson);

  return (
    <>
      {/* 浮动按钮 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-2xl shadow-lg transition hover:scale-105 hover:bg-stone-700"
          title="AI 助教：有问题就问"
        >
          💬
        </button>
      )}

      {/* 聊天面板 */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[420px]">
          <div className="flex h-[500px] max-h-[75vh] flex-col overflow-hidden rounded-t-2xl border border-stone-200 bg-white shadow-2xl sm:rounded-2xl">
            {/* 头部 */}
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-900 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <div>
                  <p className="text-sm font-semibold">AI 助教</p>
                  <p className="text-[11px] text-stone-400">
                    第 {lesson.id} 课 · {lesson.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="rounded-lg p-1.5 text-stone-400 transition hover:bg-white/10 hover:text-white"
                  title="API 设置"
                >
                  ⚙️
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-stone-400 transition hover:bg-white/10 hover:text-white"
                  title="关闭"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 设置面板 */}
            {showSettings && (
              <div className="space-y-3 border-b border-stone-100 bg-stone-50 p-4">
                <p className="text-xs leading-relaxed text-stone-500">
                  配置你自己的 LLM API（支持 OpenAI 兼容接口：OpenAI / Anthropic 代理 / 本地 Ollama 等）。Key 只存本机浏览器。
                </p>
                <div className="space-y-2">
                  <input
                    value={config.baseUrl}
                    onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                    placeholder="API Base URL（如 https://api.openai.com/v1）"
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs"
                  />
                  <input
                    value={config.model}
                    onChange={(e) => setConfig({ ...config, model: e.target.value })}
                    placeholder="模型名（如 gpt-4o-mini）"
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs"
                  />
                  <input
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    placeholder="API Key（sk-...）"
                    type="password"
                    className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs"
                  />
                  <button
                    onClick={() => saveConfig(config)}
                    className="w-full rounded-lg bg-stone-900 py-2 text-xs font-semibold text-white hover:bg-stone-700"
                  >
                    保存设置
                  </button>
                </div>
              </div>
            )}

            {/* 消息区 */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-center text-xs text-stone-400">
                    学习中遇到不懂的？直接问 👇
                  </p>
                  {/* 快捷提问 */}
                  {quick.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setMessages([
                          { role: "user", content: item.q },
                          { role: "assistant", content: item.a },
                        ]);
                      }}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-left text-sm text-stone-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      💡 {item.q}
                    </button>
                  ))}
                  {configReady && !config.apiKey && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                      💬 快捷提问可以直接用。要自由提问，请点击上方 ⚙️ 配置你的 LLM API Key（支持 OpenAI / Ollama 等）。
                    </div>
                  )}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-100 text-stone-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-stone-100 px-4 py-2.5 text-sm text-stone-500">
                    <span className="animate-pulse">思考中…</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* 输入区 */}
            <div className="border-t border-stone-100 p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder={
                    config.apiKey
                      ? "问任何关于这课的问题…"
                      : "配置 API Key 后可自由提问（⌘↵ 发送）"
                  }
                  disabled={loading}
                  className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 text-sm focus:border-emerald-400 focus:outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-40"
                >
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
