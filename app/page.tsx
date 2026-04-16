"use client";

import { useEffect, useState } from "react";
import { ProductApiResponse, Products } from "./types";
import { ProductCard } from "./components/product-card";
import { SearchBar } from "./components/search-bar";
import { CategoryNav } from "./components/category-nav";
import { Pagination } from "./components/pagination";

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    if (search) url = `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    else if (category) url = `https://dummyjson.com/products/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
      const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Network response was not ok");
        
        const data: ProductApiResponse = await res.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; 
        }
        setError("Encountered an error...");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [skip, search, category]);
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mx-auto max-w-7xl">
          Product Store
        </h1>
      </header>

      <CategoryNav 
        activeCategory={category} 
        onCategoryChange={(cat) => { setCategory(cat); setSearch(""); setSkip(0); }} 
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <SearchBar 
          value={search} 
          onChange={(e) => { setSearch(e.target.value); setCategory(""); setSkip(0); }} 
        />

        {error && <p className="text-center text-red-500 py-4">{error}</p>}

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <Pagination 
              skip={skip} 
              total={total} 
              limit={PRODUCTS_PER_PAGE}
              onPrev={() => setSkip(s => Math.max(0, s - PRODUCTS_PER_PAGE))}
              onNext={() => setSkip(s => s + PRODUCTS_PER_PAGE)}
            />
          </>
        )}
      </main>
    </div>
  );
}