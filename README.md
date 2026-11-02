# Portofolio Creative Designer
Next.js 14 + Tailwind + shadcn/ui (gaya) + Supabase.

## Jalankan
1. `npm install`
2. Tanpa Supabase pun situs langsung tampil dengan placeholder: `npm run dev`
3. Edit placeholder cepat di `lib/content.ts`, ganti CV dengan menimpa `public/cv.pdf`, warna di `tailwind.config.ts`.

## Aktifkan manajemen konten (Supabase)
1. Buat project di supabase.com, jalankan `supabase/schema.sql` di SQL Editor.
2. Authentication > Users > Add user (email + password Anda). Matikan sign-up publik.
3. Salin `.env.example` ke `.env.local`, isi URL dan anon key.
4. Buka `/admin`, masuk, lalu ubah profil dan tambah/hapus karya. Situs menyegarkan data tiap 60 detik.

## Deploy
Push ke GitHub, impor ke Vercel, isi dua environment variable yang sama.

## Komponen shadcn tambahan
`npx shadcn@latest add dialog` dst. (components.json sudah disiapkan).
