"use client";

import { useState } from "react";
import Link from "next/link";
import {  User,  Mail,  Lock,  Eye,  EyeOff,  ArrowRight,} from "lucide-react";
import { RegisterService } from "@/services/authServices";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passWord: "",
  });

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.trimStart() : value,
    }));

    if (name === "email") {
      if (!value.trim()) {
        setEmailError("Email is required");
      } else if (!validateEmail(value.trim())) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (formData.passWord.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await RegisterService({
        ...formData,
        email,
      });

      if (!response.success) {
        toast.error("Account Creation Failed!");
        return;
      }

      toast.success("Account Successfully Created");

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Network error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-8">

      <div className="fixed top-10 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="fixed bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">

        <div className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <User size={30} className="text-white" />
            </div>
          </div>

          <div className="text-center mb-7">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-slate-300">
                Full Name
              </label>

              <div className="relative mt-2">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-slate-300">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={() => {
                    if (!formData.email.trim()) {
                      setEmailError("Email is required");
                    } else if (!validateEmail(formData.email.trim())) {
                      setEmailError("Please enter a valid email address");
                    }
                  }}
                  placeholder="you@example.com"
                  required
                  className={`w-full bg-black/20 border rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 transition ${
                    emailError
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />
              </div>

              {emailError && (
                <p className="text-red-400 text-xs mt-2">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-300">
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="passWord"
                  value={formData.passWord}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-11 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                required
                className="mt-1 accent-indigo-500"
              />

              <p className="text-xs text-slate-400 leading-5">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-indigo-400 hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && (
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </button>

          </form>

          <div className="text-center mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline"
            >
              Login
            </Link>
          </div>

        </div>

        <p className="text-center text-xs text-slate-600 mt-5">
          © 2026 YourApp. All rights reserved.
        </p>

      </div>
    </main>
  );
}
