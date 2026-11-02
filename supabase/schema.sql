-- Jalankan di Supabase > SQL Editor
create table profile (
  id int primary key default 1, name text, role text, tagline text, about text, skills text,
  email text, whatsapp text, cv_url text
);
create table projects (
  id bigint generated always as identity primary key, sort int default 0,
  title text, category text, year text, cover_url text, description text
);
insert into profile (id, name, role) values (1, 'Paulus Sianipar', 'Creative Designer');
alter table profile enable row level security;
alter table projects enable row level security;
create policy "publik baca profile" on profile for select using (true);
create policy "publik baca projects" on projects for select using (true);
create policy "admin kelola profile" on profile for all to authenticated using (true) with check (true);
create policy "admin kelola projects" on projects for all to authenticated using (true) with check (true);
-- Buat user admin: Supabase > Authentication > Users > Add user (email + password).
-- Matikan "Allow new users to sign up" agar hanya Anda yang bisa login.
-- Jika tabel profile sudah dibuat sebelumnya, jalankan: alter table profile add column if not exists whatsapp text, add column if not exists cv_url text;
