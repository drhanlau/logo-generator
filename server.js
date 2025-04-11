const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// POST /api/generate-logo
app.post("/api/generate-logo", async (req, res) => {
  const { company, industry, vibe, instructions } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        "Gemini API key not set. Please set GEMINI_API_KEY in your environment.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Construct prompt for Gemini
    const prompt = `Create a professional logo for a company named "${company}" in the "${industry}" industry. Vibe: ${vibe}. ${instructions}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    let imageData = null;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageData = part.inlineData.data;
        break;
      }
    }

    if (!imageData) {
      return res
        .status(500)
        .json({ error: "No image generated from Gemini API." });
    }

    // Return the base64 image data
    res.json({ imageUrl: `data:image/png;base64,${imageData}` });
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    res.status(500).json({
      error: `Failed to generate logo: ${err.message}`,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
