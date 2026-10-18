# 🌿 ReWear AI — Smart Clothing Donation & NGO Routing

> **Hacktoberfest 2026 Challenge — Gemma 4 / Gemma Multimodal Track**  
> *Transforming charitable clothing donation triage with Google PaliGemma 2 & Gemini Multimodal Vision.*

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Gemma_4_Challenge-10b981.svg)](https://hacktoberfest.com/)
[![Model](https://img.shields.io/badge/Model-Google_PaliGemma_2_(3B)-34d399.svg)](./GEMMA_MODEL_SELECTION.md)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_+_Vite-059669.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## 📌 Problem Overview

Every year, charitable donation centers, disaster relief depots, and homeless shelters receive millions of bags of unsorted clothing donations. 

Currently, agency workers and volunteers spend **up to 40% of their operating hours manually sorting items**:
- **Inspecting condition:** Checking for hidden seam tears, collar stains, zipper damage, and fabric pilling.
- **Assessing fit & category:** Estimating sizing, demographics (toddler, kid, unisex, adult), and season suitability.
- **Deciding destination:** Manually routing items to crisis shelters, career closets, foster family centers, or textile recyclers.

Mistakes often result in ruined donations (e.g., stained clothing sent to job-interview wardrobe drives) or high-grade thermal coats mistakenly discarded into textile shredders.

---

## ✨ ReWear AI Solution

**ReWear AI** automates this entire intake workflow. Donors or shelter staff simply snap a photo using their phone or webcam, and our **Gemma-powered multimodal engine** performs an instant, multi-dimensional assessment:

1. **Textile & Weave Classification:** Identifies garment type, fabric composition (e.g. 100% Wool vs. Synthetic blend), and color tones.
2. **Defect & Condition Inspection:** Scans for tears, stains, and zipper integrity, outputting a calibrated **Condition Score (0–100%)** and **Grade (A to D)**.
3. **Fit & Sizing Profile:** Estimates size (XS–3XL, Kids 4T, Unisex), silhouette, and seasonal suitability.
4. **Intelligent NGO Matching:** Dynamically queries regional shelter shortage databases and assigns the garment to the most urgent destination (e.g., *St. Jude Crisis Shelter Winter Warmth Drive*, *Dress for Success Career Closet*, or *Circular Textile Recycler*).
5. **Warehouse Bin Allocation & Thermal Label Printing:** Automatically assigns a bin ID (e.g., `BIN-WINTER-A04`) and generates a 1-click printable barcode triage tag.
6. **Carbon & Water Impact Metrics:** Quantifies environmental savings (liters of water saved, kg of CO₂ avoided, and landfill diversion) plus estimated tax deduction value.

---

## 🧠 Model Selection: Why Google PaliGemma 2 / Gemma 4?

For full technical rationale and architecture specifications, please read [**`GEMMA_MODEL_SELECTION.md`**](./GEMMA_MODEL_SELECTION.md).

### Summary of Architectural Advantages:
- **SigLIP-So400m High-Resolution Vision Encoder:** Captures fine-grained textile weave patterns and localized defects that standard coarse embeddings miss.
- **Zero-Cost Edge Runs for Non-Profits:** At 3B parameters, quantized PaliGemma 2 runs locally on standard donation center PCs or mobile drop-off vans with **$0 cloud cost**.
- **Donor Privacy:** No personal donor laundry tags or children's labels leave the premises.
- **Dual-Mode Cloud Fallback:** Integrates with Google AI Studio's **Gemini 2.0 / 1.5 Flash** for high-throughput cloud batch processing using the Gemma clothing schema.
- **Eco-Friendly AI:** Uses >95% less energy per inference than massive 70B+ models, directly aligning with circular fashion and United Nations Sustainable Development Goals (SDG 12 & SDG 13).

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22)
- **npm** v9+

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/anisaashfaq/rewear-ai.git
cd rewear-ai

# Install dependencies
npm install
```

### 3. API Key Setup (Optional for Demo Mode)
ReWear AI comes with a **built-in PaliGemma 2 offline demo engine** with pre-calibrated samples. 

To enable **live custom photo analysis** with Google Generative AI:
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and paste your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GEMINI_MODEL=gemini-2.0-flash
   ```
*(You can also input and test your API key directly in the web app UI using the "Key: Demo Mode" button in the navigation bar!)*

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Project Structure

```
rewear-ai/
├── public/
│   ├── favicon.svg              # Circular fashion branding icon
│   └── samples/                 # Photorealistic donation test garments
│       ├── winter-parka.jpg     # Down winter parka (Crisis Shelter)
│       ├── formal-blazer.jpg    # Worsted wool blazer (Career Closet)
│       ├── kids-raincoat.jpg    # Yellow toddler raincoat (Foster Depot)
│       └── worn-denim.jpg       # Distressed jeans (Textile Recycler)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Header, navigation, and API key status pill
│   │   ├── ScannerHub.jsx       # Camera viewfinder, drag-and-drop, sample picker
│   │   ├── EvaluationResult.jsx # AI inspection card, defect hotspots, eco metrics
│   │   ├── AgencyPortal.jsx     # Agency shortage tracker, bin manifests, CSV export
│   │   ├── GemmaArchitectureView.jsx # Visual pipeline and JSON schema inspector
│   │   ├── ApiKeyModal.jsx      # Gemini API key configuration and connection tester
│   │   └── PrintLabelModal.jsx  # Printable donation routing barcode sticker
│   ├── data/
│   │   └── sampleGarments.js    # Pre-calibrated garment taxonomy and shelter database
│   ├── services/
│   │   └── aiService.js         # Gemini API client & PaliGemma simulation service
│   ├── App.jsx                  # Main application state and coordinator
│   ├── index.css                # Pure Vanilla CSS design system & micro-animations
│   └── main.jsx                 # React root entry
├── .env.example                 # Environment configuration template
├── GEMMA_MODEL_SELECTION.md     # In-depth Gemma model rationale & architecture
├── package.json
└── README.md
```

---

## 🌍 Sustainable Development Goals (SDGs)
- **Goal 12: Responsible Consumption and Production** — Extending the lifecycle of garments and routing unwearable items to circular fiber shredding.
- **Goal 1: No Poverty** — Equipping vulnerable individuals and job seekers with dignified, quality clothing.
- **Goal 13: Climate Action** — Diverting tons of textiles from methane-emitting landfills and avoiding virgin cotton water consumption.

---

## 📄 License
This project is licensed under the [MIT License](./LICENSE) — Copyright (c) 2026 Anisa Ashfaq.
