"use client";

import { useEffect, useState } from "react";

const KEY = "finance-app-bookmarks-v1";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {
      // 忽略
    }
    setReady(true);
  }, []);

  const persist = (next: number[]) => {
    setBookmarks(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // 忽略
    }
  };

  const toggle = (lessonId: number) => {
    persist(
      bookmarks.includes(lessonId)
        ? bookmarks.filter((id) => id !== lessonId)
        : [...bookmarks, lessonId]
    );
  };

  const isBookmarked = (lessonId: number) => bookmarks.includes(lessonId);

  return { bookmarks, ready, toggle, isBookmarked };
}
