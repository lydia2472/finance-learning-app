"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "@/components/Markdown";
import Quiz from "@/components/Quiz";
import LessonChat from "@/components/LessonChat";
import { getLesson, stageOf, allLessons } from "@/data/lessons";
import { lessonCfaMap, topicName } from "@/data/cfa";
import { useProgress } from "@/hooks/useProgress";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const id = Number(Array.isArray(params?.id) ? params.id[0] : params?.id);
  const lesson = getLesson(id);
  const { isCompleted, completeLesson } = useProgress();
  const [alreadyDone, setAlreadyDone] = useState(false);

  // hydration 安全：等本地进度读取完成后再判断
  useEffect(() => {
    if (Number.isFinite(id)) setAlreadyDone(isCompleted(id));
  }, [id, isCompleted]);

  if (!lesson) {
    return (
      <div className="py-24 text-center">
        <p className="text-stone-500">没有找到这一课。</p>
        <Link href="/" className="mt-4 inline-block text-emerald-600 underline">
          返回首页
        </Link>
      </div>
    );
  }

  const stage = stageOf(lesson.id);
  const idx = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = idx >= 0 ? allLessons[idx + 1] : undefined;
  const stars = "★".repeat(lesson.difficulty) + "☆".repeat(3 - lesson.difficulty);
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(lesson.id);

  return (
    <article className="space-y-8">
      {/* 课头 */}
      <header>
        <Link href="/" className="text-sm text-stone-400 transition hover:text-stone-600">
          ← 返回课程列表
        </Link>
        <div className="mt-3">
          <p className="text-sm font-medium text-emerald-700">
            阶段 {stage.no} · {stage.name}
            {alreadyDone && (
              <span className="ml-2 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                已完成
              </span>
            )}
            <button
              onClick={() => toggle(lesson.id)}
              className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${
                bookmarked
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  : "bg-stone-100 text-stone-500 hover:bg-amber-50 hover:text-amber-600"
              }`}
              title={bookmarked ? "取消收藏" : "收藏此课"}
            >
              {bookmarked ? "★ 已收藏" : "☆ 收藏"}
            </button>
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">
            第 {lesson.id} 课 · {lesson.title}
          </h1>
          <p className="mt-1 text-sm text-stone-400">
            {lesson.titleEn} · {stars} · 约 {lesson.minutes} 分钟
          </p>
          {(lessonCfaMap[lesson.id] ?? []).length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {lessonCfaMap[lesson.id].map((t) => (
                <Link
                  key={t.topic + t.level}
                  href="/cfa-map"
                  title={t.note}
                  className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
                >
                  CFA {t.level} · {topicName(t.topic)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 概念讲解 */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-sm text-white">1</span>
          概念讲解
        </h2>
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <Markdown
            content={lesson.explanation}
            className="prose prose-stone max-w-none prose-p:leading-relaxed prose-strong:text-stone-900"
          />
        </div>
      </section>

      {/* 生活化例子 */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-sm text-white">2</span>
          举个例子
        </h2>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
          <Markdown
            content={lesson.example}
            className="prose prose-stone max-w-none prose-p:leading-relaxed prose-table:text-sm"
          />
        </div>
      </section>

      {/* 测验 */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-sm text-white">3</span>
          小测验
        </h2>
        <Quiz
          items={lesson.quiz}
          onFinish={() => {
            completeLesson(lesson.id);
            setAlreadyDone(true);
          }}
        />
      </section>

      {/* 延伸阅读 */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="mb-3 text-sm font-bold text-stone-500">延伸阅读（权威来源）</h2>
        <ul className="space-y-2">
          {lesson.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-stone-100 pt-3 text-xs text-stone-400">
          本课内容仅为金融知识普及，不构成任何投资建议；数字例子为教学演示，不代表任何产品的实际收益。
        </p>
      </section>

      {/* 下一课 */}
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="rounded-xl border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-white"
        >
          返回首页
        </Link>
        {nextLesson ? (
          <Link
            href={`/lesson/${nextLesson.id}`}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            下一课：第 {nextLesson.id} 课 {nextLesson.title} →
          </Link>
        ) : (
          <span className="rounded-xl bg-amber-100 px-5 py-2.5 text-sm font-medium text-amber-700">
            全部课程已完成 🎉
          </span>
        )}
      </nav>
      <LessonChat lesson={lesson} />
    </article>
  );
}
