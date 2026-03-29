import React, { useEffect, useState } from "react";
function sidebarFields(f) {
  return {
    category: f.category,
    priceMin: f.priceMin,
    priceMax: f.priceMax,
    minRating: f.minRating,
    stockStatus: f.stockStatus
  };
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-orange-600">
      <path
        d="M4 5h16l-6 7v6l-4 2v-8L4 5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloppyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3-8H6V5h9v6z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-red-600">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const inputClass =
  "w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:opacity-50";
const labelClass = "text-sm font-medium text-slate-800";

export default function CatalogSidebar({
  categories,
  minRatingOptions,
  filters,
  onApplySidebar,
  onClearSidebar,
  savedFilters,
  saveName,
  setSaveName,
  onSave,
  onApplySaved,
  disabled
}) {
  const [draft, setDraft] = useState(() => sidebarFields(filters));

  useEffect(() => {
    setDraft(sidebarFields(filters));
  }, [filters.category, filters.priceMin, filters.priceMax, filters.minRating, filters.stockStatus]);

  const setDraftPatch = (patch) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <aside className="catalog-sidebar flex flex-col gap-5 rounded-xl bg-slate-100/90 p-5 shadow-sm border border-slate-200/80">
      <div className="flex items-center gap-2">
        <FilterIcon />
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sidebar-category" className={labelClass}>
            Category
          </label>
          <select
            id="sidebar-category"
            aria-label="Category"
            value={draft.category}
            onChange={(e) => setDraftPatch({ category: e.target.value })}
            disabled={disabled}
            className={inputClass}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>Price Range</span>
          <div className="grid grid-cols-2 gap-2">
            <input
              aria-label="Minimum price"
              type="number"
              value={draft.priceMin}
              onChange={(e) => setDraftPatch({ priceMin: e.target.value === "" ? "" : e.target.value })}
              disabled={disabled}
              className={inputClass}
              placeholder="Min"
            />
            <input
              aria-label="Maximum price"
              type="number"
              value={draft.priceMax}
              onChange={(e) => setDraftPatch({ priceMax: e.target.value === "" ? "" : e.target.value })}
              disabled={disabled}
              className={inputClass}
              placeholder="Max"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sidebar-min-rating" className={labelClass}>
            Minimum Rating
          </label>
          <select
            id="sidebar-min-rating"
            aria-label="Minimum Rating"
            value={draft.minRating === "" || draft.minRating == null ? "" : String(draft.minRating)}
            onChange={(e) => setDraftPatch({ minRating: e.target.value })}
            disabled={disabled}
            className={inputClass}
          >
            <option value="">Any Rating</option>
            {minRatingOptions.map((v) => (
              <option key={v} value={String(v)}>
                {String(v)}+
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sidebar-stock" className={labelClass}>
            Stock Status
          </label>
          <select
            id="sidebar-stock"
            aria-label="Stock Status"
            value={draft.stockStatus}
            onChange={(e) => setDraftPatch({ stockStatus: e.target.value })}
            disabled={disabled}
            className={inputClass}
          >
            <option value="all">All Products</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onApplySidebar(draft)}
            className="flex-1 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Apply Filters
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onClearSidebar()}
            className="flex-1 rounded-lg border-2 border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5 flex flex-col gap-3">
        <label htmlFor="save-filter-name" className={labelClass}>
          Save Filter
        </label>
        <input
          id="save-filter-name"
          aria-label="Filter name"
          type="text"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          disabled={disabled}
          className={inputClass}
          placeholder="Filter name..."
        />
        <button
          type="button"
          disabled={disabled || !saveName.trim()}
          onClick={() => onSave(saveName)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <FloppyIcon />
          Save Filter
        </button>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <CheckIcon />
          <span className="text-sm font-semibold text-slate-900">Saved Filters</span>
        </div>
        {savedFilters.length === 0 ? (
          <p className="text-sm text-slate-500">No saved filters yet</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {savedFilters.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onApplySaved(f.filters)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {f.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
