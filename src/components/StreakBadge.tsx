"use client";

import { useProgress } from "@/hooks/useProgress";

export default function StreakBadge() {
  const { progress } = useProgress();
  if (progress.streak <= 0) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
      🔥 连续 {progress.streak} 天
    </span>
  );
}
