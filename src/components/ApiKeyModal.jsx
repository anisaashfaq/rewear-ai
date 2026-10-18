import React, { useState } from "react";
import { Key, Eye, EyeOff, Check, X, ExternalLink, Sparkles, ShieldCheck, Cpu } from "lucide-react";
import { getApiKey, saveApiKey, getSelectedModel, saveSelectedModel, testApiKey } from "../services/aiService";

export default function ApiKeyModal({ isOpen, onClose, onKeyUpdated }) {
  const [apiKey, setApiKey] = useState(getApiKey());
  const [showKey, setShowKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState(getSelectedModel());
  const [testStatus, setTestStatus] = useState({ state: "idle", message: "" });

  if (!isOpen) return null;

  const handleSave = () => {
    saveApiKey(apiKey);
    saveSelectedModel(selectedModel);
    if (onKeyUpdated) onKeyUpdated();
    onClose();
  };

  const handleClear = () => {
    setApiKey("");
    saveApiKey("");
    if (onKeyUpdated) onKeyUpdated();
    setTestStatus({ state: "idle", message: "" });
  };

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestStatus({ state: "error", message: "Please paste your API key first." });
      return;
    }
    setTestStatus({ state: "loading", message: "Connecting to Google AI Studio..." });
    const res = await testApiKey(apiKey);
    if (res.success) {
      setTestStatus({ state: "success", message: res.message });
    } else {
      setTestStatus({ state: "error", message: res.message });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="relative w-full max-w-lg bg-[#0d1a13] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-emerald-950/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">AI Engine & API Key Setup</h3>
            <p className="text-xs text-slate-400">Configure Gemini API Key or run in Gemma Demo Mode</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-3.5 mb-6 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300 mb-1">Your Key is Stored Locally in Your Browser</p>
              <p>
                ReWear AI connects directly to Google AI Studio using the specialized <strong>Gemma 4 clothing triage prompt schema</strong>. If left blank, you can still test all features using our pre-calibrated <strong>PaliGemma 2 offline simulation mode</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* API Key Input Field */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Google Gemini API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your Gemini API key (e.g. AIzaSy...)"
              className="w-full bg-[#070e0a] border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-medium"
            >
              Get free Gemini API Key from Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Clear key
              </button>
            )}
          </div>
        </div>

        {/* Model Selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Multimodal Cloud Endpoint
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", desc: "Ultra-Fast Vision (Recommended)" },
              { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", desc: "Balanced Speed & Context" },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedModel === m.id
                    ? "bg-emerald-500/15 border-emerald-400 text-white"
                    : "bg-[#070e0a] border-white/5 text-slate-400 hover:border-emerald-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">{m.name}</span>
                  {selectedModel === m.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Connection Banner */}
        {testStatus.state !== "idle" && (
          <div
            className={`p-3 rounded-xl text-xs mb-4 flex items-center gap-2 ${
              testStatus.state === "loading"
                ? "bg-blue-950/40 border border-blue-500/30 text-blue-300"
                : testStatus.state === "success"
                ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                : "bg-red-950/40 border border-red-500/30 text-red-300"
            }`}
          >
            {testStatus.state === "loading" && <span className="animate-spin text-sm">⏳</span>}
            {testStatus.state === "success" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
            {testStatus.state === "error" && <X className="w-4 h-4 text-red-400 shrink-0" />}
            <span>{testStatus.message}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-emerald-500/15">
          <button
            type="button"
            onClick={handleTestKey}
            disabled={testStatus.state === "loading"}
            className="btn-secondary text-xs py-2 px-3.5"
          >
            Verify Key
          </button>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary text-xs py-2 px-5"
            >
              Save Configuration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
