# KUMO — Japanese Shabu & Sukiyaki Menu

Premium restaurant web catalogue for KUMO. Run the app from this folder (project root).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Images (assets)

Place image files in either:

- **public/assets/** (e.g. `public/assets/Background.png`), or  
- The root **Assets** folder (same folder as `KUMO .pdf`).

They are served at `/assets/...`.

Required for the UI:

- **Background.png** — Page texture (put in `public/assets/` or `Assets/`)
- **BannerBeef.png** — Beef banner section
- **Logo-01.webp** — Cover logo
- Category and item images (see plan): `Shabu Shabu.png`, `Sukiyaki.png`, etc.

If you see a **kumo-app** folder, it is a leftover from scaffolding and can be deleted. Close any running dev servers or editors first if deletion fails (e.g. locked `node_modules`).
