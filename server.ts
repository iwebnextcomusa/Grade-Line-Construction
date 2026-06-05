import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

// Secure initialization of the Gemini AI SDK Client.
// Users configuration is loaded from GEMINI_API_KEY.
// The fallback user-specified public testing key is provided if nothing is in env.
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU";
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request body parsing
  app.use(express.json());

  // 1. SECURE CHATBOT ENDPOINT FOR SERVER-SIDE GEMINI API CALLS
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Missing 'message' in request body." });
      }

      const ai = getGeminiClient();

      // System Instructions tailored for Grade Line Construction
      const systemInstruction = `
You are the AI Assistant for Grade Line Construction, a premier excavation, grading, and site preparation contractor based in Grantsville, Utah.
Your goal is to represent the business with absolute professionalism, trustworthiness, and local expertise. Help users understand services, answer pricing queries/processes, and guide them to call or request a free estimate.

Business Details:
- Company Name: Grade Line Construction
- Website: gradelineconstruction.com
- Main Location: Grantsville, UT
- Area Covered: Tooele County, Salt Lake County, Utah County, and surrounding Utah areas.
- Contact Phone: 801-903-8689 (Highlight this for quick scheduling)
- Contact Email: claudewayman02@gmail.com
- Key Services Offered: Excavation, Site Preparation, Grading, Land Clearing, Utility Trenching, Driveway and Road Preparation, Residential and Commercial Construction Services.
- Brand Tone: Friendly, highly safe, experienced, and authoritative in site-work construction.

Conversation Guidelines:
1. Try to motivate users to submit the Contact Form or request an Estimate in the app, or Call the office directly at 801-903-8689.
2. Be polite and helpful. If the user asks about specific dirt-work or grading questions, explain the process clearly.
3. Keep answers relatively concise and highly readable.
`;

      // Build model instruction. We use 'gemini-3.5-flash' for basic text/conversational helper.
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        // Populate chat history if provided
        history: Array.isArray(history) ? history.map((h: any) => ({
          role: h.role, // 'user' or 'model'
          parts: [{ text: h.text }]
        })) : []
      });

      const response = await chat.sendMessage({ message });
      const textResponse = response.text || "I apologize, I didn't catch that. Could you please rephrase?";

      res.json({ text: textResponse });
    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({
        error: "I am having trouble connecting to my brain right now. Please feel free to call our office directly at 801-903-8689!",
        details: error?.message || String(error)
      });
    }
  });

  // 2. CONTACT ESTIMATE FORM SUBMISSION ENDPOINT (Local logging / Mock CRM integration)
  app.post("/api/estimates", (req, res) => {
    try {
      const { name, email, phone, service, message, spaceType, budget } = req.body;
      
      if (!name || (!email && !phone)) {
        return res.status(400).json({ error: "Name and at least one contact method (Email or Phone) are required." });
      }

      console.log("=== NEW ESTIMATE REQUEST RECEIVED ===");
      console.log(`Customer: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Phone: ${phone}`);
      console.log(`Service: ${service}`);
      console.log(`Space Type: ${spaceType}`);
      console.log(`Budget Range: ${budget}`);
      console.log(`Details: ${message}`);
      console.log("=====================================");

      // In a real application, this would send an email to claudewayman02@gmail.com or save to a database.
      res.json({
        success: true,
        message: "Estimate request received successfully! Claude or a team member will be in touch with you shortly at " + (phone || email) + "."
      });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to process estimate request. Please try again or call us." });
    }
  });

  // 3. VITE MIDDLEWARE SETUP FOR DEV VS PRODUCTION
  if (process.env.NODE_ENV !== "production") {
    // Inject Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the build directory
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to 0.0.0.0 and port 3000 as required by container regulations
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Grade Line Construction server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

startServer();
