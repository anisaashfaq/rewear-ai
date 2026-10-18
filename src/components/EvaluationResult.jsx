import React, { useState } from "react";
import { 
  CheckCircle2, AlertTriangle, Building2, Tag, Printer, Sparkles, 
  Droplets, Leaf, Scale, DollarSign, ArrowRight, ShieldCheck, 
  Maximize2, Info, ChevronRight, Check
} from "lucide-react";

export default function EvaluationResult({ 
  result, 
  isAnalyzing, 
  onPrintLabel, 
  onDispatchToAgency, 
  onScanAnother,
  isDispatched 
}) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto my-8">
        <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
          
          {/* Cyber scan line */}
          <div className="scan-laser-line"></div>

          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-6 shadow-xl shadow-emerald-950/60 animate-pulse">
            <Sparkles className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-extrabold text-white font-display mb-2">
            Gemma AI Evaluating Textile...
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
            PaliGemma 2 SigLIP vision encoder is analyzing fabric weave, checking seams, grading condition, and matching with regional charity needs.
          </p>

          {/* Telemetry Progress Steps */}
          <div className="max-w-md mx-auto space-y-2 text-left bg-[#070e0a]/80 p-4 rounded-xl border border-emerald-500/20 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>1. Extracting 1024-dim visual textile patches...</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>2. Inspecting collar, cuffs & zipper wear integrity...</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-600"></span>
              <span>3. Cross-referencing homeless shelter & crisis inventories...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-6">
      
      {/* Top Banner Alert / Dispatch Confirmation */}
      {isDispatched && (
        <div className="bg-emerald-950/80 border border-emerald-400 p-4 rounded-2xl flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-emerald-950 flex items-center justify-center">
              <Check className="w-5 h-5 font-bold" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Dispatched to {result.agency.name}!</p>
              <p className="text-xs text-emerald-300 font-mono">Assigned to Bin: {result.binId} • Manifest Updated</p>
            </div>
          </div>
          <button
            onClick={onPrintLabel}
            className="btn-primary text-xs py-2 px-3.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Bin Label</span>
          </button>
        </div>
      )}

      {/* Main Analysis Card */}
      <div className="glass-card p-6 sm:p-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-emerald-500/15 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="glass-pill text-xs">
                {result.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Bin: <strong className="text-white">{result.binId}</strong>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {result.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {result.description}
            </p>
          </div>

          {/* Condition Gauge Score */}
          <div className="flex items-center gap-4 bg-[#070e0a]/80 p-3.5 rounded-2xl border border-emerald-500/20 shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Condition Rating
              </span>
              <span className="font-bold text-sm text-white">{result.conditionGrade}</span>
            </div>
            <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/30 border border-emerald-400/40">
              <span className="font-mono font-black text-xl text-emerald-300">
                {result.conditionScore}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 absolute bottom-1 right-2">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Core Inspection Body: Image with Hotspots + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
          
          {/* Left Column: Image with Inspection Hotspots (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-emerald-500/30 shadow-xl group">
              <img
                src={result.thumbnail}
                alt={result.name}
                className="w-full h-full object-cover"
              />

              {/* Inspection Hotspots */}
              {result.defectsHotspots && result.defectsHotspots.map((spot, idx) => (
                <div
                  key={idx}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="hotspot-pin"
                  onMouseEnter={() => setActiveHotspot(spot)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot(activeHotspot === spot ? null : spot)}
                  title={spot.label}
                >
                  <div className="hotspot-center"></div>
                </div>
              ))}

              {/* Hotspot Tooltip */}
              {activeHotspot && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md p-3 rounded-xl border border-emerald-400/50 text-xs text-white shadow-2xl z-20 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Inspection Checkpoint:</span>
                  </div>
                  <p className="text-slate-200">{activeHotspot.label}</p>
                </div>
              )}

              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 border border-white/10">
                Tap dots for inspection notes
              </div>
            </div>

            {/* Model Info Pill */}
            <div className="bg-[#070e0a]/90 p-2.5 rounded-xl border border-emerald-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="truncate">Engine: {result.engineUsed || "PaliGemma 2 Vision"}</span>
              <span className="text-emerald-400 shrink-0 font-bold">
                {result.inferenceTimeMs ? `${result.inferenceTimeMs}ms` : "1.4s"}
              </span>
            </div>
          </div>

          {/* Right Column: Sizing, Fabric, Defect Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Fabric & Material Composition */}
            <div className="bg-[#070e0a]/60 p-4 rounded-xl border border-emerald-500/20">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider block mb-1">
                Fabric & Material Composition
              </span>
              <p className="text-sm font-semibold text-white">
                {result.fabric}
              </p>
              {result.colors && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-xs text-slate-400">Detected Tones:</span>
                  {result.colors.map((c, i) => (
                    <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sizing Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-[#070e0a]/60 p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Est. Size</span>
                <span className="font-bold text-sm text-white font-mono">{result.sizing?.estimatedSize || "Adult M"}</span>
              </div>
              <div className="bg-[#070e0a]/60 p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Fit Type</span>
                <span className="font-bold text-xs text-white">{result.sizing?.fitType || "Regular"}</span>
              </div>
              <div className="bg-[#070e0a]/60 p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Season</span>
                <span className="font-bold text-xs text-white">{result.sizing?.season || "All-Season"}</span>
              </div>
              <div className="bg-[#070e0a]/60 p-3 rounded-xl border border-emerald-500/15">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Chest/Span</span>
                <span className="font-bold text-xs text-white font-mono">{result.sizing?.chestEstimate || "Standard"}</span>
              </div>
            </div>

            {/* Defect Inspection Observations */}
            <div className="bg-[#070e0a]/60 p-4 rounded-xl border border-emerald-500/20">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block mb-2">
                Physical Condition & Flaw Analysis
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {result.defects?.map((defect, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{defect}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Agency Card */}
            <div className="bg-gradient-to-br from-emerald-950/60 to-[#070e0a] p-4 sm:p-5 rounded-2xl border-2 border-emerald-400/40 shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400">
                      Optimal NGO Match ({result.agency.matchScore}% Confidence)
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white">
                      {result.agency.name}
                    </h4>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                  result.agency.urgencyColor === "red"
                    ? "bg-red-500/20 border-red-500/40 text-red-300"
                    : result.agency.urgencyColor === "blue"
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : "bg-purple-500/20 border-purple-500/40 text-purple-300"
                }`}>
                  {result.agency.urgency}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/5">
                {result.agency.reason}
              </p>
            </div>

          </div>
        </div>

        {/* Environmental & Carbon Avoidance Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-500/15">
          <div className="flex items-center gap-3 bg-[#070e0a]/70 p-3 rounded-xl border border-emerald-500/10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Water Saved</span>
              <span className="font-display font-bold text-sm text-white">
                {result.impact?.waterSavedLiters?.toLocaleString() || "2,400"} L
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#070e0a]/70 p-3 rounded-xl border border-emerald-500/10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">CO₂ Avoided</span>
              <span className="font-display font-bold text-sm text-white">
                {result.impact?.co2AvoidedKg || "5.4"} kg
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#070e0a]/70 p-3 rounded-xl border border-emerald-500/10">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Landfill Diverted</span>
              <span className="font-display font-bold text-sm text-white">
                {result.impact?.landfillDivertedKg || "1.8"} kg
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#070e0a]/70 p-3 rounded-xl border border-emerald-500/10">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Tax Value (FMV)</span>
              <span className="font-display font-bold text-sm text-emerald-400 font-mono">
                ${result.impact?.taxDeductionValue || "45"}.00
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-emerald-500/15">
          <button
            onClick={onScanAnother}
            className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4"
          >
            ← Scan Another Item
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onPrintLabel}
              className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Triage Label</span>
            </button>

            <button
              onClick={() => onDispatchToAgency(result)}
              disabled={isDispatched}
              className={`btn-primary w-full sm:w-auto text-xs py-2.5 px-5 ${
                isDispatched ? "opacity-75 cursor-default bg-emerald-700" : ""
              }`}
            >
              {isDispatched ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Item Logged to Agency</span>
                </>
              ) : (
                <>
                  <Building2 className="w-4 h-4" />
                  <span>Dispatch to {result.agency.name.split(" ")[0]}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
