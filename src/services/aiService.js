import { GoogleGenerativeAI } from "@google/generative-ai";
import { SAMPLE_GARMENTS } from "../data/sampleGarments";

const STORAGE_KEY = "rewear_gemini_api_key";
const MODEL_KEY = "rewear_selected_model";

export function getApiKey() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY || "";
}

export function saveApiKey(key) {
  if (typeof window !== "undefined") {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

export function getSelectedModel() {
  if (typeof window === "undefined") return "gemini-2.0-flash";
  return localStorage.getItem(MODEL_KEY) || import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";
}

export function saveSelectedModel(modelName) {
  if (typeof window !== "undefined") {
    localStorage.setItem(MODEL_KEY, modelName);
  }
}

export function hasApiKey() {
  const key = getApiKey();
  return Boolean(key && key.trim().length > 5);
}

export async function testApiKey(apiKey) {
  if (!apiKey || !apiKey.trim()) {
    return { success: false, message: "API key is required." };
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Reply with 'OK' if you can read this.");
    const text = result.response.text();
    if (text) {
      return { success: true, message: "API Key verified successfully!" };
    }
    return { success: false, message: "No response received from model." };
  } catch (error) {
    return { success: false, message: error.message || "Failed to validate API key." };
  }
}

/**
 * Main evaluation function.
 * If user provided an API key, performs real multimodal call with Gemini/Gemma prompt.
 * If not, simulates PaliGemma 2 local inference with realistic data.
 */
export async function evaluateClothing({ imageBase64, mimeType = "image/jpeg", sampleId = null, filename = "garment.jpg" }) {
  // If user selected one of the preset high-res samples and is in demo mode without key
  if (sampleId) {
    const sample = SAMPLE_GARMENTS.find((s) => s.id === sampleId);
    if (sample && !hasApiKey()) {
      // Simulate realistic PaliGemma 2 local inference delay
      await new Promise((resolve) => setTimeout(resolve, 1400));
      return {
        ...sample,
        engineUsed: "PaliGemma 2 (3B-pt Local Edge Simulation)",
        inferenceTimeMs: 1420,
        isLiveAI: false
      };
    }
  }

  const apiKey = getApiKey();

  // If live API key is available, call Gemini API
  if (apiKey && imageBase64) {
    try {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelName = getSelectedModel();
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `You are ReWear AI, an expert textile evaluator and charitable clothing donation triage system using Google Gemma 4 architecture.
Inspect this donated clothing photo thoroughly. 
Identify the garment, assess its fabric, evaluate physical condition (stains, holes, seam integrity, wear), estimate sizing, and route it to the optimal charitable agency.

Return ONLY a valid JSON object (no markdown quotes, no other text) following this exact schema:
{
  "name": "concise descriptive title of garment",
  "description": "2-sentence summary of item style, color, and visual condition",
  "category": "Outerwear" | "Business / Formal" | "Casual & Basics" | "Activewear" | "Children & Toddler" | "Textile Recycling & Upcycling",
  "fabric": "Estimated fabric composition (e.g. 100% Wool, Cotton/Polyester Blend, etc.)",
  "colors": ["Color 1", "Color 2"],
  "conditionScore": 0 to 100,
  "conditionGrade": "Grade A (Like New)" | "Grade B (Gently Used)" | "Grade C (Fair / Minor Flaws)" | "Grade D (Textile Reclamation)",
  "gradeColor": "emerald" | "blue" | "amber" | "red",
  "sizing": {
    "estimatedSize": "e.g. Adult M, Men's 40R, Kids 5T, or Unisex",
    "chestEstimate": "e.g. 38 - 40 inches or N/A",
    "fitType": "Regular" | "Slim" | "Oversized" | "Tailored",
    "season": "Winter" | "Summer" | "All-Season" | "Spring / Fall"
  },
  "defects": [
    "List of 2-3 specific condition observations or defects (e.g. minor pilling, faint collar mark, pristine zippers)"
  ],
  "agency": {
    "name": "Specific charitable cause name (e.g. St. Jude Homeless Shelter, Dress for Success Career Closet, Foster Care Depot, or Circular Textile Recycler)",
    "type": "Crisis Shelter" | "Workforce Career Closet" | "Children & Foster Support" | "Circular Textile Recycler",
    "matchScore": 85 to 99,
    "urgency": "Critical / Immediate Need" | "High Priority" | "Standard Batching",
    "urgencyColor": "red" | "blue" | "amber" | "purple",
    "reason": "Clear explanation of why this donated garment matches this specific agency's need"
  },
  "binId": "e.g. BIN-WINTER-A04, BIN-CAREER-C12, BIN-KIDS-K02, or BIN-RECYCLE-R09",
  "impact": {
    "waterSavedLiters": number (e.g. 1800 to 4500),
    "co2AvoidedKg": number (e.g. 2.5 to 8.5),
    "landfillDivertedKg": number (e.g. 0.6 to 2.5),
    "taxDeductionValue": number (e.g. 15 to 95)
  },
  "defectsHotspots": [
    { "x": 50, "y": 30, "label": "Key area inspected" },
    { "x": 45, "y": 65, "label": "Fabric integrity note" }
  ]
}`;

      const startTime = performance.now();
      const result = await model.generateContent([
        {
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType || "image/jpeg"
          }
        },
        prompt
      ]);

      const endTime = performance.now();
      const responseText = result.response.text();

      // Clean markdown code blocks if returned
      let cleanedJson = responseText.trim();
      if (cleanedJson.startsWith("```json")) {
        cleanedJson = cleanedJson.replace(/^```json\s*/, "").replace(/```$/, "").trim();
      } else if (cleanedJson.startsWith("```")) {
        cleanedJson = cleanedJson.replace(/^```\s*/, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(cleanedJson);

      return {
        ...parsed,
        id: "eval-" + Date.now(),
        thumbnail: imageBase64,
        engineUsed: `${modelName} (via Google AI Studio Gemini API / Gemma Prompt Schema)`,
        inferenceTimeMs: Math.round(endTime - startTime),
        isLiveAI: true
      };
    } catch (err) {
      console.warn("Live AI evaluation failed, falling back to simulated inference:", err);
      // Fallback with note
      return generateDynamicFallback(imageBase64, filename, err.message);
    }
  }

  // Fallback / Demo Mode for uploaded custom images when no key is set
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return generateDynamicFallback(imageBase64, filename, null);
}

function generateDynamicFallback(imageBase64, filename, errorReason) {
  const isOuterwear = filename.toLowerCase().includes("jacket") || filename.toLowerCase().includes("coat") || filename.toLowerCase().includes("parka");
  const isJeans = filename.toLowerCase().includes("jean") || filename.toLowerCase().includes("pant") || filename.toLowerCase().includes("denim");
  const isKids = filename.toLowerCase().includes("kid") || filename.toLowerCase().includes("baby") || filename.toLowerCase().includes("child");

  let result = { ...SAMPLE_GARMENTS[0] };
  if (isJeans) result = { ...SAMPLE_GARMENTS[3] };
  else if (isKids) result = { ...SAMPLE_GARMENTS[2] };
  else if (isOuterwear) result = { ...SAMPLE_GARMENTS[0] };
  else result = { ...SAMPLE_GARMENTS[1] };

  return {
    ...result,
    id: "eval-" + Date.now(),
    thumbnail: imageBase64 || result.thumbnail,
    name: result.name + " (Auto-Evaluated)",
    engineUsed: "PaliGemma 2 (Edge Vision Simulation — Add Gemini API key for live custom model)",
    inferenceTimeMs: 1180,
    isLiveAI: false,
    warning: errorReason ? `Live AI Notice: ${errorReason}. Used local Gemma rule simulation.` : null
  };
}
