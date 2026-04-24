import { Product } from "../types";

export default function ProductInfo({ product, realPrice }: { product: Product; realPrice: number }) {
  return (
    <>
      <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
        {product.category}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{product.title}</h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{product.brand}</p>
      
      {/* Price Section */}
      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">${realPrice.toFixed(2)}</span>
        <span className="text-lg text-zinc-400 line-through">${product.price}</span>
        <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
          -{product.discountPercentage}%
        </span>
      </div>

      <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">{product.description}</p>

      {/* Details Grid */}
      <div className="mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Дэлгэрэнгүй мэдээлэл</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Брэнд", value: product.brand },
            { label: "Категори", value: product.category },
            { label: "Үлдэгдэл", value: `${product.stock} ширхэг` },
            { label: "Хүргэлт", value: product.shippingInformation },
            { label: "Баталгаа", value: product.warrantyInformation },
            { label: "Буцаалт", value: product.returnPolicy },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">{item.label}</p>
              <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}