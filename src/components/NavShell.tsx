"use client";

import Link from "next/link";
import StreakBadge from "@/components/StreakBadge";
import { LangProvider, useLang } from "@/hooks/useLang";

function Shell({ children }: { children: React.ReactNode }) {
  const { t, lang, setLang } = useLang();
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="text-2xl">💰</span>
            {t.appName}
          </Link>
          <div className="flex items-center gap-2 text-sm sm:gap-3">
            <Link href="/portfolio" className="text-stone-500 transition hover:text-stone-900">
              {t.navPortfolio}
            </Link>
            <Link href="/news" className="text-stone-500 transition hover:text-stone-900">
              {t.navNews}
            </Link>
            <Link href="/cfa-map" className="hidden text-stone-500 transition hover:text-stone-900 sm:inline">
              {t.navCfa}
            </Link>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "zh" | "en")}
              className="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-xs font-semibold text-stone-600 transition hover:border-emerald-400 focus:border-emerald-500 focus:outline-none"
              title="Language / 语言"
            >
              <option value="zh">🌐 中文</option>
              <option value="en">🌐 English</option>
            </select>
            <StreakBadge />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto w-full max-w-3xl space-y-1 px-4 py-6 text-xs leading-relaxed text-stone-500">
          <p>
            {lang === "zh"
              ? "本产品全部内容仅为投资者教育与知识普及之目的，不构成任何投资建议，亦不构成对任何证券、基金等金融产品的推荐。据此操作，风险自担。"
              : "All content is for investor education purposes only and does not constitute investment advice or a recommendation of any financial product."}
          </p>
          <p>
            {lang === "zh" ? "部分内容由 AI 辅助创作并经人工审核。" : "Some content is AI-assisted and human-reviewed. "}
            <Link href="/about" className="underline">{t.navAbout}</Link>
            {lang === "zh" ? "。历史数据与示例不代表未来收益。" : ". Past performance does not guarantee future results."}
          </p>
        </div>
      </footer>
    </>
  );
}

export default function NavShell({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Shell>{children}</Shell>
    </LangProvider>
  );
}
