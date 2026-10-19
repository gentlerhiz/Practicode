-- PractiCode Academy (practicode.tech): enrolments, contact messages and the AI waitlist.
-- These tables live in the Supabase project shared with PractiCode Learn. This file is applied by hand
-- (SQL editor or execute_sql) so it stays out of Learn's migration history. Safe to run again.
-- Row-level security is on with no policies: only the server, with the secret key, can read or write.

create table if not exists public.academy_enrolments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null check (char_length(email) <= 254),
  full_name text not null check (char_length(full_name) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 7 and 20),
  course text not null check (course in ('fe', 'da', 'ux')),
  siwes boolean not null default false,
  matric_number text check (char_length(matric_number) <= 40),
  level text check (char_length(level) <= 20),
  letter_path text,
  method text not null check (method in ('paystack', 'transfer')),
  amount_kobo integer not null check (amount_kobo > 0),
  status text not null default 'awaiting_payment'
    check (status in ('awaiting_payment', 'paid', 'transfer_submitted', 'confirmed', 'cancelled')),
  paystack_reference text unique,
  transfer_id text check (char_length(transfer_id) <= 80),
  receipt_path text,
  paid_at timestamptz,
  paid_amount_kobo integer,
  paid_channel text
);
create index if not exists academy_enrolments_created_at on public.academy_enrolments (created_at desc);
alter table public.academy_enrolments enable row level security;

create table if not exists public.academy_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  topic text not null check (topic in ('programmes', 'siwes', 'partner', 'other')),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  whatsapp text check (char_length(whatsapp) <= 20),
  message text not null check (char_length(message) between 5 and 4000)
);
alter table public.academy_messages enable row level security;

create table if not exists public.academy_waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  course text not null check (course in ('ai')),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  whatsapp text check (char_length(whatsapp) <= 20),
  unique (course, email)
);
alter table public.academy_waitlist enable row level security;

-- Receipts and introduction letters. Private: the academy reads them through short-lived signed links.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('academy-uploads', 'academy-uploads', false, 4194304, array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
