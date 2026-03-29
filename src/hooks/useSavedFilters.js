import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "unifize_product_catalog_saved_filters_v1";

function readSavedFilters() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x && typeof x.id === "string" && typeof x.name === "string" && x.filters);
  } catch {
    return [];
  }
}

function writeSavedFilters(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
}

export default function useSavedFilters() {
  const [savedFilters, setSavedFilters] = useState(readSavedFilters);

  useEffect(() => {
    writeSavedFilters(savedFilters);
  }, [savedFilters]);

  const count = useMemo(() => savedFilters.length, [savedFilters.length]);

  function saveFilter(name, filters) {
    const safeName = String(name || "").trim();
    if (!safeName) return null;
    const safeFilters = filters || {};
    const id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
    const entry = { id, name: safeName, filters: safeFilters };
    setSavedFilters((prev) => [entry, ...prev]);
    return entry;
  }

  return { savedFilters, saveFilter, count };
}

