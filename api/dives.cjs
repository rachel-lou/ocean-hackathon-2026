const SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQbkVbQfGkr9yaJ5bj1KUjjHQ9Dq8OfTUrtDU7jpIvcIF3isKSspT_ywCIOUlMl-tbw_-b1iTcyN6Do/pub?output=csv&gid=1680084585";

export default async function handler(req, res) {
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
    res.status(500).json({ error: err.message });
  }
}