import React from "react";
import PaginationControls from "./PaginationControls.jsx";
import ProductCard from "./ProductCard.jsx";

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md">
      <div className="h-44 w-full animate-pulse bg-slate-200" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-7 w-24 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}

const sortSelectClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 min-w-[200px] disabled:opacity-50";

export default function ProductGrid({
  products,
  loading,
  error,
  visibleCount,
  filteredCount,
  sortBy,
  onSortChange,
  page,
  totalPages,
  onPageChange,
  disabled
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-700">
          Showing {visibleCount} of {filteredCount} Products
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-sm font-medium text-slate-700 whitespace-nowrap">
            Sort By
          </label>
          <select
            id="sort-by"
            aria-label="Sort By"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            disabled={disabled}
            className={sortSelectClass}
          >
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="ratingHigh">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          {String(error?.message || error)}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-14">
          <p className="text-sm font-semibold text-slate-900">No products match your filters.</p>
          <p className="text-sm text-slate-600">Try adjusting search or filters, then click Apply Filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {!loading && filteredCount > 0 ? (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <PaginationControls page={page} totalPages={totalPages} onChange={onPageChange} disabled={disabled} />
        </div>
      ) : null}
    </section>
  );
}
