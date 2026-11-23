alter table public.academy_waitlist
  drop constraint if exists academy_waitlist_course_check;

alter table public.academy_waitlist
  add constraint academy_waitlist_course_check
  check (course in ('ai', 'ai_ml'));
