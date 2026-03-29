import React, { useMemo } from "react";

export default function PaginationControls({ page, totalPages, onChange, disabled }) {
  const pages = useMemo(() => {
    const maxButtons = 5;
    if (totalPages <= maxButtons) return Array.from({ length: totalPages }).map((_, i) => i + 1);
    const start = Math.max(1, page - Math.floor(maxButtons / 2));
    const end = Math.min(totalPages, start + maxButtons - 1);
    const startAdjusted = Math.max(1, end - maxButtons + 1);
    const out = [];
    for (let p = startAdjusted; p <= end; p++) out.push(p);
    return out;
  }, [page, totalPages]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
        aria-label="Previous page"
      >
        Prev
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            disabled={disabled}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium ${
              p === page
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={disabled || page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
