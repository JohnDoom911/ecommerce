"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/user-provider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError ] = useState("");
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Нэвтрэхэд алдаа гарлаа");
          });
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err: any) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              &larr; Return
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Product Store</h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Login page</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-sm">
          {!user ? (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Login</h2>

              {error && ( 
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Username талбар */}
              <div className="mb-4">
                <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                  type="text"
                  required
                  placeholder="emilys"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
              </div>

              {/* Password талбар */}
              <div className="mb-6">
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                  
                {/* TODO 10: value={password} onChange холбох */}
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  required
                  placeholder="emilyspass"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
              </div>

              {/* TODO 11: disabled={loading} нэмэх, loading үед "Нэвтэрч байна..." текст харуулах */}
              <button disabled={loading}
                type="submit"
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {loading ? "logging in..." : "Login"}
              </button>

              <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
                Trial: <span className="font-mono">emilys</span> / <span className="font-mono">emilyspass</span>
              </p>
            </form>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-zinc-100 dark:border-zinc-800">
                <img src="{user.image}" alt="{user.username}"
                    className="h-full w-full- object-cover"/>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Hello, {user.username}!
              </h2>
              <div className="mt-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>logged in successfully</span>
                </div>
              </div>
            </div>
          )}
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