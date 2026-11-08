"use client";

import { useState } from "react";
import Markdown from "@/components/Markdown";
import { useLang } from "@/hooks/useLang";
import { useAITranslate } from "@/hooks/useAITranslate";

export default function BilingualContent({
  content,
  lessonId,
  section,
}: {
  content: string;
  lessonId: number;
  section: string;
}) {
  const { lang } = useLang();
  const { translate } = useAITranslate();
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  // 中文模式直接显示原文
  if (lang === "zh") {
    return (
      <Markdown
        content={content}
        className="prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"
      />
    );
  }

  // 英文模式
  const handleTranslate = async () => {
    setLoading(true);
    const result = await translate(content, lessonId, section);
    setTranslated(result);
    setLoading(false);
  };

  return (
    <div>
      {/* 翻译按钮或翻译结果 */}
      {translated ? (
        <>
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <p className="mb-2 text-xs font-semibold text-emerald-700">
              🌐 AI English Translation
            </p>
            <Markdown
              content={translated}
              className="prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"
            />
          </div>
          {/* 显示/隐藏原文 */}
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="mb-3 text-xs font-medium text-stone-400 underline hover:text-stone-600"
          >
            {showOriginal ? "Hide Chinese original" : "Show Chinese original"}
          </button>
          {showOriginal && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 opacity-70">
              <Markdown
                content={content}
                className="prose prose-stone max-w-none prose-p:leading-relaxed"
              />
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <Markdown
              content={content}
              className="prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"
            />
          </div>
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="mt-3 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Translating…" : "🌐 Translate to English (AI)"}
          </button>
          {loading && (
            <p className="mt-2 text-xs text-stone-400">
              Using local Ollama AI — first translation may take 10-30 seconds
            </p>
          )}
        </div>
      )}
    </div>
  );
}
