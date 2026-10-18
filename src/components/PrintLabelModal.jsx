import React from "react";
import { X, Printer, QrCode, Tag, CheckCircle2, Building, ShieldCheck } from "lucide-react";

export default function PrintLabelModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="modal-backdrop">
      <div className="relative w-full max-w-md bg-[#0d1a13] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/15 mb-4">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-lg text-white">NGO Donation Routing Tag</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Printable Sticker */}
        <div 
          id="printable-routing-label" 
          className="bg-white text-black p-5 rounded-xl border-2 border-dashed border-slate-300 font-sans shadow-inner"
        >
          {/* Top Label Header */}
          <div className="border-b-2 border-black pb-3 mb-3 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-black block text-slate-600">
                REWEAR AI TRIAGE MANIFEST
              </span>
              <h2 className="text-xl font-extrabold tracking-tight leading-none mt-1">
                {item.binId || "BIN-INSPECTION-01"}
              </h2>
            </div>
            <div className="text-right">
              <span className="inline-block bg-black text-white text-[10px] font-mono px-2 py-0.5 font-bold uppercase rounded">
                {item.conditionGrade || "GRADE A"}
              </span>
              <div className="text-[11px] font-mono mt-1 text-slate-700">SCORE: {item.conditionScore}/100</div>
            </div>
          </div>

          {/* Destination Agency */}
          <div className="bg-slate-100 p-2.5 rounded border border-slate-300 mb-3">
            <div className="text-[9px] font-mono uppercase tracking-wider text-slate-600 font-bold">
              ROUTING DESTINATION AGENCY
            </div>
            <div className="text-sm font-black text-slate-900 leading-snug">
              {item.agency?.name || "Charity Distribution Hub"}
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 mt-0.5">
              Urgency: {item.agency?.urgency || "High Priority"} • Type: {item.agency?.type || "Crisis"}
            </div>
          </div>

          {/* Item Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Item Name</span>
              <span className="font-bold text-slate-800">{item.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Estimated Size</span>
              <span className="font-bold text-slate-800">{item.sizing?.estimatedSize || "Adult Regular"}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Fabric Core</span>
              <span className="font-medium text-slate-700 truncate block">{item.fabric || "Blended Fiber"}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Tax FMV</span>
              <span className="font-bold text-emerald-700">${item.impact?.taxDeductionValue || 25}.00</span>
            </div>
          </div>

          {/* Barcode & Timestamp */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              {/* Simulated barcode */}
              <div className="flex gap-[2px] h-8 items-end">
                {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 2, 4, 1, 2, 3, 1].map((w, i) => (
                  <div key={i} className="bg-black h-full" style={{ width: `${w * 2}px` }}></div>
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-500 tracking-widest mt-1">
                RW-{item.id?.substring(0, 10) || "892019482"}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-600 block">EVALUATED BY</span>
              <span className="text-[11px] font-bold text-slate-800 font-mono">GEMMA-4-VISION</span>
              <span className="text-[9px] font-mono text-slate-500 block mt-0.5">{today}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-emerald-500/15">
          <p className="text-xs text-slate-400">Attach tag to donation box / bin</p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Done
            </button>
            <button
              onClick={handlePrint}
              className="btn-primary text-xs py-2 px-4"
            >
              <Printer className="w-4 h-4" />
              <span>Print Barcode Sticker</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
