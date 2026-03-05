# California Kelp Restoration Initiative — Dashboard

Field operations dashboard for kelp restoration dive teams. Displays live dive data from Caspar Cove fetched from a public Google Sheet.

## Project Structure

```
kelp-dashboard/
├── server.js          # Express app — serves static files + proxies /api/dives
├── package.json
├── vercel.json        # Vercel deployment config
├── public/
│   └── index.html     # Dashboard frontend
└── README.md
```

## Local Development

**1. Install Node.js**
Download and install the LTS version from [nodejs.org](https://nodejs.org). Make sure "Add to PATH" is checked during installation. Close and reopen your terminal after installing.

Verify it worked:
```bash
node --version
npm --version
```

**2. Install dependencies**
```bash
npm install
```
This creates a `node_modules` folder — it must be run before `npm start`.

**3. Run the server**
```bash
npm start
# → http://localhost:3000
```

Or with auto-reload on file changes (useful while editing):
```bash
npm run dev
```

The `/api/dives` route proxies the Google Sheets CSV server-side, avoiding CORS issues in the browser.

## Deploy to Vercel

**CLI:**
```bash
npm i -g vercel
vercel
```

**GitHub:**
1. Push to a GitHub repo
2. Import at vercel.com/new
3. Vercel auto-detects the Node app — click Deploy

## Data Source

Live dive log: Caspar Cove Purple Urchin Culling data, published as a public Google Sheet.
Canopy recovery estimated at ~1 ha per 15,000 urchins removed (adjustable in public/index.html).

## Adding More Sites

Site data lives in the SITES object in public/index.html.
Add additional /api/ routes in server.js for each new live data source.
