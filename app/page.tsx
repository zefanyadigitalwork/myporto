import Link from "next/link";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/site-shell";
import { buttonClass } from "@/components/ui/button";

export const revalidate = 0;

const artworkStyles = [
  { background: "bg-[#d9c7aa]", circle: "bg-[#b06d4d]", block: "bg-[#35483e]", text: "text-[#f4f1ea]" },
  { background: "bg-[#c6d1c5]", circle: "bg-[#b49a6c]", block: "bg-[#263c43]", text: "text-[#f4f1ea]" },
  { background: "bg-[#d4c8bd]", circle: "bg-[#758a78]", block: "bg-[#9a5945]", text: "text-[#f4f1ea]" },
];

function ProjectArtwork({ project, index }: { project: { title: string; cover_url: string }; index: number }) {
  const style = artworkStyles[index % artworkStyles.length];

  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${style.background}`}>
      {project.cover_url ? (
        <img src={project.cover_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <>
          <div className={`absolute -right-[12%] -top-[28%] h-[82%] aspect-square rounded-full ${style.circle} transition-transform duration-700 group-hover:scale-110`} />
          <div className={`absolute -bottom-[17%] left-[12%] h-[75%] w-[48%] rotate-[-12deg] ${style.block} transition-transform duration-700 group-hover:rotate-[-7deg]`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-serif text-[clamp(7rem,18vw,13rem)] leading-none ${style.text}`}>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <span className="absolute left-5 top-5 text-[10px] uppercase tracking-[.24em] text-[#202523]/75">Selected work · {project.title}</span>
        </>
      )}
      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-stone text-lg text-ink transition-transform duration-300 group-hover:rotate-45" aria-hidden="true">↗</span>
    </div>
  );
}

