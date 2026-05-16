require("dotenv").config();
console.log(process.env.GEMINI_API_KEY);


// const fetch = require("node-fetch");


const API_KEY = process.env.GEMINI_API_KEY;

const normalizeSoil = (soil) => {
  const s = soil.toLowerCase();

  if (s.includes("alluvial")) {
    return "Alluvial soil (fertile river-deposited soil, high in potash, ideal for wheat and rice)";
  }

  if (s.includes("silt")) {
    return "Silty soil (fine soil with good moisture retention, suitable for rice and vegetables)";
  }

  if (s.includes("black")) {
    return "Black soil (clay-rich soil, retains moisture, ideal for cotton)";
  }

  if (s.includes("red")) {
    return "Red soil (iron-rich soil, suitable for millets and groundnut)";
  }

  return soil;
};
const getCropSuggestion = async ({ season, location, soil }) => {
  try {
    const normalizedSoil = normalizeSoil(soil);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
//                 {text: `
// You are an agricultural expert in India.

// Based on:
// - Season: ${season}
// - Location: ${location}
// - Soil type: ${soil}

// Suggest 5 suitable crops.

// Respond ONLY in valid JSON in the following exact format:

// [
//   {
//     "crop": "Crop name",
//     "duration": "Growing duration",
//     "water": "Water requirement",
//     "fertilizer": "Recommended fertilizer",
//     "yield": "Expected yield level"
//   }
// ]

// Do not add explanations.
// Do not add extra text.
// `
//               }
{text: `
You are an agricultural expert in India.

IMPORTANT RULES:
- The soil type MUST strongly influence crop selection.
- Only suggest crops that grow BEST in this soil.
- If the soil is unsuitable for a crop, do NOT include it.
- Soil compatibility is more important than season.

Based on:
- Season: ${season}
- Location: ${location}
- Soil type: ${normalizedSoil}

Suggest exactly 5 suitable crops.

Respond ONLY in valid JSON in this exact format:

[
  {
    "crop": "Crop name",
    "duration": "Growing duration",
    "water": "Water requirement",
    "fertilizer": "Recommended fertilizer",
    "yield": "Expected yield level"
  }
]

Return ONLY valid JSON. No explanation. No markdown. No extra text.
`}


              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Gemini API Error: ${response.status} ${text}`);
    }

    const result = await response.json();

    if (!result.candidates || result.candidates.length === 0) {
      throw new Error("No suggestions returned from Gemini API");
    }

    const text = result.candidates[0]?.content?.parts[0]?.text;
    if (!text) {
      throw new Error("Suggestion text missing in Gemini response");
    }

    let parsedSuggestion;
    try {
      parsedSuggestion = JSON.parse(text); // parse if JSON
    } catch {
      parsedSuggestion = text; // fallback to raw text
    }

    return parsedSuggestion;
  } catch (error) {
    console.error("getCropSuggestion error:", error);
    throw error;
  }
};


// const getCropSummary = async ({ cropName, season, duration }) => {
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `
// You are an agricultural expert in India.

// Crop:
// - Name: ${cropName}
// - Season: ${season}
// - Duration: ${duration}

// Return ONLY valid JSON in this format:

// {
//   "expected_yield": "range with unit",
//   "weather_suitability": "short weather tolerance",
//   "risk_level": "Low | Medium | High",
//   "ai_insight": "1-2 helpful lines"
// }

// Do NOT use markdown.
// Do NOT use backticks.
// `
//               }
//             ]
//           }
//         ]
//       })
//     }
//   );

//   const result = await response.json();
//   let text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
 

//   // if (!text) throw new Error("Empty AI response");

//   // // 🔥 CLEAN MARKDOWN
//   // text = text.replace(/```json/g, "").replace(/```/g, "").trim();

//   // return JSON.parse(text);

  
// };


// const getCropSummary = async ({ cropName, season, duration }) => {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `
// You are an agricultural expert.

// Return ONLY valid JSON:

// {
//   "expected_yield": "string",
//   "weather_suitability": "string",
//   "risk_level": "Low | Medium | High",
//   "ai_insight": "string"
// }

// Crop: ${cropName}
// Season: ${season}
// Duration: ${duration}
// `
//                 }
//               ]
//             }
//           ]
//         })
//       }
//     );

//     const result = await response.json();

//     let text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!text) return null;

//     // 🔥 STRONG CLEANING (IMPORTANT)
//     text = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     // 🔥 extract JSON safely
//     const jsonStart = text.indexOf("{");
//     const jsonEnd = text.lastIndexOf("}");

//     if (jsonStart === -1 || jsonEnd === -1) {
//       return null;
//     }

//     const cleanJson = text.substring(jsonStart, jsonEnd + 1);

//     return JSON.parse(cleanJson);

//   } catch (err) {
//     console.log("getCropSummary error:", err.message);
//     return null;
//   }
// };
const getCropSummary = async ({ cropName, season, duration }) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Return ONLY valid JSON. No explanation.

{
  "expected_yield": "string",
  "weather_suitability": "string",
  "risk_level": "Low | Medium | High",
  "ai_insight": "string"
}

Crop: ${cropName}
Season: ${season}
Duration: ${duration}
`
                }
              ]
            }
          ]
        })
      }
    );
    console.log("🔥 getCropSummary CALLED");

    const result = await response.json();

    // ✅ DEBUG (must be before parsing)
    console.log("RAW GEMINI RESPONSE:", JSON.stringify(result, null, 2));

    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
  console.log("❌ No AI text received:", result);
  return null;
}

    console.log("RAW TEXT:", text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) {
      console.log("❌ No JSON found");
      return null;
    }

    const parsed = JSON.parse(match[0]);

    console.log("✅ FINAL AI RESULT:", parsed);

    return parsed;

  } catch (err) {
    console.log("getCropSummary ERROR:", err.message);
    return null;
  }
};

module.exports = { getCropSummary, getCropSuggestion };

