import React, { useState } from "react";
import { Cpu, Eye, ShieldCheck, Zap, Server, Code, FileText, Check, Copy, ArrowRight, Layers, Sparkles } from "lucide-react";

export default function GemmaArchitectureView({ onOpenApiKeyModal }) {
  const [copied, setCopied] = useState(false);

  const sampleSchema = `{
  "item_name": "Heavy-Duty Down Winter Parka",
  "category": "Outerwear",
  "fabric_composition": "100% Water-Resistant Nylon Shell, 700-Fill Down",
  "color_palette": ["Olive Green", "Deep Forest"],
  "condition_score": 96,
  "condition_grade": "Grade A (Like New)",
  "defects_detected": ["Superficial hem dust", "Zippers 100% functional"],
  "sizing": {
    "estimated_size": "Adult L (Men's / Unisex)",
    "fit_type": "Regular Oversized",
    "season": "Sub-Zero Winter"
  },
  "recommended_agency": {
    "name": "St. Jude Crisis Homeless Shelter",
    "type": "Crisis Shelter",
    "urgency": "Critical / Immediate Need",
    "reason": "Thermal insulation matches acute winter freeze shortage"
  },
  "environmental_impact": {
    "water_saved_liters": 3200,
    "carbon_avoided_kg": 6.8,
    "landfill_diverted_kg": 2.1
  },
  "suggested_bin_id": "BIN-WINTER-A04"
}`;

  const copySchema = () => {
    navigator.clipboard.writeText(sampleSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="glass-pill text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Hacktoberfest Gemma 4 Architecture Showcase
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-3">
          Why Google PaliGemma 2 Powers ReWear AI
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Non-profit clothing sorting requires extreme spatial detail, zero recurring cloud costs, and strict donor privacy. Here is the technical breakdown of our model architecture.
        </p>
      </div>

      {/* Model Selection Banner */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-br from-emerald-950/50 via-[#0d1a13] to-[#070e0a]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-emerald-500/15 gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400">
              Primary Model Architecture
            </span>
            <h3 className="text-2xl font-extrabold text-white font-display">
              Google PaliGemma 2 (Vision-Language 3B) + Gemini Flash Cloud Bridge
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              SigLIP-So400m Encoder + Gemma 2 Autoregressive Decoder
            </p>
          </div>
          <button
            onClick={onOpenApiKeyModal}
            className="btn-primary text-xs py-2 px-4 self-start sm:self-auto"
          >
            Configure Cloud API Key
          </button>
        </div>

        {/* 4 Core Architectural Advantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#070e0a]/70 p-4 rounded-xl border border-emerald-500/20">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Micro-Weave Acuity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              SigLIP-So400m processes high-res patches to detect subtle stains, seam rips, and distinguish 100% pure wool from acrylic.
            </p>
          </div>

          <div className="bg-[#070e0a]/70 p-4 rounded-xl border border-emerald-500/20">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Zero-Cost Edge Runs</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quantized 4-bit/8-bit PaliGemma runs locally on donation depot PCs or vans (RTX 3060/Mac M-series) with $0 cloud bill.
            </p>
          </div>

          <div className="bg-[#070e0a]/70 p-4 rounded-xl border border-emerald-500/20">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Donor Privacy Safeguard</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Garments with personal laundry tags, children's school labels, or badges are processed locally without cloud leak.
            </p>
          </div>

          <div className="bg-[#070e0a]/70 p-4 rounded-xl border border-emerald-500/20">
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Eco AI Compute</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consumes &gt;95% less energy per inference than monolithic 70B models, staying true to circular fashion sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flowchart */}
      <div className="glass-card p-6 sm:p-8">
        <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          End-to-End Triage Pipeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
          <div className="bg-[#070e0a] p-4 rounded-xl border border-emerald-500/20 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">STAGE 1</span>
            <div className="font-bold text-xs text-white my-2">Donation Photo Capture</div>
            <span className="text-[11px] text-slate-400">Donor / worker snaps garment flat lay</span>
          </div>

          <div className="bg-[#070e0a] p-4 rounded-xl border border-emerald-500/20 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">STAGE 2</span>
            <div className="font-bold text-xs text-white my-2">SigLIP Patch Embed</div>
            <span className="text-[11px] text-slate-400">1024-dim visual token representations</span>
          </div>

          <div className="bg-[#070e0a] p-4 rounded-xl border border-emerald-500/20 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">STAGE 3</span>
            <div className="font-bold text-xs text-white my-2">Cross-Attention Bridge</div>
            <span className="text-[11px] text-slate-400">Joint visual-textual reasoning</span>
          </div>

          <div className="bg-[#070e0a] p-4 rounded-xl border border-emerald-500/20 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">STAGE 4</span>
            <div className="font-bold text-xs text-white my-2">Gemma Decoder</div>
            <span className="text-[11px] text-slate-400">Evaluates wear, size, and urgency</span>
          </div>

          <div className="bg-[#070e0a] p-4 rounded-xl border border-emerald-400/40 bg-emerald-950/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">STAGE 5</span>
            <div className="font-bold text-xs text-white my-2">Triage & Routing</div>
            <span className="text-[11px] text-emerald-300">Bin barcode + Agency dispatch</span>
          </div>
        </div>
      </div>

      {/* JSON Schema Viewer */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/15 mb-4">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <h3 className="font-display font-bold text-base text-white">
              Deterministic Output Schema
            </h3>
          </div>
          <button
            onClick={copySchema}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:border-emerald-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy JSON Schema"}</span>
          </button>
        </div>

        <pre className="bg-[#070e0a] p-4 rounded-xl border border-white/5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
          {sampleSchema}
        </pre>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Read complete technical specs in <code className="text-emerald-400 font-mono">GEMMA_MODEL_SELECTION.md</code></span>
        </div>
      </div>

    </div>
  );
}
