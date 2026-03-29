import React, { useMemo } from "react";

function Star({ variant, gradientId }) {
  const filled = variant === "full";
  const empty = variant === "empty";
  const half = variant === "half";

  const fill = filled ? "#f59e0b" : empty ? "#e5e7eb" : `url(#${gradientId})`;
  const stroke = filled ? "#f59e0b" : empty ? "#d1d5db" : "#d1d5db";

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      {half ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
    </svg>
  );
}

export default function StarRating({ rating }) {
  const safeRating = Number(rating);
  const value = Number.isFinite(safeRating) ? safeRating : 0;

  const fullCount = Math.floor(value);
  const remainder = value - fullCount;
  const hasHalf = remainder >= 0.5;

  const gradientId = useMemo(() => `grad_${Math.random().toString(36).slice(2, 10)}`, []);

  const ariaLabel = `${value.toFixed(1)} out of 5`;

  return (
    <div className="inline-flex items-center starSvg" role="img" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => {
        const variant = i < fullCount ? "full" : i === fullCount && hasHalf ? "half" : "empty";
        return <Star key={i} variant={variant} gradientId={gradientId} />;
      })}
    </div>
  );
}

