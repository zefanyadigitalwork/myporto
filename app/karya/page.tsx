import { getContent } from "@/lib/content";
import { Works } from "@/components/works";
import { SiteShell } from "@/components/site-shell";

export const revalidate = 60;

export default async function WorksPage() {
  const { profile, projects } = await getContent();

  return (
    <SiteShell name={profile.name} role={profile.role} email={profile.email}>
      <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-16 md:px-14 md:py-24">
        <p className="mb-3 text-xs uppercase tracking-[.22em] text-wine">Portofolio</p>
        <h1 className="font-serif text-6xl md:text-7xl">Karya</h1>
        <p className="mb-12 mt-5 max-w-2xl leading-7 text-ink/65">Kumpulan proyek pilihan dalam berbagai bidang kreatif. Pilih kategori untuk menjelajahi karya.</p>
        <Works projects={projects} />
      </main>
    </SiteShell>
  );
}
