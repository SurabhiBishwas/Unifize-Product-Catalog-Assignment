import React from "react";

function formatPrice(value) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "";
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

function truncate(text, maxLen) {
  if (typeof text !== "string") return "";
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1)}...`;
}

function StarGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#facc15" aria-hidden="true" className="shrink-0">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export default function ProductCard({ product }) {
  const title = typeof product?.title === "string" ? product.title : "";
  const description = typeof product?.description === "string" ? product.description : "";
  const category = typeof product?.category === "string" ? product.category : "";
  const price = formatPrice(product?.price);
  const stock = typeof product?.stock === "number" ? product.stock : Number(product?.stock);
  const rating = typeof product?.rating === "number" ? product.rating : Number(product?.rating);

  const image =
    (Array.isArray(product?.images) && product.images.length ? product.images[0] : null) ||
    product?.thumbnail ||
    "";

  const shortDesc = truncate(description, 100);
  const inStock = Number.isFinite(stock) ? stock > 0 : false;
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const categoryUpper = category.trim().toUpperCase();

  return (
    <article className="product-card flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-100">
      <div className="flex items-center justify-center bg-slate-50 p-4">
        <img src={image} alt={title} loading="lazy" className="h-40 w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 pt-3">
        {categoryUpper ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{categoryUpper}</p>
        ) : null}
        <h3 className="text-base font-bold leading-snug text-slate-900">{title}</h3>
        <p className="min-h-[2.75rem] text-sm leading-relaxed text-slate-500">{shortDesc}</p>
        <div className="mt-auto pt-2">
          <p className="text-xl font-bold text-blue-600">{price}</p>
          {inStock ? (
            <p className="mt-0.5 text-sm font-medium text-green-600">In Stock: {Number.isFinite(stock) ? stock : 0}</p>
          ) : (
            <p className="mt-0.5 text-sm font-medium text-rose-600">Out of stock</p>
          )}
        </div>
        <div className="flex justify-end pt-2">
          <div className="inline-flex items-center gap-1" role="img" aria-label={`${safeRating.toFixed(2)} out of 5`}>
            <StarGlyph />
            <span className="text-sm font-semibold text-slate-800">{safeRating.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
