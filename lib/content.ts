import { supabase } from "./supabase";
export type Project = { id: string | number; title: string; category: string; year: string; cover_url: string; description: string };
export type Profile = { name: string; role: string; tagline: string; about: string; skills: string; email: string; whatsapp: string; cv_url: string };

// Placeholder: ganti di sini, atau lewat halaman /admin setelah Supabase terhubung.
export const placeholderProfile: Profile = {
  name: "Paulus Sianipar",
  role: "Creative Designer",
  tagline: "Kumpulan karya desain yang pernah saya kerjakan.",
  about: "Saya Paulus Sianipar, creative designer. Tulis 2–3 kalimat tentang latar belakang, pengalaman, dan gaya desain Anda. Tambahkan pendidikan atau pengalaman kerja yang ingin dilihat perekrut.",
  skills: "Branding, Layout Editorial, Ilustrasi, Motion Graphics, Photoshop, Illustrator, Figma",
  email: "paulussianipar@gmail.com", whatsapp: "081292759249", cv_url: "/cv.pdf",
};
export const placeholderProjects: Project[] = [
  { id: 1, title: "Judul Proyek Satu", category: "Branding", year: "2026", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya." },
  { id: 2, title: "Judul Proyek Dua", category: "Editorial", year: "2025", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya." },
  { id: 3, title: "Judul Proyek Tiga", category: "Packaging", year: "2025", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya." },
  { id: 4, title: "Judul Proyek Empat", category: "Branding", year: "2024", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya." },
  { id: 5, title: "Judul Proyek Lima", category: "Motion", year: "2024", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya." },
  { id: 6, title: "Judul Proyek Enam", category: "Editorial", year: "2023", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya." },
];
export async function getContent() {
  if (!supabase) return { profile: placeholderProfile, projects: placeholderProjects };
  try {
    const [p, pr] = await Promise.all([
      supabase.from("profile").select("*").limit(1).maybeSingle(),
      supabase.from("projects").select("*").order("sort", { ascending: true }),
    ]);
    return { profile: { ...placeholderProfile, ...Object.fromEntries(Object.entries(p.data ?? {}).filter(([, v]) => v !== null && v !== "")) } as Profile, projects: (pr.data?.length ? pr.data : placeholderProjects) as Project[] };
  } catch { return { profile: placeholderProfile, projects: placeholderProjects }; }
}
