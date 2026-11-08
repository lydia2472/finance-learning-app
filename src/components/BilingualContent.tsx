"use client";

import { useState, useEffect } from "react";
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

  // 英文模式下自动翻译（无需点击）
  useEffect(() => {
    if (lang !== "en" || translated) return;
    let cancelled = false;
    setLoading(true);
    translate(content, lessonId, section).then((result) => {
      if (!cancelled) {
        setTranslated(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [lang, content, lessonId, section, translated, translate]);

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
  return (
    <div>
      {loading && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span className="text-sm text-emerald-700">Translating with AI…</span>
        </div>
      )}
      {translated && !loading && (
        <>
          <Markdown
            content={translated}
            className="prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"
          />
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="mt-3 text-xs font-medium text-stone-400 underline hover:text-stone-600"
          >
            {showOriginal ? "Hide Chinese original" : "Show Chinese original"}
          </button>
          {showOriginal && (
            <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-4 opacity-70">
              <Markdown
                content={content}
                className="prose prose-stone max-w-none prose-p:leading-relaxed"
              />
            </div>
          )}
        </>
      )}
      {!translated && !loading && (
        <Markdown
          content={content}
          className="prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"
        />
      )}
    </div>
  );
}
