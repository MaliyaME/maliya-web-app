alter table if exists reg.waitlist_signups
  drop column if exists platform,
  drop column if exists emirate;
