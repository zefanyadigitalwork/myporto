import Link from "next/link";
import { getContent } from "@/lib/content";
import { SiteShell } from "@/components/site-shell";
import { buttonClass } from "@/components/ui/button";

export const revalidate = 0;

export default async function CvPage() {
  const { profile } = await getContent();

  return (
    <SiteShell profile={profile}>
      <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-16 md:px-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[.22em] text-wine">{profile.cv_kicker}</p>
            <h1 className="font-serif text-6xl md:text-7xl">{profile.cv_heading}</h1>
          </div>
          <Link href={profile.cv_url} download className={buttonClass("dark")}>{profile.cv_download_label}</Link>
        </div>
        <iframe src={profile.cv_url} title={`CV ${profile.name}`} className="h-[75vh] min-h-[480px] w-full border border-ink/15 bg-white" />
      </main>
    </SiteShell>
  );
}
