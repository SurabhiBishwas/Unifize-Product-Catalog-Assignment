export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_FILTERS = {
  searchText: "",
  category: "all",
  priceMin: "",
  priceMax: "",
  minRating: "",
  stockStatus: "all",
  sortBy: "priceLow",
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE
};

export function getUniqueCategories(products) {
  const set = new Set();
  for (const p of products) {
    if (p && typeof p.category === "string" && p.category.trim()) set.add(p.category.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function parseNumberOrEmpty(value) {
  if (value === "" || value === null || value === undefined) return null;
  const n = typeof value === "number" ? value : Number(String(value).trim());
  if (!Number.isFinite(n)) return null;
  return n;
}

export function filterAndSortProducts(products, filters) {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeFilters = filters || DEFAULT_FILTERS;

  const search = typeof safeFilters.searchText === "string" ? safeFilters.searchText.trim().toLowerCase() : "";
  const category = typeof safeFilters.category === "string" && safeFilters.category.trim() ? safeFilters.category.trim() : "all";

  const priceMinParsed = parseNumberOrEmpty(safeFilters.priceMin);
  const priceMaxParsed = parseNumberOrEmpty(safeFilters.priceMax);
  let priceMin = priceMinParsed;
  let priceMax = priceMaxParsed;
  if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
    const t = priceMin;
    priceMin = priceMax;
    priceMax = t;
  }

  const minRatingParsed = parseNumberOrEmpty(safeFilters.minRating);
  const stockStatus = typeof safeFilters.stockStatus === "string" ? safeFilters.stockStatus : "all";

  const filtered = safeProducts.filter((p) => {
    if (!p) return false;

    if (category !== "all") {
      if (!p.category || String(p.category).trim() !== category) return false;
    }

    if (priceMin !== null) {
      const price = typeof p.price === "number" ? p.price : Number(p.price);
      if (!Number.isFinite(price) || price < priceMin) return false;
    }

    if (priceMax !== null) {
      const price = typeof p.price === "number" ? p.price : Number(p.price);
      if (!Number.isFinite(price) || price > priceMax) return false;
    }

    if (minRatingParsed !== null) {
      const rating = typeof p.rating === "number" ? p.rating : Number(p.rating);
      if (!Number.isFinite(rating) || rating < minRatingParsed) return false;
    }

    if (stockStatus === "in") {
      const stock = typeof p.stock === "number" ? p.stock : Number(p.stock);
      if (!Number.isFinite(stock) || stock <= 0) return false;
    }

    if (stockStatus === "out") {
      const stock = typeof p.stock === "number" ? p.stock : Number(p.stock);
      if (!Number.isFinite(stock) || stock > 0) return false;
    }

    if (search) {
      const title = typeof p.title === "string" ? p.title.toLowerCase() : "";
      const description = typeof p.description === "string" ? p.description.toLowerCase() : "";
      const matches = title.includes(search) || description.includes(search);
      if (!matches) return false;
    }

    return true;
  });

  const sortBy = typeof safeFilters.sortBy === "string" ? safeFilters.sortBy : "priceLow";

  const sorted = filtered.slice();
  sorted.sort((a, b) => {
    const aPrice = typeof a.price === "number" ? a.price : Number(a.price);
    const bPrice = typeof b.price === "number" ? b.price : Number(b.price);
    const aRating = typeof a.rating === "number" ? a.rating : Number(a.rating);
    const bRating = typeof b.rating === "number" ? b.rating : Number(b.rating);

    if (sortBy === "priceLow") {
      if (Number.isFinite(aPrice) && Number.isFinite(bPrice) && aPrice !== bPrice) return aPrice - bPrice;
    }

    if (sortBy === "priceHigh") {
      if (Number.isFinite(aPrice) && Number.isFinite(bPrice) && aPrice !== bPrice) return bPrice - aPrice;
    }

    if (sortBy === "ratingHigh") {
      if (Number.isFinite(aRating) && Number.isFinite(bRating) && aRating !== bRating) return bRating - aRating;
    }

    const aId = typeof a.id === "number" ? a.id : Number(a.id);
    const bId = typeof b.id === "number" ? b.id : Number(b.id);
    if (Number.isFinite(aId) && Number.isFinite(bId) && aId !== bId) return aId - bId;
    return 0;
  });

  return sorted;
}

export function paginate(products, page, pageSize) {
  const safeProducts = Array.isArray(products) ? products : [];
  const p = Number.isFinite(Number(page)) ? Number(page) : 1;
  const ps = Number.isFinite(Number(pageSize)) ? Number(pageSize) : DEFAULT_PAGE_SIZE;

  const safePage = p < 1 ? 1 : p;
  const safePageSize = ps < 1 ? DEFAULT_PAGE_SIZE : ps;
  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;
  return safeProducts.slice(start, end);
}

export function buildFilterSnapshot(filters) {
  return {
    searchText: filters.searchText || "",
    category: filters.category || "all",
    priceMin: filters.priceMin || "",
    priceMax: filters.priceMax || "",
    minRating: filters.minRating || "",
    stockStatus: filters.stockStatus || "all",
    sortBy: filters.sortBy || "priceLow"
  };
}

export function filtersFromSnapshot(snapshot) {
  const s = snapshot || {};
  return {
    ...DEFAULT_FILTERS,
    searchText: typeof s.searchText === "string" ? s.searchText : "",
    category: typeof s.category === "string" && s.category ? s.category : "all",
    priceMin: s.priceMin !== undefined && s.priceMin !== null ? String(s.priceMin) : "",
    priceMax: s.priceMax !== undefined && s.priceMax !== null ? String(s.priceMax) : "",
    minRating: s.minRating !== undefined && s.minRating !== null ? String(s.minRating) : "",
    stockStatus: typeof s.stockStatus === "string" && s.stockStatus ? s.stockStatus : "all",
    sortBy: typeof s.sortBy === "string" && s.sortBy ? s.sortBy : "priceLow",
    page: 1
  };
}

