import React, { useEffect, useMemo, useState } from "react";
import useProducts from "./hooks/useProducts.js";
import useSavedFilters from "./hooks/useSavedFilters.js";
import CatalogSidebar from "./components/CatalogSidebar.jsx";
import SearchSortBar from "./components/SearchSortBar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import {
  DEFAULT_FILTERS,
  buildFilterSnapshot,
  filtersFromSnapshot,
  filterAndSortProducts,
  getUniqueCategories,
  paginate
} from "./utils/productCatalog.js";

const MIN_RATING_OPTIONS = [0, 2, 3, 4, 4.5, 5];

export default function App() {
  const { products, loading, error } = useProducts();
  const { savedFilters, saveFilter } = useSavedFilters();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [saveName, setSaveName] = useState("");

  const categories = useMemo(() => getUniqueCategories(products), [products]);

  const sortedFiltered = useMemo(() => {
    return filterAndSortProducts(products, filters);
  }, [
    products,
    filters.searchText,
    filters.category,
    filters.priceMin,
    filters.priceMax,
    filters.minRating,
    filters.stockStatus,
    filters.sortBy
  ]);

  const filteredCount = sortedFiltered.length;
  const pageSize = filters.pageSize;
  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));

  useEffect(() => {
    if (filters.page > totalPages) setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.page, totalPages]);

  const pageProducts = useMemo(() => {
    return paginate(sortedFiltered, filters.page, pageSize);
  }, [sortedFiltered, filters.page, pageSize]);

  const handleSearchChange = (searchText) => {
    setFilters((prev) => ({ ...prev, searchText, page: 1 }));
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }));
  };

  const handleApplySidebar = (draft) => {
    setFilters((prev) => ({
      ...prev,
      category: draft.category,
      priceMin: draft.priceMin,
      priceMax: draft.priceMax,
      minRating: draft.minRating,
      stockStatus: draft.stockStatus,
      page: 1
    }));
  };

  const handleClearSidebar = () => {
    setFilters((prev) => ({
      ...prev,
      category: DEFAULT_FILTERS.category,
      priceMin: DEFAULT_FILTERS.priceMin,
      priceMax: DEFAULT_FILTERS.priceMax,
      minRating: DEFAULT_FILTERS.minRating,
      stockStatus: DEFAULT_FILTERS.stockStatus,
      page: 1
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSave = (name) => {
    const snapshot = buildFilterSnapshot(filters);
    const entry = saveFilter(name, snapshot);
    if (entry) setSaveName("");
  };

  const handleApplySaved = (savedFiltersSnapshot) => {
    const next = filtersFromSnapshot(savedFiltersSnapshot);
    setFilters(next);
  };

  const disabled = loading || products.length === 0;
  const visibleCount = loading ? 0 : pageProducts.length;

  return (
    <div className="min-h-screen catalogShell">
      <div className="catalog-inner mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="catalog-main-panel rounded-2xl bg-white p-4 shadow-md md:p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,320px)_1fr] lg:items-start">
            <CatalogSidebar
              categories={categories}
              minRatingOptions={MIN_RATING_OPTIONS}
              filters={filters}
              onApplySidebar={handleApplySidebar}
              onClearSidebar={handleClearSidebar}
              savedFilters={savedFilters}
              saveName={saveName}
              setSaveName={setSaveName}
              onSave={handleSave}
              onApplySaved={handleApplySaved}
              disabled={disabled}
            />

            <div className="flex min-w-0 flex-col gap-5">
              <SearchSortBar
                searchText={filters.searchText}
                onSearchChange={handleSearchChange}
                disabled={disabled}
              />

              <ProductGrid
                products={pageProducts}
                loading={loading}
                error={error}
                visibleCount={visibleCount}
                filteredCount={filteredCount}
                sortBy={filters.sortBy}
                onSortChange={handleSortChange}
                page={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
