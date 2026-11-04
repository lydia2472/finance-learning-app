"use client";

import { useEffect, useState } from "react";
import { CFA_TOPICS, l1TopicWeights } from "@/data/cfa";

const KEY = "cfa-prep-progress-v1";

const milestones = [
  "注册 CFA Institute 账号",
  "确定考期并完成报名（早鸟价）",
  "预约考位（选定具体日期与考点）",
  "完成第一轮知识学习（勾选下方十大域）",
  "官方题库正确率稳定在 70%+",
  "完成至少 1 次严格计时的完整模拟考",
  "考前一周完整重读道德准则（Ethics）",
  "准备好考试日护照与机考流程演练",
];

type Progress = Record<string, boolean>;

export default function CfaPrepTracker() {
  const [checked, setChecked] = useState<Progress>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // 忽略
    }
    setReady(true);
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // 忽略
      }
      return next;
    });
  };

  const reset = () => {
    if (!confirm("清空 CFA 备考进度记录？")) return;
    setChecked({});
    try {
      localStorage.removeItem(KEY);
    } catch {
      // 忽略
    }
  };

  const topicItems = l1TopicWeights.rows.map((r) => ({
    id: `topic-${r.topic}`,
    label: `${topicLabel(r.topic)}（${r.weight}）`,
  }));
  const milestoneItems = milestones.map((m, i) => ({
    id: `ms-${i}`,
    label: m,
  }));

  const total = topicItems.length + milestoneItems.length;
  const done = [...topicItems, ...milestoneItems].filter(
    (it) => checked[it.id]
  ).length;
  const pct = Math.round((done / total) * 100);

  if (!ready) return <div className="py-8 text-center text-sm text-stone-400">加载中…</div>;

  const itemClass = (id: string) =>
    `flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition cursor-pointer select-none ${
      checked[id]
        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
        : "border-stone-200 bg-white text-stone-700 hover:border-emerald-200"
    }`;

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-end justify-between text-sm">
          <span className="font-semibold text-stone-700">
            我的 Level I 备考进度
          </span>
          <span className="text-stone-500">
            {done} / {total} 项 · {pct}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-bold text-stone-600">
          ① 十大知识域 · 第一轮学习
        </h4>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {topicItems.map((it) => (
            <button
              key={it.id}
              onClick={() => toggle(it.id)}
              className={itemClass(it.id)}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                  checked[it.id]
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-stone-300 bg-white text-transparent"
                }`}
              >
                ✓
              </span>
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-bold text-stone-600">
          ② 备考里程碑（按顺序推进）
        </h4>
        <ol className="space-y-2">
          {milestoneItems.map((it, i) => (
            <li key={it.id}>
              <button
                onClick={() => toggle(it.id)}
                className={`${itemClass(it.id)} w-full text-left`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                    checked[it.id]
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-stone-300 bg-white text-stone-400"
                  }`}
                >
                  {i + 1}
                </span>
                <span>{it.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 pt-4">
        <p className="text-xs text-stone-400">
          进度保存在本设备浏览器（localStorage），不上传。
        </p>
        <button
          onClick={reset}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
        >
          清空进度
        </button>
      </div>
    </div>
  );
}

function topicLabel(id: string): string {
  return CFA_TOPICS.find((t) => t.id === id)?.zh ?? id;
}