export default async function Home() {
  const { profile, projects } = await getContent();
  const featuredProject = projects[0];
  const selectedProjects = projects.slice(0, 3);
  const nameParts = profile.name.trim().split(/\s+/);
  const firstName = nameParts.shift() ?? profile.name;
  const lastName = nameParts.join(" ");
  const skills = profile.skills.split(",").map((skill) => skill.trim()).filter(Boolean).slice(0, 4);

  return (
    <SiteShell profile={profile}>
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-14 md:px-14 md:pb-28 md:pt-20">
          <div className="pointer-events-none absolute -right-36 top-12 h-[28rem] w-[28rem] rounded-full border border-brass/20 md:right-0" />
          <div className="pointer-events-none absolute -right-20 top-28 h-[20rem] w-[20rem] rounded-full border border-brass/20 md:right-16" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_.95fr] md:gap-12 lg:gap-16">
            <div className="relative z-10">
              <p className="rise flex items-center gap-3 text-xs uppercase tracking-[.24em] text-wine">
                <span className="h-px w-8 bg-brass" /> {profile.role}
              </p>
              <h1 className="rise mt-7 font-serif text-[clamp(4.5rem,10vw,8.5rem)] font-medium leading-[.78] tracking-[-.055em] [animation-delay:.1s]">
                <span className="block">{firstName}</span>
                {lastName && <span className="mt-3 block text-pine-foreground">{lastName}</span>}
                <span className="mt-5 block font-sans text-sm font-medium tracking-[.2em] text-ink/45 md:text-base">{profile.home_kicker}</span>
              </h1>
              <p className="rise mt-8 max-w-md font-serif text-xl leading-relaxed text-ink/65 [animation-delay:.2s] md:text-2xl">
                {profile.tagline}
              </p>
              <div className="rise mt-8 flex flex-wrap items-center gap-5 [animation-delay:.3s]">
                <Link href="/karya" className={buttonClass("dark")}>{profile.home_primary_link} <span aria-hidden="true" className="ml-3">↗</span></Link>
                <Link href="/tentang" className="border-b border-brass pb-1 text-sm transition-colors hover:text-wine">{profile.home_secondary_link}</Link>
              </div>
            </div>

            {featuredProject && (
              <Link href="/karya" className="group relative mx-auto block w-full max-w-[34rem] md:mt-4">
                <div className="relative z-10 rotate-[2deg] overflow-hidden bg-pine p-3 shadow-[0_28px_70px_rgba(32,37,35,.18)] transition-transform duration-500 group-hover:rotate-0 sm:p-4">
                  <div className="relative aspect-[4/4.5] overflow-hidden bg-[#d9c7aa]">
                    {featuredProject.cover_url ? (
                      <img src={featuredProject.cover_url} alt={featuredProject.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <>
                        <div className="absolute -right-[10%] -top-[18%] h-[68%] aspect-square rounded-full bg-[#b06d4d]" />
                        <div className="absolute -bottom-[10%] left-[12%] h-[72%] w-[50%] rotate-[-14deg] bg-[#35483e]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-[clamp(9rem,20vw,16rem)] leading-none text-[#f4f1ea]">P</span>
                        </div>
                        <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-[#202523]/75">
                          <span className="h-2 w-2 rounded-full bg-wine" /> {profile.home_kicker}
                        </div>
                      </>
                    )}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#202523]/90 to-transparent p-5 pt-16 text-stone-foreground sm:p-7 sm:pt-20">
                      <div>
                        <p className="text-xs uppercase tracking-[.2em] text-brass">{featuredProject.category} · {featuredProject.year}</p>
                        <p className="mt-2 font-serif text-2xl sm:text-3xl">{featuredProject.title}</p>
                      </div>
                      <span className="mb-1 text-xl" aria-hidden="true">↗</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 text-[10px] uppercase tracking-[.2em] text-stone-foreground/80">
                    <span>{profile.home_projects_kicker}</span><span>01 / {String(projects.length).padStart(2, "0")}</span>
                  </div>
                </div>
                <span className="absolute -bottom-5 -left-5 z-20 hidden -rotate-6 bg-brass px-5 py-3 font-serif text-lg text-brass-foreground shadow-lg sm:block">Made with intention</span>
              </Link>
            )}
          </div>
          <div className="mx-auto mt-16 flex max-w-6xl items-center justify-between border-t border-ink/10 pt-5 text-[10px] uppercase tracking-[.2em] text-ink/45 md:mt-20">
            <span>{profile.home_projects_kicker}</span><span className="hidden sm:block">{profile.home_kicker}</span><span>01 — 04</span>
          </div>
        </section>

        <section className="bg-surface px-6 py-20 md:px-14 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5 md:mb-14">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[.22em] text-wine">{profile.home_projects_kicker}</p>
                <h2 className="font-serif text-5xl leading-none md:text-7xl">{profile.home_projects_heading}<span className="text-brass">.</span></h2>
              </div>
              <Link href="/karya" className="group flex items-center gap-3 border-b border-brass pb-2 text-sm">{profile.home_projects_link} <span className="transition-transform group-hover:translate-x-1">→</span></Link>
            </div>
            <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {selectedProjects.map((project, index) => (
                <Link key={project.id} href="/karya" className={`group block ${index === 1 ? "sm:mt-12" : ""}`}>
                  <ProjectArtwork project={project} index={index} />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[.2em] text-wine">{project.category} <span className="mx-1 text-brass">/</span> {project.year}</p>
                      <h3 className="mt-2 font-serif text-2xl transition-colors group-hover:text-wine">{project.title}</h3>
                    </div>
                    <span className="mt-2 text-sm text-ink/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-14 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[.22em] text-wine">{profile.home_about_kicker}</p>
              <h2 className="font-serif text-5xl leading-[.98] md:text-6xl">{profile.home_about_heading}</h2>
              <Link href="/tentang" className="group mt-8 inline-flex items-center gap-3 border-b border-brass pb-2 text-sm">{profile.home_about_link} <span className="transition-transform group-hover:translate-x-1">→</span></Link>
            </div>
            <div className="md:pt-10">
              <p className="max-w-2xl text-lg leading-8 text-ink/70">{profile.about}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {skills.map((skill) => <li key={skill} className="border border-ink/15 px-3 py-2 text-xs text-ink/70">{skill}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-pine px-6 py-16 text-stone-foreground md:px-14 md:py-20">
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[.22em] text-brass">{profile.home_cta_kicker}</p>
              <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-6xl">{profile.home_cta_heading}</h2>
            </div>
            <Link href="/kontak" className="group inline-flex items-center gap-5 border border-stone/40 px-6 py-4 text-sm transition-colors hover:border-brass hover:bg-brass hover:text-brass-foreground">
              {profile.home_cta_link} <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
