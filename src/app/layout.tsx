import type { Metadata } from "next";
import NavShell from "@/components/NavShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "每日金融一课 · Daily Finance",
  description:
    "每天 5-10 分钟，学习一课金融知识：复利、通胀、预算、应急基金、资产配置……从金融小白到投资能手。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
        <NavShell>{children}</NavShell>
      </body>
    </html>
  );
}
