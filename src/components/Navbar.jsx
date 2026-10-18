import React from "react";
import { Sparkles, Key, Building2, Cpu, Shirt, CheckCircle2, AlertCircle } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, onOpenApiKeyModal, isKeyConfigured, selectedModel }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070e0a]/80 border-b border-[#34d399]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("scanner")}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
            <Shirt className="w-6 h-6 text-emerald-950" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl text-white tracking-tight">ReWear <span className="text-emerald-400">AI</span></span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                Gemma 4 Track
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans hidden sm:block">
              AI-Powered Clothing Donation Triage for Charitable Agencies
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="flex items-center bg-[#0d1a13] p-1.5 rounded-xl border border-emerald-500/20 shadow-inner">
          <button
            onClick={() => setActiveTab("scanner")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "scanner"
                ? "bg-emerald-500 text-emerald-950 shadow-md font-bold"
                : "text-slate-300 hover:text-white hover:bg-emerald-900/30"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Triage Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab("agency")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "agency"
                ? "bg-emerald-500 text-emerald-950 shadow-md font-bold"
                : "text-slate-300 hover:text-white hover:bg-emerald-900/30"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Agency Logistics</span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "architecture"
                ? "bg-emerald-500 text-emerald-950 shadow-md font-bold"
                : "text-slate-300 hover:text-white hover:bg-emerald-900/30"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span className="hidden md:inline">Gemma 4</span>
            <span>Architecture</span>
          </button>
        </nav>

        {/* Right Action: API Key & Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all ${
              isKeyConfigured
                ? "bg-emerald-950/60 border-emerald-400/40 text-emerald-300 hover:border-emerald-300"
                : "bg-amber-950/40 border-amber-500/30 text-amber-300 hover:border-amber-400"
            }`}
            title="Configure Gemini API Key / Gemma Model"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isKeyConfigured ? "Gemini Key: Active" : "Key: Demo Mode"}
            </span>
            <span className="flex h-2 w-2 relative">
              <span className={`inline-flex rounded-full h-2 w-2 ${isKeyConfigured ? "bg-emerald-400" : "bg-amber-400"}`}></span>
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
