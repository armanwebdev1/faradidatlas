# Faradid Atlas

Production Next.js site for Faradid Atlas.

## Runtime

Use Node 22 for local development, CI, and hosting.

```bash
nvm use
npm ci
```

The project pins Node 22 in `.nvmrc` and `package.json` because Node 24 has shown local Windows access-violation crashes with the current Next.js toolchain.

## Environment

Copy `.env.example` into your hosting provider's environment settings.

Required before production launch:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ENABLE_BACKEND=false
```

`PREVIEW_SECRET` must also be set: it guards the draft-mode preview endpoint (`/api/preview`) and is embedded in Payload admin preview URLs.

Keep `NEXT_PUBLIC_ENABLE_BACKEND=false` until email delivery is ready. When backend/email is enabled later, set:

```bash
NEXT_PUBLIC_ENABLE_BACKEND=true
RESEND_API_KEY=
LEAD_FROM_EMAIL=
LEAD_TO_EMAIL=
CAREERS_TO_EMAIL=
TURNSTILE_SECRET_KEY=
```

## Production Checks

Run these on Node 22 before deploying:

```bash
npm run production:check
```

This runs TypeScript, ESLint, production build, and a moderate npm audit.

## Custom Domain Checklist

1. Deploy the project first and verify the provider preview URL.
2. Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain, including `https://`.
3. Add both the apex domain and `www` domain in the hosting provider.
4. Configure DNS at the registrar:
   - Apex/root domain, such as `example.com`: use the provider's A record.
   - Subdomain, such as `www.example.com`: use the provider's CNAME record.
5. Pick one canonical domain in the hosting provider and redirect the other.
6. Wait for SSL issuance, then check:
   - `/en`
   - `/fa`
   - `/sitemap.xml`
   - `/robots.txt`
   - one product detail page in each language

## Notes

- Contact and careers forms are frontend-safe while backend delivery is paused.
- Product catalog images use optimized WebP assets from `public/product_images/optimized`.
- Public image folders are cached as immutable assets in `next.config.mjs`; rename an asset if you need to bust that cache.
