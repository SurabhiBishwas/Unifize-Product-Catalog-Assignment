import React from "react";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const inputClass =
  "min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:opacity-50";

export default function SearchSortBar({ searchText, onSearchChange, disabled }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        id="catalog-search"
        aria-label="Search products"
        type="search"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        disabled={disabled}
        className={inputClass}
        placeholder="Search products..."
      />
      <button
        type="button"
        disabled={disabled}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 sm:min-w-[120px]"
        aria-label="Search"
      >
        <SearchIcon />
        Search
      </button>
    </div>
  );
}
