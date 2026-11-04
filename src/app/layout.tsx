import type { Metadata } from "next";
import Link from "next/link";
import StreakBadge from "@/components/StreakBadge";
import "./globals.css";

export const metadata: Metadata = {
  title: "每日金融一课 · 从小白到投资能手",
  description:
    "每天 5-10 分钟学一课金融知识：复利、通胀、预算、应急基金、资产配置……从金融小白到投资能手。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="text-2xl">💰</span>
              每日金融一课
            </Link>
            <div className="flex items-center gap-3 text-sm sm:gap-4">
              <Link href="/portfolio" className="text-stone-500 transition hover:text-stone-900">
                持仓
              </Link>
              <Link href="/news" className="text-stone-500 transition hover:text-stone-900">
                新闻简报
              </Link>
              <Link href="/cfa-map" className="text-stone-500 transition hover:text-stone-900">
                CFA 进阶
              </Link>
              <Link href="/about" className="hidden text-stone-500 transition hover:text-stone-900 sm:inline">
                来源与声明
              </Link>
              <StreakBadge />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-stone-200 bg-white">
          <div className="mx-auto w-full max-w-3xl space-y-1 px-4 py-6 text-xs leading-relaxed text-stone-500">
            <p>
              本产品全部内容仅为投资者教育与知识普及之目的，不构成任何投资建议，亦不构成对任何证券、基金等金融产品的推荐。据此操作，风险自担。
            </p>
            <p>
              部分内容由 AI 辅助创作并经人工审核，参考来源见{" "}
              <Link href="/about" className="underline">
                来源与声明
              </Link>
              。历史数据与示例不代表未来收益。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
