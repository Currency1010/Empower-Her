"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100/80 px-4 sm:px-6">
      <section className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
              Admin Access
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to continue to the admin workspace.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Email
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2.5">
                <Mail className="h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="admin@risinglights.org"
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Password
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2.5">
                <Lock className="h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-500 transition hover:text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Need to visit admin panel?{" "}
            <Link href="/admin" className="font-semibold text-primary hover:underline">
              Go to dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
