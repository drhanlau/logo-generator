const express = require("express");
const path = require("path");
const { VertexAI } = require('@google-cloud/vertexai');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const { generateImage } = require('./image-fb');


// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const { initializeApp } = require("firebase/app");
const { getVertexAI, getImagenModel } = require("firebase/vertexai");

// TODO(developer) Replace the following with your app's Firebase configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyATJ2xdBAWkwVQlx4NOTE1C7sC7H8as9jk",
  authDomain: "cny2024-b23be.firebaseapp.com",
  projectId: "cny2024-b23be",
  storageBucket: "cny2024-b23be.firebasestorage.app",
  messagingSenderId: "427696236819",
  appId: "1:427696236819:web:f1faf6bdf8c6d70fae92e6"
};
// Initialize FirebaseApp
const firebaseApp = initializeApp(firebaseConfig);

// Initialize the Vertex AI service
const vertexAI = getVertexAI(firebaseApp);

// Create an `ImagenModel` instance with an Imagen 3 model that supports your use case

// New Firebase-based logo generation endpoint
app.post("/api/logo-fb", async (req, res) => {
  const { company, industry, vibe, instructions } = req.body;

  try {
    // Construct prompt
    const prompt = `Create a professional logo for a company named "${company}" in the "${industry}" industry. Vibe: ${vibe}. ${instructions}`;

    // Generate the image
    const image = await generateImage(prompt);

    // Return the image data
    res.json({
      imageUrl: `data:image/png;base64,${image.bytesBase64Encoded}`,
      // Include any additional metadata if available
      metadata: image.metadata
    });
  } catch (err) {
    console.error("Error generating logo with Firebase:", err);
    res.status(500).json({
      error: `Failed to generate logo: ${err.message}`,
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
