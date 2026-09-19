# Nativa Coffee Bar

Brand website for **Nativa Coffee Bar** (216 Woodside Ave, Newton, NJ) — specialty coffee, house bakery, and cocktails.

Built to Clarke Design Studio restaurant standards: brand-first landing, menu architecture & discovery, guest journey (discover → decide → act), purposeful motion, and production-ready responsive front end.

## Stack

- Vite static multi-page site
- Localized assets (Instagram photography + official menu PDF)
- Cloudflare Pages deployment

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Menu source

Official menu PDF is stored at `public/assets/menu/nativa-menu.pdf` and structured in `src/data/menu.js` for the interactive menu UI.

## Deploy (Cloudflare Pages)

```bash
npx wrangler pages deploy dist --project-name=nativa-coffee-bar
```
