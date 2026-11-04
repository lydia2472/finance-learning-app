import Link from "next/link";
import CfaPrepTracker from "@/components/CfaPrepTracker";
import {
  CFA_TOPICS,
  cfaFacts,
  cfaRoadmap,
  cfaLevels,
  l1TopicWeights,
  examLogistics,
  studyStrategy,
  certificateCompare,
  lessonCfaMap,
  stageCfaMap,
  topicName,
} from "@/data/cfa";
import { stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, allLessons, type Lesson } from "@/data/lessons";

const statusStyle: Record<string, string> = {
  主线覆盖: "bg-emerald-100 text-emerald-700",
  选修覆盖: "bg-indigo-100 text-indigo-700",
  部分覆盖: "bg-amber-100 text-amber-700",
  进阶模块规划中: "bg-stone-200 text-stone-600",
};

const stageNames: Record<number, string> = {
  2: "个人财务底盘",
  3: "保障先行",
  4: "认识投资世界",
  5: "基金与指数实战",
  6: "宏观与行为金融",
  7: "长期财富管理",
  8: "进阶选修 · 小白话讲 CFA 一级",
};

const liveStages = [2, 3, 4, 5, 6, 7, 8];

function LessonTagList({ lessons }: { lessons: Lesson[] }) {
  return (
    <ol className="space-y-2">
      {lessons.map((l) => {
        const tags = lessonCfaMap[l.id] ?? [];
        return (
          <li
            key={l.id}
            className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              href={`/lesson/${l.id}`}
              className="text-sm font-medium text-stone-800 hover:text-emerald-700"
            >
              第 {l.id} 课 · {l.title}
            </Link>
            <div className="flex flex-wrap gap-1.5">
              {tags.length === 0 ? (
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500">
                  综合复习 · 贯穿多域
                </span>
              ) : (
                tags.map((t) => (
                  <span
                    key={t.topic + t.level}
                    title={t.note}
                    className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                  >
                    CFA {t.level} · {topicName(t.topic)}
                  </span>
                ))
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function CfaMapPage() {
  return (
    <div className="space-y-10">
      <header>
        <Link href="/" className="text-sm text-stone-400 transition hover:text-stone-600">
          ← 返回首页
        </Link>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">CFA 进阶中心</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          从本课程到 CFA 的完整路标：知识地图、三级体系、报考实务、备考方法与进度追踪——每一步都知道自己在哪、下一步是什么。
        </p>
        <nav className="mt-4 flex flex-wrap gap-2 text-xs">
          {[
            ["#levels", "三级体系"],
            ["#weights", "L1 权重与衔接"],
            ["#logistics", "报考实务"],
            ["#method", "备考方法"],
            ["#tracker", "备考进度"],
            ["#map", "知识域对照"],
            ["#roadmap", "进阶路径"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-stone-200 bg-white px-3 py-1.5 font-medium text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* 背景速览 */}
      <section>
        <h2 className="mb-3 font-bold">CFA 是什么</h2>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {cfaFacts.map((f) => (
            <div key={f.k} className="rounded-xl border border-stone-200 bg-white p-4">
              <dt className="text-xs font-semibold text-stone-400">{f.k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 合规声明 */}
      <section className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5">
        <h2 className="text-sm font-bold text-indigo-900">商标与合规声明</h2>
        <p className="mt-2 text-xs leading-relaxed text-indigo-900/80">
          CFA<sup>®</sup> 与 Chartered Financial Analyst<sup>®</sup> 是 CFA Institute
          的注册商标。本产品与 CFA Institute 无任何隶属、合作或授权关系；本页仅参考其公开的知识体系主题结构为自研课程标注对应关系，不提供、不复制、不改编任何官方教材或试题，也不对任何考试的通过作出承诺。官方信息请以{" "}
          <a
            href="https://www.cfainstitute.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            cfainstitute.org ↗
          </a>{" "}
          为准。
        </p>
      </section>

      {/* 三级体系 */}
      <section id="levels" className="scroll-mt-20">
        <h2 className="mb-3 font-bold">三级体系：从『知道』到『会用』</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {cfaLevels.map((l) => (
            <div key={l.level} className="rounded-2xl border border-stone-200 bg-white p-5">
              <h3 className="text-lg font-bold">{l.level}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">{l.focus}</p>
              <dl className="mt-3 space-y-1.5 text-xs text-stone-500">
                <div><dt className="inline font-semibold">题型：</dt><dd className="inline">{l.format}</dd></div>
                <div><dt className="inline font-semibold">考期：</dt><dd className="inline">{l.windows}</dd></div>
                <div><dt className="inline font-semibold">通过率：</dt><dd className="inline">{l.passRate}</dd></div>
                <div><dt className="inline font-semibold">学习时长：</dt><dd className="inline">{l.hours}</dd></div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-stone-400">通过率与时长为近年公开统计量级，随年份波动，以 CFA Institute 官方数据为准。</p>
      </section>

      {/* L1 权重与课程衔接 */}
      <section id="weights" className="scroll-mt-20">
        <h2 className="mb-1 font-bold">Level I 权重分布 × 本课程衔接（2026）</h2>
        <p className="mb-3 text-xs leading-relaxed text-amber-700">
          ⚠️ {l1TopicWeights.note}
        </p>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">知识域</th>
                <th className="px-4 py-3 font-medium">权重</th>
                <th className="px-4 py-3 font-medium">题量（约）</th>
                <th className="px-4 py-3 font-medium">本 App 对应课程</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {l1TopicWeights.rows.map((r) => (
                <tr key={r.topic}>
                  <td className="px-4 py-3 font-medium">{topicName(r.topic)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {r.weight}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-500">{r.questions}</td>
                  <td className="px-4 py-3 text-xs text-stone-600">{r.bridge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 报考实务 */}
      <section id="logistics" className="scroll-mt-20">
        <h2 className="mb-1 font-bold">报考实务（2026 年 11 月核对）</h2>
        <p className="mb-3 text-xs text-stone-400">费用与政策随年份调整，报名前以 cfainstitute.org 官方页面为准。</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {examLogistics.map((e) => (
            <div key={e.k} className="rounded-xl border border-stone-200 bg-white p-4">
              <dt className="text-xs font-semibold text-stone-400">{e.k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700">{e.v}</dd>
            </div>
          ))}
        </div>
      </section>

      {/* 备考方法 */}
      <section id="method" className="scroll-mt-20">
        <h2 className="mb-3 font-bold">备考方法：六条实战经验</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {studyStrategy.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-stone-200 bg-white p-4">
              <h3 className="text-sm font-bold text-stone-800">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-xs text-white">{i + 1}</span>
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 备考进度追踪 */}
      <section id="tracker" className="scroll-mt-20">
        <h2 className="mb-1 font-bold">我的备考进度追踪器</h2>
        <p className="mb-3 text-xs text-stone-400">
          按十大域与里程碑勾选，进度存在本设备——配合上面的权重表使用：先拿下四座大山（道德/财报/权益/固收，合计约五成分值）。
        </p>
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <CfaPrepTracker />
        </div>
      </section>

      {/* 证书对比 */}
      <section id="compare" className="scroll-mt-20">
        <h2 className="mb-1 font-bold">CFA vs FRM vs CPA：选哪张？</h2>
        <p className="mb-3 text-xs text-stone-400">三者不互斥——方向不同，组合使用的人也不少。</p>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">证书</th>
                <th className="px-4 py-3 font-medium">定位</th>
                <th className="px-4 py-3 font-medium">考试形式</th>
                <th className="px-4 py-3 font-medium">适合方向</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {certificateCompare.map((c) => (
                <tr key={c.name}>
                  <td className="px-4 py-3">
                    <div className="font-bold">{c.name}</div>
                    <div className="text-xs text-stone-400">{c.org} · {c.note}</div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{c.focus}</td>
                  <td className="px-4 py-3 text-xs text-stone-500">{c.format}</td>
                  <td className="px-4 py-3 text-stone-600">{c.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 十大知识域对照 */}
      <section id="map" className="scroll-mt-20">
        <h2 className="mb-1 font-bold">CFA 十大知识域 × 本课程对照</h2>
        <p className="mb-3 text-xs text-stone-400">
          「部分覆盖」指本课程用小白语言讲到了入门层；系统化学习（如财报分析、衍生品）需要进阶模块或官方课程。
        </p>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">CFA 知识域</th>
                <th className="px-4 py-3 font-medium">在本 App 哪里学</th>
                <th className="px-4 py-3 font-medium">覆盖状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {CFA_TOPICS.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{t.zh}</div>
                    <div className="text-xs text-stone-400">{t.en}</div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{t.where}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 已上线阶段逐课标签 */}
      <section>
        <h2 className="mb-1 font-bold">阶段 1 · 每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          标签格式：CFA 级别 · 知识域（L1 = Level I，L3 = Level III）。这些标签也显示在每课的标题下方。
        </p>
        <LessonTagList lessons={stage1.lessons} />
      </section>

      <section>
        <h2 className="mb-1 font-bold">阶段 2 · 每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          个人财务底盘阶段以财富规划（Wealth Planning）为主线，辅以汇率与税收等经济学主题。
        </p>
        <LessonTagList lessons={stage2.lessons} />
      </section>

      <section>
        <h2 className="mb-1 font-bold">阶段 3 · 每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          保障阶段对应财富规划（Wealth Planning）中的保险需求分析，防骗与维权部分对应道德与职业标准（Ethics）中的投资者保护视角。
        </p>
        <LessonTagList lessons={stage3.lessons} />
      </section>

      <section>
        <h2 className="mb-1 font-bold">阶段 4 · 每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          投资工具全景：股票、固定收益、基金结构与组合管理入门在此集中展开。
        </p>
        <LessonTagList lessons={stage4.lessons} />
      </section>

      <section>
        <h2 className="mb-1 font-bold">阶段 5 · 每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          实战阶段：估值、业绩评价、财富规划（Wealth Planning）与投资政策声明（IPS）。
        </p>
        <LessonTagList lessons={stage5.lessons} />
      </section>

      <section>
        <h2 className="mb-1 font-bold">阶段 6 · 每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          宏观部分对应经济学（Economics），行为金融部分对应组合管理 Level III 的 Behavioral Finance 主题。
        </p>
        <LessonTagList lessons={stage6.lessons} />
      </section>

      <section>
        <h2 className="mb-1 font-bold">阶段 7 · 每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          财富管理主线：退休、税务、传承与投资政策声明（IPS），穿插道德与职业标准中的专业服务主题。
        </p>
        <LessonTagList lessons={stage7.lessons} />
      </section>

      <section>
        <h2 className="mb-1 font-bold">阶段 8 · 进阶选修每一课的 CFA 对应标签</h2>
        <p className="mb-3 text-xs text-stone-400">
          进阶选修共 25 课，系统覆盖 CFA Level I 十大知识域中的九个（道德与职业标准以投资者保护视角融入阶段 3 与全课程）。
        </p>
        <LessonTagList lessons={stage8.lessons} />
      </section>

      {/* 各阶段映射 */}
      <section>
        <h2 className="mb-3 font-bold">各阶段的知识域覆盖</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Object.entries(stageCfaMap).map(([no, topics]) => {
            const live = liveStages.includes(Number(no));
            return (
              <div
                key={no}
                className={`rounded-xl px-4 py-3 ${
                  live
                    ? "border border-indigo-200 bg-indigo-50/50"
                    : "border border-dashed border-stone-300 bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-stone-600">
                    阶段 {no} · {stageNames[Number(no)]}
                  </div>
                  {live && (
                    <span className="shrink-0 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white">
                      已上线
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {topics.map((t) => (
                    <span key={t} className="rounded-full bg-white px-2 py-0.5 text-xs text-indigo-700 ring-1 ring-indigo-100">
                      {topicName(t)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 进阶路径 */}
      <section id="roadmap" className="scroll-mt-20">
        <h2 className="mb-1 font-bold">从本课程到 CFA：进阶路径</h2>
        <p className="mb-3 text-xs text-stone-400">
          本课程定位是投资者教育（让你管好自己的钱）；CFA 定位是职业资格（帮别人管钱/做研究）。两者衔接顺畅但目标不同。
        </p>
        <ol className="space-y-3">
          {cfaRoadmap.map((s) => (
            <li key={s.step} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                {s.step}
              </span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{s.desc}</p>
                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2"
                  >
                    官方页面 ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 text-xs leading-relaxed text-stone-500">
        已完成 {allLessons.length} 课的标签映射，阶段 2-7 内容上线时将同步补齐逐课标签。本页内容仅为教育信息，不构成任何考试报名建议；费用与报考条件请以官方发布为准。
      </section>
    </div>
  );
}
