"use client";
/**
 * AuthModal (Login + Signup) — API base comes from NEXT_PUBLIC_API_BASE_URL.
 * We avoid a top-level API_BASE constant; instead we read the env var where needed.
 */
import React, { useEffect, useMemo, useState } from "react";

type Mode = "login" | "signup";
type Props = { mode: Mode; onClose: () => void; onSwitch: (m: Mode) => void };

export default function AuthModal({ mode, onClose, onSwitch }: Props) {
  // Local form/UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when switching modes (Login ↔ Signup)
  useEffect(() => {
    setError(null);
    setEmail("");
    setPassword("");
  }, [mode]);

  const title = useMemo(
    () => (mode === "login" ? "Welcome back" : "Create your account"),
    [mode]
  );

  function validate(): string | null {
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const bad = validate();
    if (bad) return setError(bad);

    // Read env on demand (no top-level constant). Guard for missing config.
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
      setError(
        "API base URL is not configured. Create frontend/.env.local with NEXT_PUBLIC_API_BASE_URL."
      );
      return;
    }

    try {
      setSubmitting(true);

      if (mode === "login") {
        // POST /auth/login -> { token }
        const res = await fetch(`${base}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || "Login failed");
        localStorage.setItem("token", data.token);
        onClose();
      } else {
        // POST /auth/signup -> { message, user }
        const res = await fetch(`${base}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || "Signup failed");
        onSwitch("login");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop: click to close */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-600 mt-1">
            {mode === "login"
              ? "Log in to your shared dashboard."
              : "Start your shared dashboard in minutes."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              {mode === "login" && (
                <div className="flex items-center justify-between mt-2">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:underline"
                    onClick={() => alert("TODO: add /auth/request-reset route")}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 text-red-700 px-3 py-2 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-black text-white py-2.5 disabled:opacity-60"
            >
              {submitting
                ? "Please wait…"
                : mode === "login"
                ? "Log in"
                : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  className="font-medium text-gray-900 hover:underline"
                  onClick={() => onSwitch("signup")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="font-medium text-gray-900 hover:underline"
                  onClick={() => onSwitch("login")}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
