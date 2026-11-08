"use client";

import { useState, useEffect, useMemo } from "react";
import type { QuizItem } from "@/data/lessons";
import { useLang } from "@/hooks/useLang";
import { useAITranslate } from "@/hooks/useAITranslate";

const LETTERS = ["A", "B", "C", "D"];

type TranslatedQuizItem = {
  question: string;
  options: string[];
  explanation: string;
};

function useQuizTranslation(items: QuizItem[], lessonId: number) {
  const { lang } = useLang();
  const { translate } = useAITranslate();
  const [translated, setTranslated] = useState<TranslatedQuizItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lang !== "en" || translated.length > 0) return;
    let cancelled = false;
    setLoading(true);

    const translateAll = async () => {
      const results: TranslatedQuizItem[] = [];
      for (let i = 0; i < items.length; i++) {
        if (cancelled) return;
        const item = items[i];
        // 将问题和选项拼成一段文本翻译
        const raw = `Question: ${item.question}\nOptions:\nA. ${item.options[0]}\nB. ${item.options[1]}\nC. ${item.options[2]}\nD. ${item.options[3]}\nCorrect answer: ${LETTERS[item.answer]}\nExplanation: ${item.explanation}`;
        const result = await translate(raw, lessonId, `quiz-${i}`);
        // 解析翻译结果
        const qMatch = result.match(/Question:\s*(.+?)(?:\n|$)/);
        const optMatches = [...result.matchAll(/([A-D])\.\s*(.+?)(?:\n|$)/g)];
        const expMatch = result.match(/Explanation:\s*(.+?)(?:\n|$)/);
        results.push({
          question: qMatch?.[1]?.trim() ?? item.question,
          options: optMatches.length >= 4
            ? optMatches.slice(0, 4).map((m) => m[2].trim())
            : item.options,
          explanation: expMatch?.[1]?.trim() ?? item.explanation,
        });
      }
      if (!cancelled) {
        setTranslated(results);
        setLoading(false);
      }
    };
    translateAll();
    return () => { cancelled = true; };
  }, [lang, items, lessonId, translated.length, translate]);

  return { translated, loading };
}

export default function Quiz({
  items,
  onFinish,
  lessonId = 0,
}: {
  items: QuizItem[];
  onFinish: (correct: number) => void;
  lessonId?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [done, setDone] = useState(false);
  const { t, lang } = useLang();
  const { translated: translatedItems, loading: translating } = useQuizTranslation(items, lessonId);

  const item = items[idx];
  const displayItem = lang === "en" && translatedItems[idx] ? translatedItems[idx] : null;
  const questionText = displayItem?.question ?? item.question;
  const optionsText = displayItem?.options ?? item.options;
  const explanationText = displayItem?.explanation ?? item.explanation;

  const isLast = idx === items.length - 1;
  const correct = selected !== null && selected === item.answer;

  const optionStyle = (i: number) => {
    if (selected === null) return "border-stone-200 hover:border-emerald-500 hover:bg-emerald-50";
    if (i === item.answer) return "border-emerald-500 bg-emerald-50 text-emerald-900";
    if (i === selected) return "border-red-400 bg-red-50 text-red-900";
    return "border-stone-200 opacity-60";
  };

  const progressPct = useMemo(
    () => Math.round(((finished ? items.length : idx) / items.length) * 100),
    [idx, finished, items.length]
  );

  if (finished) {
    const full = correctCount === items.length;
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
        <div className="text-4xl">{full ? "🎉" : correctCount >= items.length / 2 ? "👍" : "💪"}</div>
        <h3 className="mt-2 text-xl font-bold">
          {lang === "zh" ? `答对 ${correctCount} / ${items.length}` : `${correctCount} / ${items.length} correct`}
        </h3>
        <p className="mt-1 text-sm text-stone-500">
          {full
            ? (lang === "zh" ? "全对！这个知识点你真的掌握了。" : "Perfect score!")
            : (lang === "zh" ? "错题的解析在上面，不妨回看一眼。" : "Check the explanations above.")}
        </p>
        {!done ? (
          <button
            onClick={() => {
              setDone(true);
              onFinish(correctCount);
            }}
            className="mt-5 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            {t.finishLesson} ✓
          </button>
        ) : (
          <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {t.lessonCompleted}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm text-stone-500">
          <span>
            {t.quizProgress} {idx + 1} / {items.length}
          </span>
          <span>
            {lang === "zh" ? `答对 ${correctCount} 题` : `${correctCount} correct`}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {translating && lang === "en" && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span className="text-sm text-emerald-700">Translating quiz…</span>
        </div>
      )}

      <h3 className="text-lg font-semibold leading-relaxed">{questionText}</h3>

      <div className="mt-4 space-y-2.5">
        {optionsText.map((opt, i) => (
          <button
            key={i}
            disabled={selected !== null}
            onClick={() => {
              setSelected(i);
              if (i === item.answer) setCorrectCount((c) => c + 1);
            }}
            className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${optionStyle(i)}`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
              {LETTERS[i]}
            </span>
            <span className="text-[15px]">{opt}</span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm leading-relaxed ${
            correct ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
          }`}
        >
          <span className="font-bold">{correct ? t.correct : t.wrong}</span>{" "}
          {explanationText}
        </div>
      )}

      {selected !== null && (
        <button
          onClick={() => {
            if (isLast) {
              setFinished(true);
            } else {
              setIdx((i) => i + 1);
              setSelected(null);
            }
          }}
          className="mt-4 w-full rounded-xl bg-stone-900 py-3 font-semibold text-white transition hover:bg-stone-700"
        >
          {isLast ? t.viewResults : t.nextQuestion}
        </button>
      )}
    </div>
  );
}
