import { marked } from "marked";

export default function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  // ASCII 波浪号会被 CommonMark/GFM 解析为删除线定界符（X~Y~Z → <del>），
  // 统一替换为全角 ～：中文区间写法视觉不变，且不参与 Markdown 解析
  const normalized = content.replace(/~/g, "～");
  const html = marked.parse(normalized, { async: false }) as string;
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
