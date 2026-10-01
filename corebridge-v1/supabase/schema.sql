-- CoreBridge V1 database foundation for Supabase Free tier.
-- Run this in Supabase SQL Editor after creating/using your project.

create extension if not exists pgcrypto;

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  opportunity_code text unique not null,
  title text not null,
  country text not null,
  location text,
  work_type text default 'On-site',
  status text default 'Open',
  description text,
  requirements text,
  support_details text,
  created_at timestamptz default now()
);

create table if not exists public.candidate_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  age integer,
  country text,
  city text,
  phone text,
  email text,
  occupation text,
  experience integer,
  english_level text,
  relocate text,
  opportunity_id text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);

create table if not exists public.partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  contact_person text not null,
  country text,
  phone text,
  email text,
  website text,
  type text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);

create table if not exists public.business_inquiries (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_person text not null,
  country text,
  email text,
  phone text,
  need text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  phone text,
  email text not null,
  inquiry_type text,
  message text not null,
  created_at timestamptz default now()
);

-- Seed the existing opportunity reference used by the V1 page.
insert into public.opportunities (opportunity_code,title,country,location,work_type,status,description,requirements)
values ('CB-MX-TH-TC-001','Outbound Telecaller','Thailand','Tak Province','On-site','Open','International customer communication and outbound calling role.','Clear English communication; confident speaking; ability to work on-site.')
on conflict (opportunity_code) do nothing;

-- Public submissions need INSERT access. Keep admin/update policies private until authentication is added.
alter table public.candidate_applications enable row level security;
alter table public.partner_inquiries enable row level security;
alter table public.business_inquiries enable row level security;
alter table public.contact_messages enable row level security;
alter table public.opportunities enable row level security;

create policy "public can submit candidate applications" on public.candidate_applications for insert to anon with check (true);
create policy "public can submit partner inquiries" on public.partner_inquiries for insert to anon with check (true);
create policy "public can submit business inquiries" on public.business_inquiries for insert to anon with check (true);
create policy "public can submit contact messages" on public.contact_messages for insert to anon with check (true);
create policy "public can read open opportunities" on public.opportunities for select to anon using (status = 'Open');
