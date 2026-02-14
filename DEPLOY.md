# Deploy KUMO to Vercel

## 0. Push to GitHub (do this first)

1. **Create a new repo on GitHub**  
   Go to [github.com/new](https://github.com/new). Name it e.g. **kumoshabu** (so Vercel can use **kumoshabu.vercel.app**). Leave “Add a README” unchecked. Create the repo.

2. **Add remote and push** (replace `YOUR_GITHUB_USERNAME` with your GitHub username):

```bash
cd "c:\Users\HP\Desktop\Web Menu Kumo"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/kumoshabu.git
git push -u origin main
```

If you named the repo something else (e.g. `kumo-menu`), use that in the URL:  
`https://github.com/YOUR_GITHUB_USERNAME/kumo-menu.git`

---

## 1. Log in to Vercel

In a terminal (PowerShell or Command Prompt) in this folder:

```bash
npx vercel login
```

Follow the prompts (email or GitHub).

## 2. Deploy from GitHub (recommended)

1. Go to [vercel.com/new](https://vercel.com/new).
2. **Import** your GitHub repo (e.g. `kumoshabu`).
3. Scope: choose **herdiridwans-projects** (or your account).
4. **Project name:** set to **kumoshabu** so the URL is **kumoshabu.vercel.app**.
5. Click **Deploy**. Every push to `main` will trigger a production deploy.

## 3. Production deploy from CLI (optional)

If you prefer the CLI after linking the project:

```bash
npx vercel --prod
```

Your site will be live at **https://kumoshabu.vercel.app** (if the project name is `kumoshabu`).

## 4. Custom domain (e.g. kumoshabu.vercell.com)

If you use a custom domain like **kumoshabu.vercell.com**:

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Settings** → **Domains**.
2. Add **kumoshabu.vercell.com**.
3. In your domain registrar, add the CNAME record Vercel shows (e.g. `cname.vercel-dns.com`).

Vercel’s default free URL is **\*.vercel.app** (e.g. **kumoshabu.vercel.app**).
