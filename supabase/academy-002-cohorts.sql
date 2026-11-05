-- PractiCode Academy: cohorts, free registration, course prices and the administrator console.
-- Applied by hand after academy.sql (SQL editor or execute_sql), outside Learn's migration history.
-- Safe to run again. Row-level security is on with no policies: only the server, with the secret key,
-- can read or write these tables.

-- Cohorts. Exactly one is "current": the public forms tag every sign-up with it.
create table if not exists public.academy_cohorts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null unique check (char_length(name) between 3 and 80),
  starts_on date,
  registration_open boolean not null default true,
  enrolment_open boolean not null default true,
  is_current boolean not null default false
);
create unique index if not exists academy_cohorts_one_current on public.academy_cohorts (is_current) where is_current;
alter table public.academy_cohorts enable row level security;

insert into public.academy_cohorts (name, starts_on, registration_open, enrolment_open, is_current)
select '2027 Cohort 1', null, true, true, true
where not exists (select 1 from public.academy_cohorts);

-- Courses and their fees (kobo, as Paystack takes them). The site falls back to the same values in code.
create table if not exists public.academy_courses (
  id text primary key check (id in ('fe', 'da', 'ux', 'cs', 'dm', 'ai')),
  title text not null check (char_length(title) between 2 and 80),
  fee_kobo integer check (fee_kobo > 0),
  live boolean not null default true,
  sort smallint not null default 0
);
alter table public.academy_courses enable row level security;

insert into public.academy_courses (id, title, fee_kobo, live, sort) values
  ('fe', 'Front-End Web Development', 12000000, true, 1),
  ('da', 'Data Analysis', 10000000, true, 2),
  ('ux', 'UI/UX Design', 8000000, true, 3),
  ('cs', 'Cybersecurity', 14000000, true, 4),
  ('dm', 'Digital Marketing', 7000000, true, 5),
  ('ai', 'AI & Machine Learning', null, false, 6)
on conflict (id) do nothing;

-- One row of academy-wide settings.
create table if not exists public.academy_settings (
  id smallint primary key default 1 check (id = 1),
  siwes_discount_percent smallint not null default 20 check (siwes_discount_percent between 0 and 100),
  siwes_admin_fee_kobo integer not null default 1000000 check (siwes_admin_fee_kobo >= 0)
);
alter table public.academy_settings enable row level security;
insert into public.academy_settings (id) values (1) on conflict (id) do nothing;

-- Free registration: interest in a cohort, before any payment.
create table if not exists public.academy_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  cohort_id uuid not null references public.academy_cohorts (id) on delete restrict,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  whatsapp text not null check (char_length(whatsapp) between 7 and 20),
  course text not null references public.academy_courses (id),
  attendance text not null check (attendance in ('in_person', 'online')),
  city text not null check (char_length(city) between 2 and 80),
  state text not null check (char_length(state) between 2 and 80),
  siwes boolean not null default false,
  heard_from text check (char_length(heard_from) <= 80),
  consent boolean not null default true,
  status text not null default 'new' check (status in ('new', 'contacted', 'in_group', 'enrolled', 'withdrawn')),
  notes text check (char_length(notes) <= 4000),
  unique (cohort_id, email)
);
create index if not exists academy_registrations_cohort on public.academy_registrations (cohort_id, created_at desc);
alter table public.academy_registrations enable row level security;

-- Enrolments: link to a cohort, accept the new courses, and allow admin notes.
alter table public.academy_enrolments add column if not exists cohort_id uuid references public.academy_cohorts (id) on delete restrict;
alter table public.academy_enrolments add column if not exists notes text check (char_length(notes) <= 4000);
alter table public.academy_enrolments drop constraint if exists academy_enrolments_course_check;
alter table public.academy_enrolments add constraint academy_enrolments_course_check check (course in ('fe', 'da', 'ux', 'cs', 'dm'));
create index if not exists academy_enrolments_cohort on public.academy_enrolments (cohort_id, created_at desc);
update public.academy_enrolments set cohort_id = (select id from public.academy_cohorts where is_current) where cohort_id is null;

-- Administrator console: an allow-list, one-time sign-in codes, sessions and an audit log.
create table if not exists public.academy_admins (
  email text primary key check (email = lower(email) and char_length(email) <= 254),
  created_at timestamptz not null default now()
);
alter table public.academy_admins enable row level security;
insert into public.academy_admins (email) values ('idrisaloma120@gmail.com'), ('practicodeacademy@gmail.com')
on conflict (email) do nothing;

create table if not exists public.academy_admin_codes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts smallint not null default 0,
  used_at timestamptz
);
create index if not exists academy_admin_codes_email on public.academy_admin_codes (email, created_at desc);
alter table public.academy_admin_codes enable row level security;

create table if not exists public.academy_admin_sessions (
  token_hash text primary key,
  email text not null references public.academy_admins (email) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
alter table public.academy_admin_sessions enable row level security;

create table if not exists public.academy_admin_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  email text not null,
  action text not null,
  target_table text,
  target_id text,
  detail jsonb
);
create index if not exists academy_admin_log_created on public.academy_admin_log (created_at desc);
alter table public.academy_admin_log enable row level security;
