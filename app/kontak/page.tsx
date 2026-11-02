import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/site-shell";

export const revalidate = 0;

const waLink = (number: string) => `https://wa.me/${number.replace(/\D/g, "").replace(/^0/, "62")}`;

export default async function ContactPage() {
  const { profile } = await getContent();

  return (
    <SiteShell profile={profile}>
      <main className="min-h-[70vh] bg-pine px-6 py-20 text-stone-foreground md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs uppercase tracking-[.22em] text-brass">{profile.contact_kicker}</p>
          <h1 className="max-w-4xl font-serif text-6xl leading-[.95] md:text-8xl">{profile.contact_heading}</h1>
          <p className="mt-7 max-w-xl leading-7 text-stone-foreground/80">{profile.contact_description}</p>
          <dl className="mt-16 grid gap-10 border-t border-stone/20 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm uppercase tracking-[.18em] text-brass">Email</dt>
              <dd className="mt-3 break-all font-serif text-2xl md:text-3xl"><a href={`mailto:${profile.email}`} className="transition-colors hover:text-brass">{profile.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[.18em] text-brass">WhatsApp</dt>
              <dd className="mt-3 font-serif text-2xl md:text-3xl"><a href={waLink(profile.whatsapp)} target="_blank" rel="noreferrer" className="transition-colors hover:text-brass">{profile.whatsapp}</a></dd>
            </div>
          </dl>
        </div>
      </main>
    </SiteShell>
  );
}
