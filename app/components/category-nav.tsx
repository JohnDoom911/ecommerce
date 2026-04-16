"use client";

const CATEGORIES = ["beauty", "fragrances", "furniture", "groceries", "home-decoration", 
  "kitchen-accessories", "laptops", "smartphones", "sports-accessories", "vehicle"];

type CategoryNavProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => (
  <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
    <div className="mx-auto max-w-7xl px-6">
      <ul className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
        <li>
          <button
            onClick={() => onCategoryChange("")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeCategory ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400"
            }`}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                activeCategory === cat ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);