"use client";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="mb-8">
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Seaarh products..."
      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 sm:max-w-md"
    />
  </div>
);