import { filterAndSortProducts, getUniqueCategories, paginate } from "./productCatalog";

describe("productCatalog", () => {
  const products = [
    { id: 1, title: "Red Lipstick", description: "Matte red lip", category: "beauty", price: 10, rating: 4.2, stock: 5 },
    { id: 2, title: "Blue Eyeshadow", description: "Shimmer blue", category: "beauty", price: 20, rating: 3.9, stock: 0 },
    { id: 3, title: "Green Serum", description: "Hydrating serum", category: "skincare", price: 15, rating: 4.7, stock: 2 },
    { id: 4, title: "Yellow Cream", description: "Brightening cream", category: "skincare", price: 25, rating: 2.4, stock: 1 }
  ];

  test("getUniqueCategories", () => {
    expect(getUniqueCategories(products)).toEqual(["beauty", "skincare"]);
  });

  test("search matches title or description", () => {
    const result = filterAndSortProducts(products, { searchText: "blue", category: "all", priceMin: "", priceMax: "", minRating: "", stockStatus: "all", sortBy: "priceLow" });
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  test("category filter", () => {
    const result = filterAndSortProducts(products, { searchText: "", category: "skincare", priceMin: "", priceMax: "", minRating: "", stockStatus: "all", sortBy: "priceLow" });
    expect(result.map((p) => p.id)).toEqual([3, 4]);
  });

  test("price range filter handles swapped min/max", () => {
    const result = filterAndSortProducts(products, { searchText: "", category: "all", priceMin: 30, priceMax: 12, minRating: "", stockStatus: "all", sortBy: "priceLow" });
    expect(result.map((p) => p.id).sort((a, b) => a - b)).toEqual([2, 3, 4].sort((a, b) => a - b));
  });

  test("minRating filter", () => {
    const result = filterAndSortProducts(products, { searchText: "", category: "all", priceMin: "", priceMax: "", minRating: 4.0, stockStatus: "all", sortBy: "priceLow" });
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });

  test("stockStatus in/out", () => {
    const inStock = filterAndSortProducts(products, { searchText: "", category: "all", priceMin: "", priceMax: "", minRating: "", stockStatus: "in", sortBy: "priceLow" });
    expect(inStock.map((p) => p.id).sort((a, b) => a - b)).toEqual([1, 3, 4]);

    const outStock = filterAndSortProducts(products, { searchText: "", category: "all", priceMin: "", priceMax: "", minRating: "", stockStatus: "out", sortBy: "priceLow" });
    expect(outStock.map((p) => p.id)).toEqual([2]);
  });

  test("sort by price low/high", () => {
    const low = filterAndSortProducts(products, { searchText: "", category: "all", priceMin: "", priceMax: "", minRating: "", stockStatus: "all", sortBy: "priceLow" });
    expect(low.map((p) => p.id)).toEqual([1, 3, 2, 4]);

    const high = filterAndSortProducts(products, { searchText: "", category: "all", priceMin: "", priceMax: "", minRating: "", stockStatus: "all", sortBy: "priceHigh" });
    expect(high.map((p) => p.id)).toEqual([4, 2, 3, 1]);
  });

  test("sort by rating high", () => {
    const result = filterAndSortProducts(products, { searchText: "", category: "all", priceMin: "", priceMax: "", minRating: "", stockStatus: "all", sortBy: "ratingHigh" });
    expect(result.map((p) => p.id)).toEqual([3, 1, 2, 4]);
  });

  test("paginate", () => {
    const p = paginate([1, 2, 3, 4, 5], 2, 2);
    expect(p).toEqual([3, 4]);
  });
});

