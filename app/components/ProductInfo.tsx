"use client"

import { Product } from "../types";

type productInfoProps = {
    product: Product;
};

export const ProductInfo =({ product }: productInfoProps) => (
    <div className="mt-8 space-y-4 rounded-2xl border dorder-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500  darrk:text-zinc-400">
            Product Description
        </h3>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            {[
                { label: "Брэнд", value: product.brand },
                { label: "Категори", value: product.category, className: "capitalize" },
                { label: "Хүргэлт", value: product.shippingInformation },
                { label: "Баталгаа", value: product.warrantyInformation },
                { label: "Буцаалт", value: product.returnPolicy },
                { label: "Хэмжээ", value: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` },
            ].map((item, idx) => (
                <div key={idx}>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{item.label}</p>
                    <p className={`mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 ${item.className || ""}`}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    </div>
);