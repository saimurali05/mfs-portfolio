# Murali Forge Systems portfolio foundation

Next.js 15 App Router + TypeScript + Tailwind CSS v4, GSAP/ScrollTrigger, Motion dependency, Lenis, Supabase Auth/Database/Storage, Resend, Zod, React Hook Form dependency, next-sitemap, and Vercel Analytics.

## Local run
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Run `npm install`.
4. Run `npm run dev` and open `http://localhost:3000`.
5. Public portfolio pages render without Supabase. Admin login and enquiry storage require configured Supabase environment variables.

## Environment
See `.env.example`. Only `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`, and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` are intended for browser exposure. Never expose `SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, or `TURNSTILE_SECRET_KEY`.

## Supabase
Follow `supabase/README.md` and run `supabase/migrations/202610270001_initial_mfs.sql` in the SQL Editor. Admin authorization relies on server-issued `app_metadata.role = admin`, never user-editable metadata. Disable public signups and invite only your own admin user.

## Deploy to Vercel
Import this project into Vercel, set the environment variables in Project Settings, and deploy. Set `NEXT_PUBLIC_SITE_URL` and `SITE_URL` to your final custom domain after connecting it. The current metadata/sitemap fallback uses example.com until that value is configured. Do not deploy a secret to any `NEXT_PUBLIC_` variable.

## Email
Set `RESEND_API_KEY` and a verified sender in `ENQUIRY_FROM_EMAIL`. The destination defaults to `saimuralipanthula@gmail.com`. Phone/WhatsApp links use the contact number supplied for the site. Never submit credentials through the public enquiry form.

## Notes
- Project links are references provided by the owner; no claim is made that every linked demo is currently operational.
- Studio proof copy describes capabilities and design approach, not measured client results.
- Hybrid Premium PG is labelled a concept paused while funding is sought, not an operating business or public investment offer.
- Legal pages are substantive drafts but must be reviewed for the final hosting, analytics, email, privacy, and jurisdiction setup before launch.
- Verify with `npm run build`, test keyboard navigation, mobile layouts, reduced motion, RLS, admin-only CRUD, enquiry email, and all routes before production.


## Signature visual direction (October 2026)

The homepage hero now uses the official logo supplied by the owner at `public/images/mfs-real-logo.jpg`. It is not redrawn or replaced. The hero is a custom editorial composition with a responsive SVG workflow illustration, animated line paths and nodes, and GSAP-driven entrance/scroll motion. The visual direction uses warm white, navy and cobalt blue, with no building imagery or fake performance metrics. The workflow illustration is explicitly labelled as a concept, not a live product.

Build verification note: dependency installation was attempted in this environment but timed out, so a production build could not be verified here. Run `npm install` and `npm run build` in a network-enabled environment before deployment.
