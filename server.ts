import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy endpoint for research
  app.post("/api/research", async (req, res) => {
    const { query } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    if (!query) {
      return res.status(400).json({ error: "Query is required." });
    }

    try {
      const genAI = new GoogleGenAI({ apiKey });
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: query,
        config: {
          tools: [
            {
              googleSearch: {}
            }
          ]
        }
      });

      let text = "";
      try {
        text = response.text || "";
        if (!text && response.candidates?.[0]?.content?.parts?.[0]?.text) {
          text = response.candidates[0].content.parts[0].text;
        }
      } catch (e) {
        console.error("Text extraction failed:", e);
      }

      if (!text) {
        return res.status(500).json({ error: "The model was unable to synthesize the search results into a report." });
      }

      res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      let message = "An unknown error occurred during API communication.";
      if (error?.message) {
        try {
          const parsed = JSON.parse(error.message);
          if (parsed.error?.code === 429) {
            message = "Quota Exceeded: The API key has reached its rate limit.";
          } else if (parsed.error?.message) {
            message = parsed.error.message;
          } else {
            message = error.message;
          }
        } catch {
          message = error.message;
        }
      }
      res.status(500).json({ error: message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
