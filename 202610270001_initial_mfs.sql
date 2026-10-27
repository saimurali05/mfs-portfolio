create extension if not exists pgcrypto;
create table if not exists public.projects (
 id uuid primary key default gen_random_uuid(), title text not null check (char_length(title) between 1 and 160), category text not null default 'Personal project', description text not null default '', url text, image_path text, status text not null default 'Concept' check (status in ('Concept','Prototype','In progress','Completed','Archived')), published boolean not null default false, sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.studio_proofs (
 id uuid primary key default gen_random_uuid(), title text not null check (char_length(title) between 1 and 160), description text not null default '', proof_type text not null default 'Capability', status text not null default 'Concept', published boolean not null default false, sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.site_content (
 id uuid primary key default gen_random_uuid(), content_key text not null unique, title text not null default '', body text not null default '', published boolean not null default false, updated_at timestamptz not null default now()
);
create table if not exists public.site_settings (
 id uuid primary key default gen_random_uuid(), setting_key text not null unique, value jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now()
);
create table if not exists public.enquiries (
 id uuid primary key default gen_random_uuid(), name text not null check (char_length(name) between 1 and 100), email text not null check (char_length(email) <= 254), topic text not null check (char_length(topic) between 1 and 120), message text not null check (char_length(message) between 10 and 5000), status text not null default 'new' check (status in ('new','in_progress','closed')), created_at timestamptz not null default now()
);
create index if not exists projects_public_order on public.projects(published, sort_order);
create index if not exists studio_proofs_public_order on public.studio_proofs(published, sort_order);
create index if not exists enquiries_created_at on public.enquiries(created_at desc);

alter table public.projects enable row level security;
alter table public.studio_proofs enable row level security;
alter table public.site_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.enquiries enable row level security;

create policy "Public can read published projects" on public.projects for select to anon, authenticated using (published = true);
create policy "Admins manage projects" on public.projects for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Public can read published studio proofs" on public.studio_proofs for select to anon, authenticated using (published = true);
create policy "Admins manage studio proofs" on public.studio_proofs for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Public can read published site content" on public.site_content for select to anon, authenticated using (published = true);
create policy "Admins manage site content" on public.site_content for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Public can read public settings only" on public.site_settings for select to anon, authenticated using (setting_key like 'public.%');
create policy "Admins manage settings" on public.site_settings for all to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Admins read enquiries" on public.enquiries for select to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Admins update enquiries" on public.enquiries for update to authenticated using ((select auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin');
revoke all on public.enquiries from anon, authenticated;
grant insert on public.enquiries to service_role;
grant select on public.projects, public.studio_proofs, public.site_content, public.site_settings to anon, authenticated;
grant insert, update, delete on public.projects, public.studio_proofs, public.site_content, public.site_settings to authenticated;
grant select, update on public.enquiries to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('mfs-media','mfs-media',true,5242880,array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml'])
on conflict (id) do nothing;
create policy "Public can read published MFS media" on storage.objects for select to anon, authenticated using (bucket_id = 'mfs-media');
create policy "Admins upload MFS media" on storage.objects for insert to authenticated with check (bucket_id = 'mfs-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Admins update MFS media" on storage.objects for update to authenticated using (bucket_id = 'mfs-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin') with check (bucket_id = 'mfs-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Admins delete MFS media" on storage.objects for delete to authenticated using (bucket_id = 'mfs-media' and (select auth.jwt()->'app_metadata'->>'role') = 'admin');
