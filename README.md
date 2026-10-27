# Supabase setup for MFS

1. Create or choose a Supabase project. No Supabase projects were connected when this foundation was generated, so none was created on your behalf.
2. In Supabase SQL Editor, run `migrations/202610270001_initial_mfs.sql`.
3. In Authentication settings, disable public sign-ups. Configure email/password and magic-link sign-in, site URL, and redirect URLs for localhost and your final Vercel domain.
4. Create your admin user through Supabase Dashboard > Authentication > Users (invite your own verified email). Then assign `app_metadata.role = admin` using a trusted server-side Admin API or dashboard-supported user metadata editor. Never set admin role from user-editable `user_metadata`, a browser form, or the public signup path. Refresh the session after assigning the role.
5. Configure the project URL and publishable key in `.env.local`; configure `SUPABASE_SECRET_KEY` only in server-side deployment environment settings. Never put a secret key in a `NEXT_PUBLIC_` variable.
6. Storage bucket `mfs-media` is created by the SQL migration with read access for public media and admin-only writes. Upload only public portfolio assets there, never secrets or private documents.

The enquiry route stores submissions via the server-only Supabase secret key. The browser never receives this key. The `enquiries` table has no public read access. If email delivery is configured with Resend, set `RESEND_API_KEY` and a verified `ENQUIRY_FROM_EMAIL` sender. Enquiries are still stored if email delivery is not configured; the route returns a success state after storage. Configure Turnstile before production if spam risk requires it; honeypot and validation are included in this foundation.

Before launch, review the SQL against your project, run Supabase security advisors, test RLS using anon/authenticated/admin accounts, and review legal text for your jurisdiction.
