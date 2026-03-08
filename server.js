import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQbkVbQfGkr9yaJ5bj1KUjjHQ9Dq8OfTUrtDU7jpIvcIF3isKSspT_ywCIOUlMl-tbw_-b1iTcyN6Do/pub?output=csv&gid=1680084585";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/dives", async (req, res) => {
  try {
    const response = await fetch(SHEETS_CSV_URL);
    if (!response.ok) {
      return res.status(502).json({ error: `Upstream error: ${response.status}` });
    }
    const csv = await response.text();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(csv);
  } catch (err) {
    console.error("Failed to fetch dive data:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;

app.listen(PORT, () => {
  console.log(`🌿 Kelp dashboard running at http://localhost:${PORT}`);
});