-- ============================================================================
-- Dhitya Portfolio V2 — Author Studio Supabase Schema & RLS Policies
-- Paste and run this once in Supabase Dashboard -> SQL Editor
-- ============================================================================

-- 1. Blender 3D Showcase & Archive Items
create table if not exists public.portfolio_renders (
  id text primary key,
  category text not null check (category in ('environment', 'character', 'architecture', 'prop', 'animation')),
  category_label_en text not null,
  category_label_id text not null,
  title_en text not null,
  title_id text not null,
  desc_en text not null,
  desc_id text not null,
  image text not null,
  images jsonb not null default '[]'::jsonb,
  video text,
  render_engine text not null default 'Cycles' check (render_engine in ('Cycles', 'Eevee')),
  blender_version text default 'Blender 5.3',
  year text not null default '2026',
  tags jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

-- 2. Web & 3D Projects (Outer card + Case Study Modal)
create table if not exists public.portfolio_projects (
  id text primary key,
  categories jsonb not null default '["web"]'::jsonb,
  featured boolean not null default true,
  visual_type text not null default 'orbitry' check (visual_type in ('cytune', 'grainox', 'orbitry', 'filra', 'bookshelf')),
  en jsonb not null,
  id_lang jsonb not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

-- 3. Profile, Experience & Skills Document (single row id = 'main')
create table if not exists public.portfolio_profile (
  id text primary key default 'main',
  quick_profile jsonb not null,
  experiences jsonb not null default '[]'::jsonb,
  skill_categories jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 4. Visitor Analytics / Page Views
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  session_id text not null,
  device_type text not null default 'desktop',
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists idx_page_views_created_at on public.page_views (created_at desc);
create index if not exists idx_page_views_path on public.page_views (path);

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

alter table public.portfolio_renders enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_profile enable row level security;
alter table public.page_views enable row level security;

-- Public Read Access for Portfolio Data
create policy "Public read renders" on public.portfolio_renders for select using (true);
create policy "Public read projects" on public.portfolio_projects for select using (true);
create policy "Public read profile" on public.portfolio_profile for select using (true);

-- Authenticated Author Write Access
create policy "Author write renders" on public.portfolio_renders for all to authenticated using (true) with check (true);
create policy "Author write projects" on public.portfolio_projects for all to authenticated using (true) with check (true);
create policy "Author write profile" on public.portfolio_profile for all to authenticated using (true) with check (true);

-- Visitor Analytics: Public can insert views; only authenticated Author can read analytics
create policy "Public insert page_views" on public.page_views for insert to anon, authenticated with check (true);
create policy "Author read page_views" on public.page_views for select to authenticated using (true);

-- ============================================================================
-- Storage Bucket for Uploaded Photos & Videos
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public read portfolio-media"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

create policy "Author upload portfolio-media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-media');

create policy "Author update portfolio-media"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio-media');

create policy "Author delete portfolio-media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-media');
