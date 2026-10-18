import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ScannerHub from "./components/ScannerHub";
import EvaluationResult from "./components/EvaluationResult";
import AgencyPortal from "./components/AgencyPortal";
import GemmaArchitectureView from "./components/GemmaArchitectureView";
import ApiKeyModal from "./components/ApiKeyModal";
import PrintLabelModal from "./components/PrintLabelModal";
import { evaluateClothing, hasApiKey, getSelectedModel } from "./services/aiService";
import { SAMPLE_GARMENTS } from "./data/sampleGarments";
import { Sparkles, Heart, ExternalLink, ShieldCheck } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("scanner");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [itemToPrint, setItemToPrint] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isDispatched, setIsDispatched] = useState(false);
  
  // Seed initial agency inventory with sample items
  const [inventory, setInventory] = useState(SAMPLE_GARMENTS);
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash");

  useEffect(() => {
    setIsKeyConfigured(hasApiKey());
    setSelectedModel(getSelectedModel());
  }, []);

  const handleKeyUpdated = () => {
    setIsKeyConfigured(hasApiKey());
    setSelectedModel(getSelectedModel());
  };

  const handleAnalyze = async (payload) => {
    setIsAnalyzing(true);
    setIsDispatched(false);
    setEvaluationResult(null);

    try {
      const res = await evaluateClothing(payload);
      setEvaluationResult(res);
    } catch (err) {
      console.error("Evaluation error:", err);
      alert("Evaluation failed. Please try again or switch to demo mode.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDispatchToAgency = (item) => {
    if (!item) return;
    setInventory((prev) => [item, ...prev.filter((i) => i.id !== item.id)]);
    setIsDispatched(true);
  };

  const handleOpenPrintModal = (item = null) => {
    setItemToPrint(item || evaluationResult);
    setIsPrintModalOpen(true);
  };

  const handleScanAnother = () => {
    setEvaluationResult(null);
    setIsDispatched(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isKeyConfigured={isKeyConfigured}
        selectedModel={selectedModel}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab 1: Scanner & Triage */}
        {activeTab === "scanner" && (
          <div className="space-y-6">
            <ScannerHub
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              selectedGarment={evaluationResult}
            />

            {(isAnalyzing || evaluationResult) && (
              <EvaluationResult
                result={evaluationResult}
                isAnalyzing={isAnalyzing}
                onPrintLabel={() => handleOpenPrintModal(evaluationResult)}
                onDispatchToAgency={handleDispatchToAgency}
                onScanAnother={handleScanAnother}
                isDispatched={isDispatched}
              />
            )}
          </div>
        )}

        {/* Tab 2: Agency Logistics Portal */}
        {activeTab === "agency" && (
          <AgencyPortal
            inventory={inventory}
            onPrintItem={(item) => handleOpenPrintModal(item)}
          />
        )}

        {/* Tab 3: Gemma 4 Architecture */}
        {activeTab === "architecture" && (
          <GemmaArchitectureView
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-emerald-500/15 bg-[#070e0a]/90 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">ReWear AI</span>
            <span>•</span>
            <span>Hacktoberfest Gemma 4 Sprint</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">PaliGemma 2 & Gemini Flash</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              {isKeyConfigured ? "Update Gemini API Key" : "Add Gemini API Key"}
            </button>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for Circular Fashion
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyUpdated={handleKeyUpdated}
      />

      <PrintLabelModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        item={itemToPrint}
      />
    </div>
  );
}
