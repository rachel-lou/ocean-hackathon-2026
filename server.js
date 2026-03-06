import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQbkVbQfGkr9yaJ5bj1KUjjHQ9Dq8OfTUrtDU7jpIvcIF3isKSspT_ywCIOUlMl-tbw_-b1iTcyN6Do/pub?output=csv&gid=1680084585";

// â”€â”€ Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// â”€â”€ API: proxy Google Sheets CSV (avoids browser CORS restriction)
app.get("/api/dives", async (req, res) => {
  try {
    const response = await fetch(SHEETS_CSV_URL);
    if (!response.ok) {
      return res.status(502).json({ error: `Upstream error: ${response.status}` });
    }
    const csv = await response.text();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Cache-Control", "public, max-age=3600"); // cache 1hr
    res.send(csv);
  } catch (err) {
    console.error("Failed to fetch dive data:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// â”€â”€ Fallback: serve index.html for any unmatched route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// For Vercel serverless
export default app;

// For local development
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`ðŸŒ¿ Kelp dashboard running at http://localhost:${PORT}`);
  });
}