# Mini‑Market Predictor

A tiny prediction market demo with an LMSR market maker. Create a market, trade YES/NO, and watch the odds move. Data persists in `localStorage` and ships with sample markets.

## Tech
- React + Vite
- LMSR math in `src/lib/lmsr.js`
- Fake API in `src/api.js` (no backend)
- Minimal CSS, mobile-friendly

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Deploy
- **Vercel**: Import project → framework "Vite" → deploy.
- **Netlify**: New site → build `npm run build`, publish dir `dist/`.
- **GitHub Pages**: Serve `dist/` with any static host.

## Notes
- New users click **Sign in** to get $1000 play balance.
- Anyone can **resolve** a market in this demo (for simplicity).
- Payouts: winning shares pay **$1** each on resolution.
