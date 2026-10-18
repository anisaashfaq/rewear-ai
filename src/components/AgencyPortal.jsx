import React, { useState } from "react";
import { 
  Building2, Box, Filter, Download, ArrowUpRight, 
  CheckCircle2, Clock, Truck, AlertCircle, RefreshCw, Printer 
} from "lucide-react";
import { INITIAL_AGENCIES } from "../data/sampleGarments";

export default function AgencyPortal({ inventory = [], onPrintItem }) {
  const [agencies] = useState(INITIAL_AGENCIES);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredInventory = inventory.filter((item) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "crisis") return item.agency?.type === "Crisis Shelter";
    if (selectedFilter === "career") return item.agency?.type === "Workforce Career Closet";
    if (selectedFilter === "kids") return item.agency?.type === "Children & Foster Support";
    if (selectedFilter === "recycle") return item.agency?.type === "Circular Textile Recycler";
    return true;
  });

  const handleExportCSV = () => {
    const headers = ["ID", "Item Name", "Category", "Size", "Condition Score", "Grade", "Assigned Agency", "Bin ID", "Tax Value"];
    const rows = filteredInventory.map((item) => [
      item.id,
      `"${item.name}"`,
      item.category,
      item.sizing?.estimatedSize || "N/A",
      item.conditionScore,
      item.conditionGrade,
      `"${item.agency?.name}"`,
      item.binId,
      item.impact?.taxDeductionValue || 0
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rewear_manifest_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="glass-pill text-xs mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Central Triage & Warehouse Logistics
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display">
            Agency Distribution Hub
          </h2>
          <p className="text-sm text-slate-400">
            Real-time donation flow routed by Gemma 4 AI based on shelter urgency and garment condition
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="btn-secondary text-xs py-2 px-4 self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Triage Manifest (CSV)</span>
        </button>
      </div>

      {/* Agency Shortage & Capacity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agencies.map((agency) => (
          <div key={agency.id} className="glass-card p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                  agency.currentNeed === "Critical"
                    ? "bg-red-500/15 border-red-500/30 text-red-300"
                    : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                }`}>
                  {agency.currentNeed} Need
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  {agency.totalReceived} Sorted
                </span>
              </div>

              <h4 className="font-display font-bold text-white text-base leading-snug">
                {agency.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {agency.focus}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/15">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Urgent Priority Items:
              </span>
              <div className="flex flex-wrap gap-1">
                {agency.neededItems.slice(0, 2).map((item, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070e0a] border border-white/10 text-emerald-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Table Container */}
      <div className="glass-card p-6">
        
        {/* Table Filters & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/15">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-lg text-white">
              Sorted Garment Manifest ({filteredInventory.length})
            </h3>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {[
              { id: "all", label: "All Items" },
              { id: "crisis", label: "Crisis Shelter" },
              { id: "career", label: "Career Closet" },
              { id: "kids", label: "Kids & Foster" },
              { id: "recycle", label: "Recyclers" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-500/15 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Bin ID</th>
                <th className="py-3 px-3">Garment Description</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Condition</th>
                <th className="py-3 px-3">Target Agency</th>
                <th className="py-3 px-3">Tax Value</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-950/20 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                    {item.binId}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                      <div>
                        <span className="font-semibold text-white block">{item.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Size: {item.sizing?.estimatedSize || "Adult"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {item.category}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-400/30 text-emerald-300">
                      {item.conditionGrade}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-200">
                    {item.agency?.name}
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                    ${item.impact?.taxDeductionValue || 25}.00
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onPrintItem(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-500/20 transition-colors"
                      title="Print Routing Tag"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
