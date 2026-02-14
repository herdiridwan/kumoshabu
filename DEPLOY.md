# Deploy KUMO to Vercel

## 1. Log in to Vercel

In a terminal (PowerShell or Command Prompt) in this folder:

```bash
npx vercel login
```

Follow the prompts (email or GitHub).

## 2. Deploy

```bash
npx vercel
```

- First time: choose your scope (team/account), confirm project settings.
- To get **kumoshabu.vercel.app**: when asked for project name, use **kumoshabu** (or set it in the Vercel dashboard after the first deploy).

## 3. Production deploy

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
