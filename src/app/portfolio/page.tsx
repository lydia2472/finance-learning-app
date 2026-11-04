"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  assetMeta,
  presets,
  classAssumedRate,
  type AssetClass,
  type Holding,
} from "@/data/portfolio";
import { marketSnapshot } from "@/data/market";

const HOLDINGS_KEY = "portfolio-holdings-v1";
const SETTINGS_KEY = "portfolio-settings-v1";

type Settings = {
  age: number;
  monthlySpend: number;
  years: number;
  monthly: number;
  rates: [number, number, number];
};

const DEFAULT_SETTINGS: Settings = {
  age: 35,
  monthlySpend: 20000,
  years: 10,
  monthly: 3000,
  rates: [3, 6, 9],
};

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 10000) return `${(n / 10000).toFixed(1)} 万`;
  return n.toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);

  // 录入表单
  const [presetIdx, setPresetIdx] = useState(0);
  const [customName, setCustomName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    try {
      const h = localStorage.getItem(HOLDINGS_KEY);
      if (h) setHoldings(JSON.parse(h));
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(s) });
    } catch {
      // 忽略
    }
    setReady(true);
  }, []);

  const persistHoldings = (next: Holding[]) => {
    setHoldings(next);
    try {
      localStorage.setItem(HOLDINGS_KEY, JSON.stringify(next));
    } catch {
      // 忽略
    }
  };

  const updateSettings = (patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch {
        // 忽略
      }
      return next;
    });
  };

  const addHolding = () => {
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return;
    const useCustom = presetIdx === presets.length;
    const name = useCustom ? customName.trim() : presets[presetIdx].name;
    const asset: AssetClass = useCustom ? "cnbroad" : presets[presetIdx].asset;
    if (!name) return;
    persistHoldings([
      ...holdings,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, asset, amount: amt },
    ]);
    setAmount("");
    setCustomName("");
  };

  const removeHolding = (id: string) =>
    persistHoldings(holdings.filter((h) => h.id !== id));

  const clearAll = () => {
    if (!confirm("确定清空全部持仓记录吗？（数据只存在本机）")) return;
    persistHoldings([]);
  };

  // ---- 统计 ----
  const stats = useMemo(() => {
    const total = holdings.reduce((s, h) => s + h.amount, 0);
    if (total <= 0) return null;
    const byClass = new Map<AssetClass, number>();
    for (const h of holdings)
      byClass.set(h.asset, (byClass.get(h.asset) ?? 0) + h.amount);
    const equity = [...byClass.entries()]
      .filter(([a]) => assetMeta[a].equity)
      .reduce((s, [, v]) => s + v, 0);
    const buffer = (byClass.get("bond") ?? 0) + (byClass.get("cash") ?? 0);
    // 单一市场集中度（按 group：美股/A股/港股）
    const groups = new Map<string, number>();
    for (const h of holdings) {
      const g = assetMeta[h.asset].group;
      groups.set(g, (groups.get(g) ?? 0) + h.amount);
    }
    const topGroup = [...groups.entries()].sort((a, b) => b[1] - a[1])[0];
    return {
      total,
      byClass: [...byClass.entries()].sort((a, b) => b[1] - a[1]),
      equityPct: equity / total,
      bufferPct: buffer / total,
      topGroup: topGroup ? { name: topGroup[0], pct: topGroup[1] / total } : null,
    };
  }, [holdings]);

  // ---- 情景推演 ----
  const scenarios = useMemo(() => {
    if (!stats) return [];
    const { years, monthly, rates } = settings;
    const annual = monthly * 12;
    return rates.map((r) => {
      const rw =
        holdings.reduce(
          (s, h) => s + (h.amount / stats.total) * classAssumedRate(h.asset, r / 100),
          0
        ) * 100;
      const g = 1 + rw / 100;
      const fv =
        stats.total * Math.pow(g, years) +
        annual * ((Math.pow(g, years) - 1) / (rw / 100 || 1));
      return { label: r, blended: rw, fv, invested: stats.total + annual * years };
    });
  }, [holdings, settings, stats]);

  const fiTarget = settings.monthlySpend * 12 * 25;
  const neutral = scenarios.length === 3 ? scenarios[1] : null;

  // ---- Wind 数据派生 ----
  const quoteByCode = useMemo(() => {
    const m = new Map<string, (typeof marketSnapshot.quotes)[number]>();
    for (const q of marketSnapshot.quotes) m.set(q.code, q);
    return m;
  }, []);
  const riskByCode = useMemo(() => {
    const m = new Map<string, (typeof marketSnapshot.riskStats)[number]>();
    for (const r of marketSnapshot.riskStats) m.set(r.code, r);
    return m;
  }, []);

  // 持仓加权历史统计（匹配到指数代码的持仓）
  const histStats = useMemo(() => {
    if (!stats) return null;
    let ret = 0, vol = 0, mdd = 0, matched = 0;
    for (const h of holdings) {
      const code = presetCode(h.name);
      const r = code ? riskByCode.get(code) : undefined;
      if (!r) continue;
      const w = h.amount / stats.total;
      ret += w * r.annReturn;
      vol += w * r.annVol;
      mdd += w * r.maxDrawdown;
      matched += h.amount;
    }
    return matched / stats.total > 0.5 ? { ret, vol, mdd, cover: matched / stats.total } : null;
  }, [holdings, stats, riskByCode]);

  if (!ready) {
    return <div className="py-24 text-center text-stone-400">加载中…</div>;
  }

  return (
    <div className="space-y-10">
      <header>
        <Link href="/" className="text-sm text-stone-400 transition hover:text-stone-600">
          ← 返回首页
        </Link>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">📊 我的持仓与情景推演</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          录入持仓（金额由你填写，数据只存本机），自动生成资产分布与结构诊断；情景推演在<b>你设定的假设利率</b>下做算术——<b>那是假设，不是预测</b>。
        </p>
      </header>

      {/* 市场快照（Wind 数据） */}
      <section className="rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">📈 市场快照</h2>
          <span className="text-xs text-stone-400">
            数据来源 {marketSnapshot.source} · 截至 {marketSnapshot.asOf}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {marketSnapshot.quotes.map((q) => {
            const up = q.chgPct >= 0;
            return (
              <div key={q.code} className="rounded-xl bg-white/10 p-3">
                <div className="text-xs text-stone-300">{q.name}</div>
                <div className={`mt-1 text-lg font-bold ${up ? "text-rose-400" : "text-emerald-400"}`}>
                  {up ? "▲" : "▼"} {Math.abs(q.chgPct).toFixed(2)}%
                </div>
                <div className="mt-0.5 text-[11px] text-stone-400">
                  年至今 {q.ytdPct >= 0 ? "+" : ""}{q.ytdPct.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400">
          {marketSnapshot.valuations.map((v) => (
            <span key={v.code}>{v.name} PE(TTM) {v.peTtm.toFixed(1)} 倍</span>
          ))}
          <span>中国行情红涨绿跌；美股按交易所规则绿涨红跌，此处统一用红涨绿跌标注</span>
        </div>
      </section>

      {/* 录入 */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="mb-3 font-bold">添加持仓</h2>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-xs text-stone-500">
            标的
            <select
              value={presetIdx}
              onChange={(e) => setPresetIdx(Number(e.target.value))}
              className="mt-1 block w-40 rounded-xl border border-stone-200 px-3 py-2 text-sm"
            >
              {presets.map((p, i) => (
                <option key={p.name} value={i}>
                  {p.name}（{assetMeta[p.asset].name}）
                </option>
              ))}
              <option value={presets.length}>自定义…</option>
            </select>
          </label>
          {presetIdx === presets.length && (
            <label className="text-xs text-stone-500">
              名称
              <input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="如：某行业指数"
                className="mt-1 block w-36 rounded-xl border border-stone-200 px-3 py-2 text-sm"
              />
            </label>
          )}
          <label className="text-xs text-stone-500">
            持仓金额（元）
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              placeholder="如 50000"
              className="mt-1 block w-36 rounded-xl border border-stone-200 px-3 py-2 text-sm"
            />
          </label>
          <button
            onClick={addHolding}
            className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            添加
          </button>
          {holdings.length > 0 && (
            <button
              onClick={clearAll}
              className="rounded-xl border border-red-200 px-4 py-2.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              清空全部
            </button>
          )}
        </div>

        {holdings.length > 0 && (
          <ul className="mt-4 divide-y divide-stone-100">
            {holdings.map((h) => {
              const code = presetCode(h.name);
              const quote = code ? quoteByCode.get(code) : undefined;
              const up = quote ? quote.chgPct >= 0 : false;
              return (
                <li key={h.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${assetMeta[h.asset].chip}`}>
                      {assetMeta[h.asset].name}
                    </span>
                    <span className="font-medium">{h.name}</span>
                    {quote && (
                      <span className={`text-xs ${up ? "text-rose-500" : "text-emerald-600"}`}>
                        参考指数 {up ? "+" : ""}{quote.chgPct.toFixed(2)}%
                      </span>
                    )}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-stone-600">{fmt(h.amount)} 元</span>
                    <button
                      onClick={() => removeHolding(h.id)}
                      className="text-xs text-stone-400 transition hover:text-red-600"
                    >
                      删除
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {stats ? (
        <>
          {/* 分布与诊断 */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="flex items-end justify-between">
              <h2 className="font-bold">资产分布</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">{fmt(stats.total)}</div>
                <div className="text-xs text-stone-400">持仓总额（元）</div>
              </div>
            </div>
            <div className="mt-4 flex h-4 overflow-hidden rounded-full">
              {stats.byClass.map(([a, v]) => (
                <div
                  key={a}
                  className={assetMeta[a].bar}
                  style={{ width: `${(v / stats.total) * 100}%` }}
                  title={`${assetMeta[a].name} ${((v / stats.total) * 100).toFixed(1)}%`}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-stone-600">
              {stats.byClass.map(([a, v]) => (
                <span key={a} className="inline-flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-sm ${assetMeta[a].bar}`} />
                  {assetMeta[a].name} {((v / stats.total) * 100).toFixed(0)}%
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-stone-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-stone-700">
                  股票类占比 {(stats.equityPct * 100).toFixed(0)}%
                </span>
                <label className="flex items-center gap-2 text-xs text-stone-500">
                  我的年龄
                  <input
                    type="number"
                    min={18}
                    max={80}
                    value={settings.age}
                    onChange={(e) => updateSettings({ age: Number(e.target.value) })}
                    className="w-16 rounded-lg border border-stone-200 px-2 py-1 text-sm"
                  />
                  参考线（100−年龄）：{Math.max(0, 100 - settings.age)}%
                </label>
              </div>
            </div>
          </section>

          {/* 诊断 */}
          <section className="space-y-2">
            <h2 className="font-bold">结构诊断（对应课程检查线）</h2>
            {stats.equityPct > 0.8 && (
              <Diag
                level="warn"
                text={`股票类占比 ${(stats.equityPct * 100).toFixed(0)}%，高于 80%——组合对股市波动高度敏感，最大回撤可能达 −40%~-50% 量级（第 52/87 课的检查线）。`}
                lessons={[52, 87]}
              />
            )}
            {stats.topGroup && stats.topGroup.pct > 0.6 && assetMeta[holdings.find((h) => assetMeta[h.asset].group === stats.topGroup!.name)?.asset ?? "usequity"].equity && (
              <Diag
                level="warn"
                text={`单一市场集中：${stats.topGroup.name}占总资产 ${(stats.topGroup.pct * 100).toFixed(0)}%（超过 60%）——该市场的政策、汇率、周期将主导你的组合（第 68/90 课）。`}
                lessons={[68, 90]}
              />
            )}
            {stats.bufferPct === 0 && (
              <Diag
                level="warn"
                text="组合中没有债券与现金——缺少下跌时的缓冲垫与再平衡弹药（第 71/88 课：四笔钱里的稳健层空缺）。"
                lessons={[71, 88]}
              />
            )}
            {stats.equityPct <= 0.8 && stats.bufferPct > 0 && (!stats.topGroup || stats.topGroup.pct <= 0.6) && (
              <Diag
                level="ok"
                text="未触发集中度与缓冲检查线。继续用年度体检（第 96 课）保持结构与配比。"
                lessons={[96]}
              />
            )}
          </section>

          {/* 历史风险参考 */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-bold">历史风险参考（近 10 年月度数据）</h2>
            <p className="mt-1 text-xs leading-relaxed text-stone-400">
              基于 Wind 月度 K 线计算（2016-10 至 2026-11）。年化收益为<b>价格指数口径（不含股息）</b>；
              最大回撤含月内盘中低点。历史数据不代表未来（第 67/118 课）。
            </p>
            {histStats && (
              <div className="mt-4 rounded-xl border-2 border-rose-200 bg-rose-50 p-4">
                <div className="text-sm font-bold text-rose-900">
                  你当前持仓的加权历史量级（覆盖 {Math.round(histStats.cover * 100)}% 的持仓）
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-700">{histStats.ret.toFixed(1)}%</div>
                    <div className="text-xs text-rose-600">年化（价格口径）</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-700">{histStats.vol.toFixed(1)}%</div>
                    <div className="text-xs text-rose-600">年化波动</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-700">{histStats.mdd.toFixed(1)}%</div>
                    <div className="text-xs text-rose-600">最大回撤（加权）</div>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-rose-700/80">
                  如果重演历史，你当前组合可能在某个时点浮亏 {Math.abs(histStats.mdd).toFixed(0)}% 左右——
                  这是压力测试的标尺，不是预测（第 52/118 课）。
                </p>
              </div>
            )}
            <div className="mt-4 overflow-x-auto rounded-xl border border-stone-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-xs text-stone-500">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">指数</th>
                    <th className="px-4 py-2.5 font-medium">年化收益</th>
                    <th className="px-4 py-2.5 font-medium">年化波动</th>
                    <th className="px-4 py-2.5 font-medium">最大回撤</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {marketSnapshot.riskStats.map((r) => (
                    <tr key={r.code}>
                      <td className="px-4 py-2.5 font-medium">{r.name}</td>
                      <td className={`px-4 py-2.5 font-semibold ${r.annReturn >= 0 ? "text-rose-600" : "text-emerald-600"}`}>
                        {r.annReturn >= 0 ? "+" : ""}{r.annReturn.toFixed(1)}%
                      </td>
                      <td className="px-4 py-2.5 text-stone-600">{r.annVol.toFixed(1)}%</td>
                      <td className="px-4 py-2.5 font-semibold text-emerald-700">{r.maxDrawdown.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 情景推演 */}
          <section className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-6">
            <h2 className="font-bold">情景推演（假设算术，非预测）</h2>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <NumField label="推演年限（年）" value={settings.years} min={1} max={50} onChange={(v) => updateSettings({ years: v })} />
              <NumField label="每月新增投入（元）" value={settings.monthly} min={0} step={500} onChange={(v) => updateSettings({ monthly: v })} />
              <div className="flex gap-2">
                {settings.rates.map((r, i) => (
                  <NumField
                    key={i}
                    label={i === 0 ? "保守%" : i === 1 ? "中性%" : "乐观%"}
                    value={r}
                    min={0}
                    max={20}
                    onChange={(v) => {
                      const rates = [...settings.rates] as [number, number, number];
                      rates[i] = v;
                      updateSettings({ rates });
                    }}
                  />
                ))}
              </div>
              {histStats && (
                <button
                  onClick={() =>
                    updateSettings({
                      rates: [
                        Math.max(0, Math.round((histStats.ret - 3) * 10) / 10),
                        Math.round(histStats.ret * 10) / 10,
                        Math.round((histStats.ret + 3) * 10) / 10,
                      ],
                    })
                  }
                  className="rounded-xl border border-amber-300 bg-amber-100 px-4 py-2.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-200"
                  title={`历史锚：持仓加权近10年年化 ${histStats.ret.toFixed(1)}%（价格口径，不含股息）`}
                >
                  ⚓ 用历史锚填入（{histStats.ret.toFixed(1)}% ± 3）
                </button>
              )}
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl bg-white">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-stone-500">
                  <tr className="border-b border-stone-100">
                    <th className="px-4 py-2.5 font-medium">情景</th>
                    <th className="px-4 py-2.5 font-medium">组合加权假设年化</th>
                    <th className="px-4 py-2.5 font-medium">累计投入</th>
                    <th className="px-4 py-2.5 font-medium">{settings.years} 年后推演值</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {scenarios.map((s, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2.5 font-semibold">
                        {["保守", "中性", "乐观"][i]}（股票 {s.label}%）
                      </td>
                      <td className="px-4 py-2.5 text-stone-600">{s.blended.toFixed(1)}%</td>
                      <td className="px-4 py-2.5 text-stone-600">{fmt(s.invested)} 元</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700">{fmt(s.fv)} 元</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-amber-800">
              计算规则：股票类按情景利率、黄金按 0.6 倍、债券按 0.4 倍、现金固定 1.5%，按持仓权重加权；每年投入按年末一次性计入。
            </p>
            <div className="mt-3 rounded-xl border border-amber-300 bg-amber-100/70 p-4 text-sm font-semibold leading-relaxed text-amber-900">
              ⚠️ 这是<b>你设定的假设利率下的算术练习</b>，不是对未来收益的预测——没有人能预测市场（第 55/146 课）。实际结果可能显著好于或坏于任何一档。本工具不构成投资建议。
            </div>
          </section>

          {/* 自由数字进度 */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-bold">对照『财务自由数字』（第 126/148 课）</h2>
              <NumField label="月支出（元）" value={settings.monthlySpend} min={1000} step={1000} onChange={(v) => updateSettings({ monthlySpend: v })} />
            </div>
            <p className="mt-2 text-sm text-stone-500">
              目标 = 月支出 × 12 × 25 = <b className="text-stone-800">{fmt(fiTarget)} 元</b>（今天的购买力；有社保等确定性收入可先扣除，第 126 课）
            </p>
            <div className="mt-4 space-y-2">
              <ProgressLine label="当前持仓" pct={Math.min(1, stats.total / fiTarget)} note={`${((stats.total / fiTarget) * 100).toFixed(1)}%`} />
              {neutral && (
                <ProgressLine
                  label={`中性情景 ${settings.years} 年后`}
                  pct={Math.min(1, neutral.fv / fiTarget)}
                  note={`${((neutral.fv / fiTarget) * 100).toFixed(1)}%`}
                  color="bg-emerald-500"
                />
              )}
            </div>
            <p className="mt-3 text-xs text-stone-400">
              想加快进度，最强杠杆是储蓄率（第 10/148 课）；到达后如何『花 30 年』见第 127 课的 4% 法则与序列风险。
            </p>
          </section>
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-sm text-stone-500">
          还没有持仓记录——用上面的表单添加你的第一笔（比如：纳指100 × 50,000）。
        </section>
      )}

      <footer className="rounded-2xl border border-stone-200 bg-white p-5 text-xs leading-relaxed text-stone-500">
        本工具仅为教育演示：不接入实时行情、不预测任何资产的未来表现、不构成投资建议；持仓数据仅保存在本设备浏览器中。收益率假设由使用者自行设定，历史数据与情景推演均不代表未来。市场快照与风险统计来自 <b>Wind</b>（截至 {marketSnapshot.asOf}，个人非商用教育用途）；指数年化收益为价格口径（不含股息），A股历史长周期收益偏低的部分原因正在于此——加上股息后实际持有体验更好。
      </footer>
    </div>
  );
}

function Diag({
  level,
  text,
  lessons,
}: {
  level: "warn" | "ok";
  text: string;
  lessons: number[];
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
        level === "warn"
          ? "border-rose-200 bg-rose-50 text-rose-900"
          : "border-emerald-200 bg-emerald-50 text-emerald-900"
      }`}
    >
      <p className="text-sm leading-relaxed">
        {level === "warn" ? "⚠️ " : "✅ "}
        {text}
      </p>
      <div className="flex shrink-0 gap-1.5">
        {lessons.map((id) => (
          <Link
            key={id}
            href={`/lesson/${id}`}
            className={`rounded-full px-2.5 py-1 text-xs font-medium underline-offset-2 hover:underline ${
              level === "warn" ? "bg-white/70 text-rose-700" : "bg-white/70 text-emerald-700"
            }`}
          >
            第 {id} 课 ↗
          </Link>
        ))}
      </div>
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="text-xs text-stone-500">
      {label}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1 block w-24 rounded-xl border border-stone-200 px-3 py-2 text-sm"
      />
    </label>
  );
}

function ProgressLine({
  label,
  pct,
  note,
  color = "bg-stone-700",
}: {
  label: string;
  pct: number;
  note: string;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-stone-500">
        <span>{label}</span>
        <span>{note}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
}

function presetCode(name: string): string | undefined {
  const map: Record<string, string> = {
    "纳指100": "NDX.GI",
    "标普500": "SPX.GI",
    "上证50": "000016.SH",
    "沪深300": "000300.SH",
    "中证500": "000905.SH",
    "恒生指数": "HSCI.HI",
  };
  return map[name];
}
