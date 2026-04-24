"use client";

import { Product } from "@/app/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// Importing the bonus components
import ProductImageGallery from "@/app/components/ProductImageGallery";
import ProductInfo from "@/app/components/ProductInfo";
import ReviewCard from "@/app/components/ReviewCard";
import StockBadge from "@/app/components/StockBadge";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [image, setImage] = useState("");

  useEffect(() => {
    let statusCode = 200;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          statusCode = res.status;
        }
        return res.json();
      })
      .then((data) => {
        if (statusCode == 200) {
          setProduct(data);
          setImage(data.thumbnail);
        } else {
          setError(data.message);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading || !product) {
    return <div className="w-full py-20 text-center text-2xl">Loading...</div>;
  }
  if (error) {
    return <div className="w-full py-20 text-center text-2xl text-red-500">{error}</div>;
  }

  const realPrice = product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              &larr; Буцах
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Product Store</h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Product detail</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          
          {/* Image Section (TODO 11 Refactored) */}
          <ProductImageGallery 
            images={product.images} 
            mainImage={image} 
            setMainImage={setImage} 
            title={product.title} 
          />

          {/* Product Info Section */}
          <div>
            <ProductInfo product={product} realPrice={realPrice} />

            {/* Stock Status (TODO 14 Refactored) */}
            <StockBadge stock={product.stock} />

            {/* Reviews Section (TODO 15 Refactored) */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Сэтгэгдлүүд</h3>
              <div className="mt-4 space-y-4">
                {product.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-zinc-400">
          Exercise App &middot; Data from dummyjson.com
        </div>
      </footer>
    </div>
  );
}