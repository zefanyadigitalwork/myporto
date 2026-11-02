-- Jalankan di Supabase > SQL Editor. Aman dijalankan ulang untuk memperbarui schema.
create table if not exists profile (
  id int primary key default 1,
  name text, role text, tagline text, about text, skills text,
  email text, whatsapp text, cv_url text,
  home_kicker text not null default 'DESIGNER · INDONESIA',
  home_projects_kicker text not null default 'Pilihan terbaru',
  home_projects_heading text not null default 'Karya terpilih',
  home_projects_link text not null default 'Jelajahi semua karya',
  home_about_kicker text not null default 'Di balik karya',
  home_about_heading text not null default 'Ide baik layak mendapat bentuk yang tepat.',
  home_about_link text not null default 'Tentang saya',
  home_cta_kicker text not null default 'Ada ide menarik?',
  home_cta_heading text not null default 'Mari ciptakan sesuatu yang berarti.',
  home_cta_link text not null default 'Mulai percakapan',
  home_primary_link text not null default 'Jelajahi karya',
  home_secondary_link text not null default 'Kenali saya',
  works_kicker text not null default 'Portofolio',
  works_heading text not null default 'Karya',
  works_description text not null default 'Kumpulan proyek pilihan dalam berbagai bidang kreatif. Pilih kategori untuk menjelajahi karya.',
  header_home_label text not null default 'Beranda',
  header_works_label text not null default 'Karya',
  header_about_label text not null default 'Tentang',
  header_cv_label text not null default 'CV',
  header_contact_label text not null default 'Kontak',
  header_cta_label text not null default 'Diskusi proyek',
  about_kicker text not null default 'Profil',
  about_heading text not null default 'Tentang saya',
  about_skills_heading text not null default 'Keahlian',
  cv_kicker text not null default 'Pengalaman & profil',
  cv_heading text not null default 'Curriculum Vitae',
  cv_download_label text not null default 'Unduh CV',
  contact_kicker text not null default 'Mari terhubung',
  contact_heading text not null default 'Punya ide untuk dikerjakan bersama?',
  contact_description text not null default 'Saya terbuka untuk proyek kreatif, kolaborasi, dan kesempatan baru. Silakan hubungi saya melalui salah satu kanal berikut.',
  footer_cta_kicker text not null default 'Ada ide yang ingin diwujudkan?',
  footer_cta_heading text not null default 'Mari buat sesuatu yang bermakna.',
  footer_cta_link text not null default 'Mulai percakapan',
  footer_description text not null default 'yang merancang pengalaman visual dengan perhatian pada detail dan makna.',
  footer_note text not null default 'Dibuat dengan ketelitian dan niat baik.'
);

create table if not exists projects (
  id bigint generated always as identity primary key,
  sort int not null default 0,
  title text, category text, year text, cover_url text, description text
);

-- Tambahkan field halaman ke tabel profile yang mungkin sudah ada.
alter table profile
  add column if not exists home_kicker text not null default 'DESIGNER · INDONESIA',
  add column if not exists home_projects_kicker text not null default 'Pilihan terbaru',
  add column if not exists home_projects_heading text not null default 'Karya terpilih',
  add column if not exists home_projects_link text not null default 'Jelajahi semua karya',
  add column if not exists home_about_kicker text not null default 'Di balik karya',
  add column if not exists home_about_heading text not null default 'Ide baik layak mendapat bentuk yang tepat.',
  add column if not exists home_about_link text not null default 'Tentang saya',
  add column if not exists home_cta_kicker text not null default 'Ada ide menarik?',
  add column if not exists home_cta_heading text not null default 'Mari ciptakan sesuatu yang berarti.',
  add column if not exists home_cta_link text not null default 'Mulai percakapan',
  add column if not exists home_primary_link text not null default 'Jelajahi karya',
  add column if not exists home_secondary_link text not null default 'Kenali saya',
  add column if not exists works_kicker text not null default 'Portofolio',
  add column if not exists works_heading text not null default 'Karya',
  add column if not exists works_description text not null default 'Kumpulan proyek pilihan dalam berbagai bidang kreatif. Pilih kategori untuk menjelajahi karya.',
  add column if not exists header_home_label text not null default 'Beranda',
  add column if not exists header_works_label text not null default 'Karya',
  add column if not exists header_about_label text not null default 'Tentang',
  add column if not exists header_cv_label text not null default 'CV',
  add column if not exists header_contact_label text not null default 'Kontak',
  add column if not exists header_cta_label text not null default 'Diskusi proyek',
  add column if not exists about_kicker text not null default 'Profil',
  add column if not exists about_heading text not null default 'Tentang saya',
  add column if not exists about_skills_heading text not null default 'Keahlian',
  add column if not exists cv_kicker text not null default 'Pengalaman & profil',
  add column if not exists cv_heading text not null default 'Curriculum Vitae',
  add column if not exists cv_download_label text not null default 'Unduh CV',
  add column if not exists contact_kicker text not null default 'Mari terhubung',
  add column if not exists contact_heading text not null default 'Punya ide untuk dikerjakan bersama?',
  add column if not exists contact_description text not null default 'Saya terbuka untuk proyek kreatif, kolaborasi, dan kesempatan baru. Silakan hubungi saya melalui salah satu kanal berikut.',
  add column if not exists footer_cta_kicker text not null default 'Ada ide yang ingin diwujudkan?',
  add column if not exists footer_cta_heading text not null default 'Mari buat sesuatu yang bermakna.',
  add column if not exists footer_cta_link text not null default 'Mulai percakapan',
  add column if not exists footer_description text not null default 'yang merancang pengalaman visual dengan perhatian pada detail dan makna.',
  add column if not exists footer_note text not null default 'Dibuat dengan ketelitian dan niat baik.';
alter table projects add column if not exists sort int not null default 0;

insert into profile (id, name, role)
values (1, 'Paulus Sianipar', 'Creative Designer')
on conflict (id) do nothing;

alter table profile enable row level security;
alter table projects enable row level security;

drop policy if exists "publik baca profile" on profile;
drop policy if exists "publik baca projects" on projects;
drop policy if exists "admin kelola profile" on profile;
drop policy if exists "admin kelola projects" on projects;
create policy "publik baca profile" on profile for select using (true);
create policy "publik baca projects" on projects for select using (true);
create policy "admin kelola profile" on profile for all to authenticated using (true) with check (true);
create policy "admin kelola projects" on projects for all to authenticated using (true) with check (true);

-- Bucket publik untuk CV dan cover karya. Upload hanya dapat dilakukan user yang login.
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;
drop policy if exists "portfolio assets public read" on storage.objects;
drop policy if exists "portfolio assets authenticated upload" on storage.objects;
create policy "portfolio assets public read" on storage.objects
  for select using (bucket_id = 'portfolio-assets');
create policy "portfolio assets authenticated upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio-assets');

-- Buat akun admin melalui Supabase > Authentication > Users > Add user > Create new user.
-- Matikan "Allow new users to sign up" agar hanya admin yang dibuat manual yang bisa login.
