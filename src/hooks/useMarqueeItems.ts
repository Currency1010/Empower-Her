"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_MARQUEE_ENABLED,
  DEFAULT_MARQUEE_ITEMS,
  MARQUEE_ENABLED_STORAGE_KEY,
  MARQUEE_STORAGE_KEY,
} from "@/lib/marqueeConfig";

function parseItems(raw: string | null) {
  if (!raw) return DEFAULT_MARQUEE_ITEMS;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      return parsed;
    }
    return DEFAULT_MARQUEE_ITEMS;
  } catch {
    return DEFAULT_MARQUEE_ITEMS;
  }
}

export default function useMarqueeItems() {
  const [items, setItems] = useState<string[]>(DEFAULT_MARQUEE_ITEMS);
  const [enabled, setEnabled] = useState(DEFAULT_MARQUEE_ENABLED);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromStorage = () => {
      const nextItems = parseItems(window.localStorage.getItem(MARQUEE_STORAGE_KEY));
      setItems(nextItems);
      const nextEnabled = window.localStorage.getItem(MARQUEE_ENABLED_STORAGE_KEY);
      setEnabled(nextEnabled === null ? DEFAULT_MARQUEE_ENABLED : nextEnabled === "true");
    };

    syncFromStorage();

    const onStorage = (event: StorageEvent) => {
      if (event.key === MARQUEE_STORAGE_KEY || event.key === MARQUEE_ENABLED_STORAGE_KEY) {
        syncFromStorage();
      }
    };

    const onCustomUpdate = () => {
      syncFromStorage();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("marquee-items-updated", onCustomUpdate);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("marquee-items-updated", onCustomUpdate);
    };
  }, []);

  return { items, enabled };
}
