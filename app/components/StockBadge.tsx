"use client"

type StockBadgeProps = {
    stock: number;
};

export const StockBadge = ({ stock }: StockBadgeProps) => {
    const getStatus = () => {
        if (stock > 50) return { color: "bg-emerald-500", text: "text-emerald-600", msg: `Available - ${stock} ` };
        if (stock > 10) return { color: "bg-amber-500", text: "text-amber-600", msg: `Available - ${stock} ` };
        return { color: "bg-red-500", text: "text-red-600", msg: `Low stock - only ${stock} ` };
    };

    const status = getStatus();

    return (
        <div className="mt-6 flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${status.color}`}></span>
            <span className={`text-sm font-medium ${status.text}`}>
                {status.msg}
            </span>
        </div>  
    );
};