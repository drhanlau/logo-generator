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
const imagenModel = getImagenModel(
  vertexAI,
  {
    model: "imagen-3.0-generate-002"
  }
);

async function generateImage(prompt) {

  try {
    const response = await imagenModel.generateImages(prompt);

    if (response.filteredReason) {
      console.log(response.filteredReason);
    }

    if (response.images.length == 0) {
      throw new Error("No images in the response.")
    }

    const image = response.images[0];
    // console.log(image);
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, 'generatedImage.json');
    fs.writeFileSync(filePath, JSON.stringify(response, null, 2));
    console.log(`Image data written to ${filePath}`);
    return image;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

module.exports = { generateImage };
