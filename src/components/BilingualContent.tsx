"use client";

import Markdown from "@/components/Markdown";
import { useLang } from "@/hooks/useLang";

export default function BilingualContent({
  contentZh,
  contentEn,
  className,
}: {
  contentZh: string;
  contentEn?: string;
  className?: string;
}) {
  const { lang } = useLang();

  // 英文模式且有英文内容 → 直接显示英文（秒出）
  if (lang === "en" && contentEn) {
    return (
      <Markdown
        content={contentEn}
        className={className ?? "prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"}
      />
    );
  }

  // 否则显示中文
  return (
    <Markdown
      content={contentZh}
      className={className ?? "prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"}
    />
  );
}
