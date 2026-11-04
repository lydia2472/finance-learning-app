"use client";

import { useMemo, useState } from "react";
import type { QuizItem } from "@/data/lessons";

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz({
  items,
  onFinish,
}: {
  items: QuizItem[];
  onFinish: (correct: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [done, setDone] = useState(false);

  const item = items[idx];
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
          答对 {correctCount} / {items.length}
        </h3>
        <p className="mt-1 text-sm text-stone-500">
          {full
            ? "全对！这个知识点你真的掌握了。"
            : "错题的解析在上面，不妨回看一眼——错题会在之后的复习功能里再见到你。"}
        </p>
        {!done ? (
          <button
            onClick={() => {
              setDone(true);
              onFinish(correctCount);
            }}
            className="mt-5 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            完成本课 ✓
          </button>
        ) : (
          <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            本课已完成，进度已记录
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
            测验 {idx + 1} / {items.length}
          </span>
          <span>答对 {correctCount} 题</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold leading-relaxed">{item.question}</h3>

      <div className="mt-4 space-y-2.5">
        {item.options.map((opt, i) => (
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
          <span className="font-bold">{correct ? "答对了！" : "不对哦。"}</span>{" "}
          {item.explanation}
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
          {isLast ? "查看结果" : "下一题 →"}
        </button>
      )}
    </div>
  );
}
