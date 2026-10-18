import React, { useState, useRef, useEffect } from "react";
import { Upload, Camera, Sparkles, AlertCircle, RefreshCw, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { SAMPLE_GARMENTS } from "../data/sampleGarments";

export default function ScannerHub({ onAnalyze, isAnalyzing, selectedGarment }) {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeSampleId, setActiveSampleId] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, or WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setPreviewImage(base64);
      setActiveSampleId(null);
      stopCamera();
      onAnalyze({
        imageBase64: base64,
        mimeType: file.type,
        filename: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample) => {
    stopCamera();
    setActiveSampleId(sample.id);
    setPreviewImage(sample.thumbnail);
    onAnalyze({
      imageBase64: sample.thumbnail,
      mimeType: "image/jpeg",
      sampleId: sample.id,
      filename: `${sample.id}.jpg`
    });
  };

  // Camera handling
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera access denied or unavailable. Please use file upload or sample garments.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL("image/jpeg", 0.9);
    
    stopCamera();
    setPreviewImage(base64);
    setActiveSampleId(null);
    onAnalyze({
      imageBase64: base64,
      mimeType: "image/jpeg",
      filename: "camera_snapshot.jpg"
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Title Section */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Automated Garment Inspection & Charitable Routing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Snap Donated Clothes. <br />
          <span className="gradient-text">Gemma AI Triages Every Fiber.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Charities waste hundreds of hours manually inspecting bags of clothes. With <strong>ReWear AI</strong>, snap a photo to evaluate fabric, detect flaws, assess fit, and route each item straight to the right shelter or recycler.
        </p>
      </div>

      {/* Main Upload / Camera / Interactive Scanner Box */}
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Interactive State: Camera or Dropzone */}
          {isCameraActive ? (
            /* Live Camera Viewfinder */
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video sm:aspect-[16/9] border-2 border-emerald-400 shadow-2xl flex flex-col items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Viewfinder Target Grid */}
              <div className="absolute inset-8 border border-white/30 rounded-xl pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                </div>
                <div className="text-center font-mono text-xs text-white/80 bg-black/50 px-3 py-1 rounded-full self-center">
                  Align donated clothing item within frame
                </div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                </div>
              </div>

              {/* Camera Action Buttons */}
              <div className="absolute bottom-6 flex items-center gap-4 z-10">
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2 rounded-xl bg-black/60 text-white text-xs font-semibold backdrop-blur-md border border-white/20 hover:bg-black/80"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="btn-primary text-sm py-2.5 px-6 shadow-xl"
                >
                  <Camera className="w-4 h-4" />
                  <span>Snap Photo for Triage</span>
                </button>
              </div>
            </div>
          ) : (
            /* Standard Upload / Dropzone Box */
            <div>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-emerald-400 bg-emerald-500/10 scale-[1.01]"
                    : "border-emerald-500/30 hover:border-emerald-400/70 bg-[#070e0a]/50 hover:bg-[#070e0a]/80"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileInput}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display mb-1">
                      Upload Donated Garment Photo
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                      Drag & drop clothing photo here, or browse from your phone/computer
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/80 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
                    <span>Supports JPG, PNG, WEBP</span>
                    <span>•</span>
                    <span>High-Res Texture Triage</span>
                  </div>
                </div>
              </div>

              {/* Or Live Camera Button */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <span className="text-xs text-slate-400">or take a picture instantly:</span>
                <button
                  type="button"
                  onClick={startCamera}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Launch Live Camera Viewfinder</span>
                </button>
              </div>

              {cameraError && (
                <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{cameraError}</span>
                </div>
              )}
            </div>
          )}

          {/* Preset Sample Donated Items Bar */}
          <div className="mt-8 pt-6 border-t border-emerald-500/15">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Quick Test with Real Donated Items:
              </span>
              <span className="text-[11px] text-emerald-400 font-medium hidden sm:inline">
                Instant 1-Click Evaluation
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_GARMENTS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`group relative rounded-xl overflow-hidden border p-2 cursor-pointer transition-all ${
                    activeSampleId === sample.id
                      ? "border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-950/50"
                      : "border-white/10 bg-[#070e0a]/60 hover:border-emerald-500/40 hover:bg-[#070e0a]"
                  }`}
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 mb-2 relative">
                    <img
                      src={sample.thumbnail}
                      alt={sample.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/75 text-emerald-300 border border-emerald-400/30">
                      {sample.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate font-display">{sample.name}</h4>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 font-mono">
                    <span className="text-emerald-400 font-semibold">{sample.conditionGrade}</span>
                    <span>{sample.sizing.estimatedSize.split(" ")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
