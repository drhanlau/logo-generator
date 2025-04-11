# Classy Logo Generator

A stylish web app that generates a logo for your company using the Google Imagen3 API, based on your company name, industry, vibe, and other instructions.

## Features

- Elegant, minimal UI
- Collects company name, industry, vibe, and extra instructions
- Calls Google Imagen3 API to generate a logo
- Displays the generated logo instantly

## Setup

1. **Clone this repository** and navigate to the project directory.

2. **Install dependencies:**

   ```bash
   npm install express node-fetch
   ```

3. **Set your Google Imagen3 API key:**

   - Obtain an API key from Google Cloud for Imagen3.
   - Set it in your environment:
     ```bash
     export IMAGEN3_API_KEY=your_google_imagen3_api_key
     ```

4. **Start the server:**

   ```bash
   node server.js
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- The Imagen3 API endpoint and request format in `server.js` may need to be updated to match the latest Google API documentation.
- Your API key should have the necessary permissions for the Imagen3 API.
- For production, consider securing your API key and adding error handling.

## File Structure

```
public/
  index.html
  styles.css
  main.js
server.js
README.md
```

---

© 2025 Classy Logo Generator
