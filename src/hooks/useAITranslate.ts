"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
  const configRef = useRef({ baseUrl: "http://localhost:11434/v1", model: "qwen2.5:7b" });

  const translate = useCallback(async (chineseText: string, lessonId: number, section: string): Promise<string> => {
    const cacheKey = `${CACHE_PREFIX}${lessonId}-${section}-${hashStr(chineseText.slice(0, 50))}`;

    // 检查缓存
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) return cached;
    } catch {}

    // 调用本地 Ollama 翻译
    const systemPrompt = `You are a professional financial translator. Translate the following Chinese financial education content into clear, natural English. Keep all financial terms accurate. Maintain formatting. Output ONLY the English translation.`;

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
          baseUrl: configRef.current.baseUrl,
          model: configRef.current.model,
        }),
      });

      const data = await resp.json();
      if (data.reply) {
        try {
          localStorage.setItem(cacheKey, data.reply);
        } catch {}
        return data.reply;
      }
      return chineseText;
    } catch {
      return chineseText;
    }
  }, []);

  return { translate };
}
