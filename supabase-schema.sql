-- ============================================================
-- Sign World Prints — Supabase Schema
-- Run this in: Supabase → SQL Editor → New Query → Run
-- ============================================================

-- Contact form submissions
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  read boolean default false,
  created_at timestamptz default now()
);

-- Chat sessions (one per visitor browser tab)
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  session_key text unique not null,
  visitor_name text default 'Visitor',
  started_at timestamptz default now(),
  has_unread boolean default false
);

-- Chat messages
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references chat_sessions(id) on delete cascade,
  sender text not null check (sender in ('visitor','admin')),
  text text not null,
  created_at timestamptz default now()
);

-- Admin-added portfolio projects
create table if not exists portfolio_custom (
  id serial primary key,
  title text not null,
  category text not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);

-- Default portfolio items hidden by admin
create table if not exists portfolio_hidden (
  default_id int primary key
);

-- Default portfolio items edited by admin
create table if not exists portfolio_edits (
  default_id int primary key,
  title text,
  description text,
  category text
);

-- Page view log (all devices)
create table if not exists page_views (
  id serial primary key,
  page text not null,
  created_at timestamptz default now()
);

-- ── Enable Realtime ──────────────────────────────────────────
-- (run these AFTER creating the tables)
alter publication supabase_realtime add table chat_messages;
alter publication supabase_realtime add table chat_sessions;
alter publication supabase_realtime add table messages;

-- ── Row Level Security: allow public reads/writes (admin-only via admin panel)
alter table messages          enable row level security;
alter table chat_sessions     enable row level security;
alter table chat_messages     enable row level security;
alter table portfolio_custom  enable row level security;
alter table portfolio_hidden  enable row level security;
alter table portfolio_edits   enable row level security;
alter table page_views        enable row level security;

-- Allow all operations via anon key (admin auth is handled in the app)
create policy "allow_all_messages"         on messages         for all using (true) with check (true);
create policy "allow_all_chat_sessions"    on chat_sessions    for all using (true) with check (true);
create policy "allow_all_chat_messages"    on chat_messages    for all using (true) with check (true);
create policy "allow_all_portfolio_custom" on portfolio_custom  for all using (true) with check (true);
create policy "allow_all_portfolio_hidden" on portfolio_hidden  for all using (true) with check (true);
create policy "allow_all_portfolio_edits"  on portfolio_edits   for all using (true) with check (true);
create policy "allow_all_page_views"       on page_views        for all using (true) with check (true);

-- ==========================================
-- STORAGE SUPABASE BUCKET FOR IMAGES
-- ==========================================

-- Create a public bucket for portfolio images
insert into storage.buckets (id, name, public) 
values ('portfolio_images', 'portfolio_images', true);

-- Allow public read access to images
create policy "Public Access" 
  on storage.objects for select 
  using ( bucket_id = 'portfolio_images' );

-- Allow anonymous uploads (for the admin panel)
create policy "Anon Insert" 
  on storage.objects for insert 
  with check ( bucket_id = 'portfolio_images' );
