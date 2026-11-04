"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { useBookmarks } from "@/hooks/useBookmarks";
import {
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
  stage7,
  stage8,
  allLessons,
  upcomingStages,
  type Lesson,
  type Stage,
} from "@/data/lessons";
import { editions } from "@/data/news";

function Stars(n: number) {
  return "★".repeat(n) + "☆".repeat(3 - n);
}

function StageBlock({
  stage,
  completed,
}: {
  stage: Stage;
  completed: number[];
}) {
  const done = stage.lessons.filter((l) => completed.includes(l.id)).length;
  const pct = Math.round((done / stage.lessons.length) * 100);
  return (
    <>
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-bold">阶段 {stage.no} · {stage.name}</h2>
            <p className="mt-1 text-sm text-stone-500">{stage.desc}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">{done} / {stage.lessons.length}</div>
            <div className="text-xs text-stone-400">已完成</div>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </section>
      <section>
        <LessonGrid lessons={stage.lessons} completed={completed} />
      </section>
    </>
  );
}

function LessonGrid({
  lessons,
  completed,
}: {
  lessons: Lesson[];
  completed: number[];
}) {
  const nextId = lessons.find((l) => !completed.includes(l.id))?.id;
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {lessons.map((l) => {
        const isDone = completed.includes(l.id);
        const isNext = nextId === l.id;
        return (
          <li key={l.id}>
            <Link
              href={`/lesson/${l.id}`}
              className={`flex items-center gap-3 rounded-2xl border-2 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow ${
                isNext
                  ? "border-emerald-500 ring-2 ring-emerald-100"
                  : "border-stone-200"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isDone ? "bg-emerald-500 text-white" : "bg-stone-100 text-stone-500"
                }`}
              >
                {isDone ? "✓" : l.id}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold">{l.title}</span>
                <span className="mt-0.5 block text-xs text-stone-400">
                  {Stars(l.difficulty)} · {l.minutes} 分钟{isNext ? " · 待学习" : ""}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export default function Home() {
  const { progress, ready } = useProgress();
  const { bookmarks } = useBookmarks();
  const doneCount8 = stage8.lessons.filter((l) =>
    progress.completed.includes(l.id)
  ).length;
  const pct8 = Math.round((doneCount8 / stage8.lessons.length) * 100);
  const next = allLessons.find((l) => !progress.completed.includes(l.id)) ?? null;

  if (!ready) {
    return <div className="py-24 text-center text-stone-400">加载中…</div>;
  }

  return (
    <div className="space-y-10">
      {/* 今日一课 */}
      <section>
        {next ? (
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white shadow-lg">
            <p className="text-sm font-medium tracking-wide text-emerald-100">今日一课 · 每天 5-10 分钟</p>
            <h1 className="mt-2 text-3xl font-bold leading-snug">
              第 {next.id} 课 · {next.title}
            </h1>
            <p className="mt-1 text-emerald-100">{next.titleEn}</p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-emerald-50">{next.intro}</p>
            <div className="mt-4 flex items-center gap-3 text-sm text-emerald-100">
              <span>{Stars(next.difficulty)}</span>
              <span>约 {next.minutes} 分钟</span>
            </div>
            <Link
              href={`/lesson/${next.id}`}
              className="mt-6 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-emerald-700 shadow transition hover:bg-emerald-50"
            >
              开始学习 →
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white shadow-lg">
            <p className="text-sm font-medium text-amber-100">🎓 恭喜！全部课程完成</p>
            <h1 className="mt-2 text-3xl font-bold">
              主线 7 阶段 + 进阶选修 · 共 {allLessons.length} 课毕业啦
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-amber-50">
              你已经完成全部课程！定期回来重做各阶段周测巩固，从第 175 课的 IPS 开始把所学落成自己的投资计划书，或者去 /cfa-map 看看进阶路径的下一步。
            </p>
            <Link
              href="/lesson/175"
              className="mt-6 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-amber-700 shadow transition hover:bg-amber-50"
            >
              回顾收官课 →
            </Link>
          </div>
        )}
      </section>

      {/* 我的收藏 */}
      {bookmarks.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 font-bold text-amber-700">
            <span>⭐ 我的收藏</span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium">
              {bookmarks.length} 课
            </span>
          </h2>
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {bookmarks.map((id) => {
              const l = allLessons.find((x) => x.id === id);
              if (!l) return null;
              return (
                <li key={id}>
                  <Link
                    href={`/lesson/${id}`}
                    className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:shadow"
                  >
                    <span className="text-amber-400">★</span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-stone-800">
                        第 {id} 课 · {l.title}
                      </span>
                      <span className="text-xs text-stone-400">{l.titleEn}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* 主线阶段 1-7 */}
      {[stage1, stage2, stage3, stage4, stage5, stage6, stage7].map((s) => (
        <StageBlock key={s.no} stage={s} completed={progress.completed} />
      ))}

      {/* 每日新闻简报入口 */}
      <section>
        <Link
          href="/news"
          className="flex items-center justify-between rounded-2xl border-2 border-stone-800 bg-stone-800 p-5 text-white transition hover:-translate-y-0.5 hover:shadow"
        >
          <div className="min-w-0">
            <h3 className="font-bold">
              📰 每日财经简报
              {editions[0] && (
                <span className="ml-2 rounded-full bg-white/15 px-2.5 py-0.5 align-middle text-xs font-medium">
                  最新：{editions[0].date} · {editions[0].items.length} 条
                </span>
              )}
            </h3>
            <p className="mt-1 truncate text-sm text-stone-300">
              {editions[0]
                ? editions[0].headline
                : "每天早 8 点更新：五分类要闻 + 为什么和你的钱包有关 + 关联课程"}
            </p>
          </div>
          <span className="shrink-0 text-stone-400">→</span>
        </Link>
      </section>

      {/* 持仓工具入口 */}
      <section>
        <Link
          href="/portfolio"
          className="flex items-center justify-between rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-5 transition hover:-translate-y-0.5 hover:shadow"
        >
          <div>
            <h3 className="font-bold text-emerald-900">📊 我的持仓与情景推演</h3>
            <p className="mt-1 text-sm text-emerald-900/70">
              录入持仓看资产分布与结构诊断 · 在自设假设下推演 N 年后的区间（非预测）
            </p>
          </div>
          <span className="shrink-0 text-emerald-500">→</span>
        </Link>
      </section>

      {/* CFA 进阶路径入口 */}
      <section>
        <Link
          href="/cfa-map"
          className="flex items-center justify-between rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-5 transition hover:-translate-y-0.5 hover:shadow"
        >
          <div>
            <h3 className="font-bold text-indigo-900">🎓 CFA 知识地图与进阶路径</h3>
            <p className="mt-1 text-sm text-indigo-900/70">
              每一课与 CFA 十大知识域的对应关系 · 从本课程到官方入门证书的进阶路线
            </p>
          </div>
          <span className="shrink-0 text-indigo-400">→</span>
        </Link>
      </section>

      {/* 阶段 8 */}
      <section className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 p-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-bold text-indigo-900">
              阶段 {stage8.no} · {stage8.name}
              <span className="ml-2 rounded-full bg-indigo-600 px-2.5 py-0.5 align-middle text-xs font-medium text-white">选修</span>
            </h2>
            <p className="mt-1 max-w-xl text-sm text-stone-600">{stage8.desc}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-700">{doneCount8} / {stage8.lessons.length}</div>
            <div className="text-xs text-stone-400">已完成</div>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${pct8}%` }}
          />
        </div>
      </section>

      <section>
        <LessonGrid lessons={stage8.lessons} completed={progress.completed} />
      </section>

      {/* 课程完整度公告 / 后续阶段预告 */}
      <section>
        {upcomingStages.length > 0 ? (
          <>
            <h2 className="mb-3 font-bold text-stone-700">主线学习路径（制作中）</h2>
            <ul className="space-y-2">
              {upcomingStages.map((s) => (
                <li
                  key={s.no}
                  className="flex items-center justify-between rounded-xl border border-dashed border-stone-300 bg-white/60 px-4 py-3 text-sm"
                >
                  <div>
                    <span className="font-semibold text-stone-600">阶段 {s.no} · {s.name}</span>
                    <span className="ml-2 text-xs text-stone-400">{s.topics}</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500">
                    {s.lessons} 课 · 制作中
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-center">
            <p className="font-bold text-emerald-800">🎉 全部课程已上线</p>
            <p className="mt-1 text-sm text-emerald-700">
              主线 7 阶段 {allLessons.length - stage8.lessons.length} 课 + 进阶选修 {stage8.lessons.length} 课，共 {allLessons.length} 课
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
