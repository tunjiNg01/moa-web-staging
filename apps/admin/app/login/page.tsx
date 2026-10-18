"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button, Input, Label } from "@repo/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("f.morgan@moa.ng");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate authentication verification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 800);
  };

  const handleDemoFill = (demoEmail: string, role: string) => {
    setEmail(demoEmail);
    setPassword("Engineering@2026!");
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#121011] text-[#ece8e9]">
      {/* Left Panel: Architectural Editorial Brand Showcase (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 relative flex-col justify-between p-12 overflow-hidden border-r border-[#262224]">
        {/* Background Project Image with Moody Architectural Tint */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/structure-detail.jpg"
            alt="MO&A Engineering Heritage"
            fill
            priority
            className="object-cover opacity-25 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121011] via-[#121011]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#70333A]/15 mix-blend-multiply" />
        </div>

        {/* Top: Official MO&A Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <div className="relative h-12 flex items-center rounded-xs overflow-hidden shadow-md shadow-black/40">
              <Image
                src="/images/moa-logo.png"
                alt="MO&A Logo"
                width={140}
                height={44}
                className="h-11 w-auto object-contain rounded-xs"
                priority
              />
            </div>
            <div className="flex flex-col justify-center pl-3.5 border-l border-white/20">
              <div className="flex items-center gap-2 leading-none">
                <span className="font-serif text-base font-bold text-white tracking-tight">
                  MO&amp;A Ltd
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded-xs bg-[#2e1d21] text-[#d48c95] border border-[#522930]">
                  Admin
                </span>
              </div>
              <span className="text-[11px] text-[#b3acae] tracking-wider uppercase font-sans mt-1">
                Formerly Morgan Omonitan &amp; Abe Ltd
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Editorial Quotation */}
        <div className="relative z-10 space-y-4 max-w-md my-auto py-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#241a1d] border border-[#522930] text-[#e09fa6] text-xs font-semibold">
            <ShieldCheck className="size-3.5" />
            <span>Administrative Governance Portal</span>
          </div>
          <h2 className="text-3xl xl:text-4xl font-serif font-medium text-white leading-tight">
            Precision engineering starts with disciplined oversight.
          </h2>
          <p className="text-sm text-[#aba3a6] leading-relaxed">
            Centralized portal for managing national infrastructure projects, geotechnical foresight, technical publications, and engineering career requisitions.
          </p>

          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#2e292c]">
            <div>
              <div className="text-xl font-serif font-bold text-white">1972</div>
              <div className="text-[11px] text-[#8e878a]">Founded in Lagos</div>
            </div>
            <div>
              <div className="text-xl font-serif font-bold text-white">50+ Yrs</div>
              <div className="text-[11px] text-[#8e878a]">Built Legacy</div>
            </div>
            <div>
              <div className="text-xl font-serif font-bold text-white">ISO 9001</div>
              <div className="text-[11px] text-[#8e878a]">Quality Certified</div>
            </div>
          </div>
        </div>

        {/* Bottom: Security Notice */}
        <div className="relative z-10 text-xs text-[#7e777a] flex items-center justify-between">
          <span>Enterprise Portal • Port 3001</span>
          <span>Security Protocol TLS 1.3</span>
        </div>
      </div>

      {/* Right Panel: Clean Authentication Form */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-[#161415] min-h-screen">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-2.5">
            <div className="relative h-7 flex items-center rounded-xs overflow-hidden">
              <Image
                src="/images/moa-logo.png"
                alt="MO&A Logo"
                width={85}
                height={26}
                className="h-6 w-auto object-contain rounded-xs"
                priority
              />
            </div>
            <span className="font-serif font-bold text-white text-xs">Admin Hub</span>
          </div>

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-[#9e9699] hover:text-white transition-colors"
          >
            <span>Public Website</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        {/* Center: Login Form Card */}
        <div className="w-full max-w-md mx-auto my-auto py-10 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d48c95]">
                Management Console
              </span>
              <span className="text-xs text-[#6e686b]">•</span>
              <span className="text-xs text-[#9e9699]">Internal Access Only</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Sign In to Admin Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#aba3a6]">
              Please authenticate with your institutional <code className="text-[#d48c95] bg-[#241a1d] px-1 py-0.5 rounded-xs">@moa.ng</code> account.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xs bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Work Email */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-[#d9d3d5]">
                Institutional Work Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#787174]" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="f.morgan@moa.ng"
                  className="h-10 pl-9 text-xs bg-[#1f1c1d] border-[#363033] text-white placeholder:text-[#6e686b] focus-visible:border-[#70333A] focus-visible:ring-[#70333A]/50 rounded-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-[#d9d3d5]">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions will be dispatched to your corporate email.")}
                  className="text-[11px] text-[#d48c95] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#787174]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security token or password"
                  className="h-10 pl-9 pr-10 text-xs bg-[#1f1c1d] border-[#363033] text-white placeholder:text-[#6e686b] focus-visible:border-[#70333A] focus-visible:ring-[#70333A]/50 rounded-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#787174] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="size-3.5 rounded-xs accent-[#70333A] bg-[#1f1c1d] border-[#363033]"
              />
              <label htmlFor="remember" className="text-xs text-[#aba3a6] cursor-pointer">
                Keep session authenticated for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 bg-[#70333A] hover:bg-[#853f47] text-white font-medium text-xs rounded-xs shadow-md shadow-[#70333A]/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="size-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Authenticating Credentials...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In to Console</span>
                  <ArrowRight className="size-3.5" />
                </div>
              )}
            </Button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="pt-6 border-t border-[#262224] space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[#8e878a]">
              <span className="uppercase font-semibold tracking-wider">Quick Fill Demo Accounts</span>
              <span>Click to populate</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoFill("f.morgan@moa.ng", "Super Admin")}
                className="p-2.5 rounded-xs bg-[#1d1a1b] hover:bg-[#252123] border border-[#2d282a] text-left transition-all hover:border-[#70333A]/60"
              >
                <div className="font-semibold text-white text-[11px] flex items-center justify-between">
                  <span>Engr. Funsho Morgan</span>
                  <span className="text-[9px] bg-[#70333A] text-white px-1 py-0.2 rounded-xs">Super</span>
                </div>
                <div className="text-[10px] text-[#8e878a] truncate mt-0.5">f.morgan@moa.ng</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoFill("a.bello@moa.ng", "Editor")}
                className="p-2.5 rounded-xs bg-[#1d1a1b] hover:bg-[#252123] border border-[#2d282a] text-left transition-all hover:border-[#70333A]/60"
              >
                <div className="font-semibold text-white text-[11px] flex items-center justify-between">
                  <span>Amina Bello</span>
                  <span className="text-[9px] bg-emerald-900/60 text-emerald-300 px-1 py-0.2 rounded-xs">Editor</span>
                </div>
                <div className="text-[10px] text-[#8e878a] truncate mt-0.5">a.bello@moa.ng</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#6e686b] pt-6">
          &copy; {new Date().getFullYear()} MO&amp;A Ltd (Formerly Morgan Omonitan &amp; Abe Ltd). All rights reserved.
        </div>
      </div>
    </div>
  );
}
