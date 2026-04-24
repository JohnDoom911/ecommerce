export default function StockBadge({ stock }: { stock: number }) {
  const getStockConfig = () => {
    if (stock > 50) return { color: "bg-emerald-500", text: "text-emerald-600", label: `${stock} ширхэг` };
    if (stock > 10) return { color: "bg-amber-500", text: "text-amber-600", label: `${stock} ширхэг` };
    return { color: "bg-red-500", text: "text-red-600", label: `Цөөн үлдсэн - ${stock} ширхэг` };
  };

  const config = getStockConfig();

  return (
    <div className="mt-6 flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${config.color}`}></span>
      <span className={`text-sm font-medium ${config.text} dark:opacity-90`}>{config.label}</span>
    </div>
  );
}