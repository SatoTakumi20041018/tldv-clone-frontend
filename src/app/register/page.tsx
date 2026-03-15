"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, ArrowRight, Loader2, Check } from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 23 23">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    {
      label: "Contains uppercase letter",
      valid: /[A-Z]/.test(password),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1040] via-[#2d1b69] to-[#1e1145] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30">
              <span className="text-white font-bold text-xl">tv</span>
            </div>
            <span className="text-white font-bold text-4xl tracking-tight">tl;dv</span>
          </div>
          <p className="text-white/50 text-sm">
            Never miss a moment in your meetings
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            Get started for free
          </h1>
          <p className="text-text-secondary text-sm mb-6">
            Create your account and start recording meetings
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4 border border-red-100">
              {error}
            </div>
          )}

          {/* Social login buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-sm text-text-primary hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <GoogleIcon />
              Sign up with Google
            </button>
            <button
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-sm text-text-primary hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <MicrosoftIcon />
              Sign up with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-text-muted font-medium">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password strength */}
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      <Check
                        className={`w-3 h-3 ${check.valid ? "text-success" : "text-gray-300"}`}
                      />
                      <span
                        className={
                          check.valid ? "text-success" : "text-text-muted"
                        }
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 mt-0.5"
              />
              <span className="text-xs text-text-secondary">
                I agree to the{" "}
                <a href="#" className="text-brand-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-brand-500 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-brand-500 text-white rounded-xl font-medium text-sm hover:bg-brand-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-brand-500/25"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-500 hover:text-brand-600 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Trust badges */}
        <p className="text-center text-white/30 text-xs mt-6">
          Trusted by 1M+ users at companies worldwide
        </p>
      </div>
    </div>
  );
}
