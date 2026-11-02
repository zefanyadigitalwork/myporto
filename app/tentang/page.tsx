import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/site-shell";

export const revalidate = 60;

export default async function AboutPage() {
  const { profile } = await getContent();
  const skills = profile.skills.split(",").map((skill) => skill.trim()).filter(Boolean);

  return (
    <SiteShell name={profile.name}>
      <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-16 md:px-14 md:py-24">
        <p className="mb-3 text-xs uppercase tracking-[.22em] text-wine">Profil</p>
        <h1 className="font-serif text-6xl md:text-7xl">Tentang saya</h1>
        <div className="mt-12 grid gap-14 md:grid-cols-[1.2fr_.8fr]">
          <section>
            <p className="font-serif text-3xl leading-snug text-pine">{profile.role}</p>
            <p className="mt-7 max-w-2xl whitespace-pre-line leading-8 text-ink/75">{profile.about}</p>
          </section>
          <section className="border-t border-brass/50 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <h2 className="font-serif text-3xl">Keahlian</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill) => <li key={skill} className="border border-ink/15 bg-white px-4 py-2 text-sm">{skill}</li>)}
            </ul>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
