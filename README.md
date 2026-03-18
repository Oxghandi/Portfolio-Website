# Gen. Paul Portfolio

Next.js 14 + Tailwind portfolio for Gen. Paul (0xghandi), with Netlify Blobs-backed dynamic project management and a secure `/admin` dashboard.

## Run locally

```bash
npm install
npm run dev
```

## Recommended local Netlify emulation

```bash
/opt/buildhome/node-deps/node_modules/.bin/netlify dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill values.

- `ADMIN_SESSION_SECRET` (required)
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` (optional fallback credentials)

For production authentication, Netlify Identity credentials can also be used.
