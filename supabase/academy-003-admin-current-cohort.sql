-- PractiCode Academy: optional. Makes "set as current cohort" in the administrator console a single
-- transaction. Without it the console does the same in two steps and undoes the first if the second fails.
-- Applied by hand (SQL editor or execute_sql), like academy.sql. Safe to run again.

create or replace function public.academy_set_current_cohort(target uuid)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not exists (select 1 from public.academy_cohorts where id = target) then
    raise exception 'Unknown cohort %', target using errcode = 'P0002';
  end if;
  update public.academy_cohorts set is_current = false where is_current and id <> target;
  update public.academy_cohorts set is_current = true where id = target and not is_current;
end;
$$;

-- Only the server (secret key, service_role) may call it.
revoke all on function public.academy_set_current_cohort(uuid) from public, anon, authenticated;
grant execute on function public.academy_set_current_cohort(uuid) to service_role;
