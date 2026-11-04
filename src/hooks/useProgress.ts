"use client";

import { useEffect, useState } from "react";

export type Progress = {
  completed: number[]; // 已完成课程 id
  streak: number; // 连续学习天数
  lastActive: string; // 最近完成日期 YYYY-MM-DD
};

const KEY = "finance-app-progress-v1";
const EMPTY: Progress = { completed: [], streak: 0, lastActive: "" };

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayStr(): string {
  return toDateStr(new Date());
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toDateStr(d);
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProgress({ ...EMPTY, ...(JSON.parse(raw) as Progress) });
    } catch {
      // 本地存储不可用时静默降级为无进度
    }
    setReady(true);
  }, []);

  const completeLesson = (id: number) => {
    setProgress((prev) => {
      const today = todayStr();
      const completed = prev.completed.includes(id)
        ? prev.completed
        : [...prev.completed, id];
      // 只有当天首次完成课程时推进连续天数
      let streak = prev.streak;
      if (prev.lastActive !== today) {
        streak = prev.lastActive === yesterdayStr() ? prev.streak + 1 : 1;
      }
      const next = { completed, streak, lastActive: today };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // 忽略存储失败
      }
      return next;
    });
  };

  const reset = () => {
    setProgress(EMPTY);
    try {
      localStorage.removeItem(KEY);
    } catch {
      // 忽略存储失败
    }
  };

  const isCompleted = (id: number) => progress.completed.includes(id);

  return { progress, ready, isCompleted, completeLesson, reset };
}
