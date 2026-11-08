"use client";

import Link from "next/link";
import { editions, categoryMeta, type NewsEdition } from "@/data/news";
import { getLesson } from "@/data/lessons";
import { marketSnapshot } from "@/data/market";
import { useLang } from "@/hooks/useLang";

function EditionBlock({
  edition,
}: {
  edition: NewsEdition;
}) {
  const { lang } = useLang();
  const isEn = lang === "en";
  const headline = isEn && edition.headlineEn ? edition.headlineEn : edition.headline;
  const calendar = isEn && edition.calendarEn ? edition.calendarEn : edition.calendar;

  return (
    <article className="space-y-4">
      <header className="rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 p-6 text-white">
        <p className="text-xs font-medium tracking-wide text-stone-300">
          {edition.date} · {isEn ? "Daily Financial Briefing" : "每日财经简报"}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed">{headline}</p>
      </header>

      {edition.items.map((item, i) => {
        const meta = categoryMeta[item.category];
        const title = isEn && item.titleEn ? item.titleEn : item.title;
        const fact = isEn && item.factEn ? item.factEn : item.fact;
        const why = isEn && item.whyEn ? item.whyEn : item.why;
        return (
          <div
            key={i}
            className="rounded-2xl border border-stone-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}
              >
                {meta.name}
              </span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-stone-400 underline decoration-stone-200 underline-offset-2 hover:text-stone-600"
              >
                {item.sourceName} ↗
              </a>
            </div>
            <h3 className="mt-2.5 text-lg font-bold leading-snug">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              <span className="font-semibold text-stone-800">
                {isEn ? "What happened: " : "发生了什么："}
              </span>
              {fact}
            </p>
            <div className="mt-3 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              <span className="font-semibold">
                💰 {isEn ? "Why it matters for your wallet: " : "为什么和你的钱包有关："}
              </span>
              {why}
            </div>
            {item.relatedLessons && item.relatedLessons.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3">
                <span className="text-xs text-stone-400">
                  {isEn ? "Related lessons:" : "关联课程："}
                </span>
                {item.relatedLessons.map((id) => {
                  const lesson = getLesson(id);
                  if (!lesson) return null;
                  return (
                    <Link
                      key={id}
                      href={`/lesson/${id}`}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
                    >
                      {isEn ? `L${id} · ${lesson.titleEn || lesson.title}` : `第 ${id} 课 · ${lesson.title}`}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {calendar && calendar.length > 0 && (
        <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-5">
          <h3 className="text-sm font-bold text-sky-900">
            📅 {isEn ? "Economic Calendar" : "经济日历"}
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm text-sky-900/80">
            {calendar.map((c, i) => (
              <li key={i}>· {c}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function NewsPage() {
  const { lang, t } = useLang();
  const [latest, ...older] = editions;

  return (
    <div className="space-y-8">
      <header>
        <Link href="/" className="text-sm text-stone-400 transition hover:text-stone-600">
          ← {t.navNews}
        </Link>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">📰 {t.dailyBriefing}</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          {lang === "zh"
            ? "每天早上 8 点由 AI 检索国内外真实新闻生成（五分类 + AI 科技），每条附『为什么和你的钱包有关』的解读与关联课程。"
            : "Every morning at 8 AM, AI retrieves real news across 5 categories + AI Tech, with 'why it matters for your wallet' analysis and linked course lessons."}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Object.values(categoryMeta).map((m) => (
            <span key={m.name} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${m.chip}`}>
              {m.name}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-xl border border-stone-200 bg-stone-900 px-4 py-3 text-white">
        <div className="flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex gap-4 whitespace-nowrap text-sm">
            {marketSnapshot.quotes.map((q) => {
              const up = q.chgPct >= 0;
              return (
                <span key={q.code} className="flex items-center gap-1.5">
                  <span className="text-xs text-stone-400">{q.name}</span>
                  <span className={`font-semibold ${up ? "text-rose-400" : "text-emerald-400"}`}>
                    {up ? "+" : ""}{q.chgPct.toFixed(2)}%
                  </span>
                  <span className="text-[11px] text-stone-500">{q.ytdPct >= 0 ? "+" : ""}{q.ytdPct.toFixed(1)}%</span>
                </span>
              );
            })}
          </div>
          <span className="shrink-0 text-[10px] text-stone-500">Wind · {marketSnapshot.asOf}</span>
        </div>
      </section>

      {latest ? <EditionBlock edition={latest} /> : (
        <p className="py-16 text-center text-stone-400">{t.loading}</p>
      )}

      {older.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-stone-500">
            {lang === "zh" ? "往期简报" : "Past Editions"}
          </h2>
          {older.map((e) => (
            <details
              key={e.date}
              className="rounded-2xl border border-stone-200 bg-white p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-stone-600">
                {e.date} · {e.items.length} {lang === "zh" ? "条要闻" : "items"}
              </summary>
              <div className="mt-4">
                <EditionBlock edition={e} />
              </div>
            </details>
          ))}
        </section>
      )}

      <footer className="rounded-2xl border border-stone-200 bg-white p-5 text-xs leading-relaxed text-stone-500">
        {lang === "zh"
          ? "简报由 AI 基于公开新闻检索生成并附来源链接，新闻版权归原作者及原发布媒体所有，本页面仅提供标题摘要与原文链接；解读部分仅为金融知识普及，不构成任何投资建议。"
          : "Briefings are AI-generated from public news sources with attribution. News content belongs to original publishers; this page provides only headlines/summaries with source links. Analysis is for financial education only, not investment advice."}
      </footer>
    </div>
  );
}
