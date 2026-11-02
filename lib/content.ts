import { supabase } from "./supabase";
export type Project = { id: string | number; title: string; category: string; year: string; cover_url: string; description: string; sort: number };
export type Profile = {
  name: string; role: string; tagline: string; about: string; skills: string; email: string; whatsapp: string; cv_url: string;
  home_kicker: string; home_projects_kicker: string; home_projects_heading: string; home_projects_link: string;
  home_about_kicker: string; home_about_heading: string; home_about_link: string;
  home_cta_kicker: string; home_cta_heading: string; home_cta_link: string;
  home_primary_link: string; home_secondary_link: string;
  works_kicker: string; works_heading: string; works_description: string;
  header_home_label: string; header_works_label: string; header_about_label: string;
  header_cv_label: string; header_contact_label: string; header_cta_label: string;
  about_kicker: string; about_heading: string; about_skills_heading: string;
  cv_kicker: string; cv_heading: string; cv_download_label: string;
  contact_kicker: string; contact_heading: string; contact_description: string;
  footer_cta_kicker: string; footer_cta_heading: string; footer_cta_link: string; footer_description: string; footer_note: string;
};

// Placeholder: ganti di sini, atau lewat halaman /admin setelah Supabase terhubung.
export const placeholderProfile: Profile = {
  name: "Paulus Sianipar",
  role: "Creative Designer",
  tagline: "Kumpulan karya desain yang pernah saya kerjakan.",
  about: "Saya Paulus Sianipar, creative designer. Tulis 2–3 kalimat tentang latar belakang, pengalaman, dan gaya desain Anda. Tambahkan pendidikan atau pengalaman kerja yang ingin dilihat perekrut.",
  skills: "Branding, Layout Editorial, Ilustrasi, Motion Graphics, Photoshop, Illustrator, Figma",
  email: "paulussianipar@gmail.com", whatsapp: "081292759249", cv_url: "/cv.pdf",
  home_kicker: "DESIGNER · INDONESIA",
  home_projects_kicker: "Pilihan terbaru", home_projects_heading: "Karya terpilih", home_projects_link: "Jelajahi semua karya",
  home_about_kicker: "Di balik karya", home_about_heading: "Ide baik layak mendapat bentuk yang tepat.", home_about_link: "Tentang saya",
  home_cta_kicker: "Ada ide menarik?", home_cta_heading: "Mari ciptakan sesuatu yang berarti.", home_cta_link: "Mulai percakapan",
  home_primary_link: "Jelajahi karya", home_secondary_link: "Kenali saya",
  works_kicker: "Portofolio", works_heading: "Karya",
  works_description: "Kumpulan proyek pilihan dalam berbagai bidang kreatif. Pilih kategori untuk menjelajahi karya.",
  header_home_label: "Beranda", header_works_label: "Karya", header_about_label: "Tentang",
  header_cv_label: "CV", header_contact_label: "Kontak", header_cta_label: "Diskusi proyek",
  about_kicker: "Profil", about_heading: "Tentang saya", about_skills_heading: "Keahlian",
  cv_kicker: "Pengalaman & profil", cv_heading: "Curriculum Vitae", cv_download_label: "Unduh CV",
  contact_kicker: "Mari terhubung", contact_heading: "Punya ide untuk dikerjakan bersama?",
  contact_description: "Saya terbuka untuk proyek kreatif, kolaborasi, dan kesempatan baru. Silakan hubungi saya melalui salah satu kanal berikut.",
  footer_cta_kicker: "Ada ide yang ingin diwujudkan?", footer_cta_heading: "Mari buat sesuatu yang bermakna.",
  footer_cta_link: "Mulai percakapan", footer_description: "yang merancang pengalaman visual dengan perhatian pada detail dan makna.",
  footer_note: "Dibuat dengan ketelitian dan niat baik.",
};
export const placeholderProjects: Project[] = [
  { id: 1, title: "Judul Proyek Satu", category: "Branding", year: "2026", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya.", sort: 0 },
  { id: 2, title: "Judul Proyek Dua", category: "Editorial", year: "2025", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya.", sort: 1 },
  { id: 3, title: "Judul Proyek Tiga", category: "Packaging", year: "2025", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya.", sort: 2 },
  { id: 4, title: "Judul Proyek Empat", category: "Branding", year: "2024", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya.", sort: 3 },
  { id: 5, title: "Judul Proyek Lima", category: "Motion", year: "2024", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya.", sort: 4 },
  { id: 6, title: "Judul Proyek Enam", category: "Editorial", year: "2023", cover_url: "", description: "Deskripsi singkat: klien, peran Anda, dan hasilnya.", sort: 5 },
];
export async function getContent() {
  if (!supabase) return { profile: placeholderProfile, projects: placeholderProjects };
  try {
    const [p, pr] = await Promise.all([
      supabase.from("profile").select("*").limit(1).maybeSingle(),
      supabase.from("projects").select("*").order("sort", { ascending: true }),
    ]);
    if (p.error) console.error("Failed to load portfolio profile:", p.error.message);
    if (pr.error) console.error("Failed to load portfolio projects:", pr.error.message);
    return {
      profile: { ...placeholderProfile, ...Object.fromEntries(Object.entries(p.data ?? {}).filter(([, v]) => v !== null && v !== "")) } as Profile,
      projects: (pr.data?.length ? pr.data : placeholderProjects) as Project[],
    };
  } catch (error) {
    console.error("Failed to load portfolio content:", error);
    return { profile: placeholderProfile, projects: placeholderProjects };
  }
}
