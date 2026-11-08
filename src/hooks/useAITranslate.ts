"use client";

import { useState, useEffect } from "react";

const CACHE_PREFIX = "translation-cache-";

// 简单哈希，用作缓存 key
function hashStr(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export function useAITranslate() {
  const [config, setConfig] = useState({ baseUrl: "", model: "" });

  useEffect(() => {
    setConfig({
      baseUrl: "http://localhost:11434/v1",
      model: "qwen2.5:7b",
    });
  }, []);

  const translate = async (chineseText: string, lessonId: number, section: string): Promise<string> => {
    const cacheKey = `${CACHE_PREFIX}${lessonId}-${section}-${hashStr(chineseText.slice(0, 50))}`;

    // 检查缓存
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) return cached;
    } catch {}

    // 调用本地 Ollama 翻译
    const systemPrompt = `You are a professional financial translator. Translate the following Chinese financial education content into clear, natural English. Keep all financial terms accurate (e.g., 复利 = compound interest, 最大回撤 = maximum drawdown, 资产配置 = asset allocation). Maintain the formatting (paragraphs, lists, bold text). Output ONLY the English translation, no explanations.`;

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: chineseText },
          ],
          apiKey: "ollama",
          baseUrl: config.baseUrl,
          model: config.model,
        }),
      });

      const data = await resp.json();
      if (data.reply) {
        // 缓存翻译结果
        try {
          localStorage.setItem(cacheKey, data.reply);
        } catch {}
        return data.reply;
      }
      return chineseText; // 翻译失败，返回原文
    } catch {
      return chineseText;
    }
  };

  return { translate };
}
