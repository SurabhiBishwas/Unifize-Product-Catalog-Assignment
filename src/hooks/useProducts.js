import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setError(null);
      await new Promise((r) => setTimeout(r, 700));
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        const items = data && Array.isArray(data.products) ? data.products : data;
        if (alive) setProducts(Array.isArray(items) ? items : []);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  return { products, loading, error };
}

