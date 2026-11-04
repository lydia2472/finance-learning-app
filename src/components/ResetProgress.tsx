"use client";

import { useProgress } from "@/hooks/useProgress";

export default function ResetProgress() {
  const { reset, progress } = useProgress();
  return (
    <button
      onClick={() => {
        if (confirm("确定清空所有学习进度吗？此操作不可恢复。")) reset();
      }}
      className="rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
    >
      清空学习进度（已完成 {progress.completed.length} 课）
    </button>
  );
}
