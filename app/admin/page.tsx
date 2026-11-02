"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { placeholderProfile, type Profile, type Project } from "@/lib/content";

type ProjectDraft = Omit<Project, "id">;
type MenuId = "home" | "works" | "about" | "cv" | "contact" | "header" | "footer";
type ProfileField = { key: keyof Profile; label: string; multiline?: boolean };
type EditorMenu = { id: MenuId; label: string; description: string; fields: ProfileField[] };

const editorMenus: EditorMenu[] = [
  {
    id: "home", label: "Beranda", description: "Atur teks pembuka dan setiap bagian di halaman beranda.",
    fields: [
      { key: "tagline", label: "Deskripsi singkat", multiline: true },
      { key: "home_kicker", label: "Label kecil di hero" },
      { key: "home_primary_link", label: "Tombol utama" },
      { key: "home_secondary_link", label: "Tautan kedua" },
      { key: "home_projects_kicker", label: "Label karya pilihan" },
      { key: "home_projects_heading", label: "Judul karya pilihan" },
      { key: "home_projects_link", label: "Tautan semua karya" },
      { key: "home_about_kicker", label: "Label bagian tentang" },
      { key: "home_about_heading", label: "Judul bagian tentang", multiline: true },
      { key: "home_about_link", label: "Tautan tentang" },
      { key: "home_cta_kicker", label: "Label ajakan" },
      { key: "home_cta_heading", label: "Judul ajakan", multiline: true },
      { key: "home_cta_link", label: "Tombol ajakan" },
    ],
  },
  {
    id: "works", label: "Karya", description: "Kelola daftar proyek, gambar, urutan, dan teks halaman karya.",
    fields: [
      { key: "works_kicker", label: "Label halaman" },
      { key: "works_heading", label: "Judul halaman" },
      { key: "works_description", label: "Deskripsi halaman", multiline: true },
    ],
  },
  {
    id: "about", label: "Tentang", description: "Edit profil, keahlian, serta judul halaman tentang.",
    fields: [
      { key: "about_kicker", label: "Label halaman" },
      { key: "about_heading", label: "Judul halaman" },
      { key: "about", label: "Deskripsi profil", multiline: true },
      { key: "skills", label: "Keahlian (pisahkan dengan koma)", multiline: true },
      { key: "about_skills_heading", label: "Judul daftar keahlian" },
    ],
  },
  {
    id: "cv", label: "CV", description: "Atur judul, tautan CV, atau unggah PDF baru.",
    fields: [
      { key: "cv_kicker", label: "Label halaman" },
      { key: "cv_heading", label: "Judul halaman" },
      { key: "cv_download_label", label: "Teks tombol unduh" },
      { key: "cv_url", label: "URL CV (PDF)" },
    ],
  },
  {
    id: "contact", label: "Kontak", description: "Kelola teks halaman kontak dan informasi yang dapat dihubungi.",
    fields: [
      { key: "contact_kicker", label: "Label halaman" },
      { key: "contact_heading", label: "Judul halaman", multiline: true },
      { key: "contact_description", label: "Deskripsi kontak", multiline: true },
      { key: "email", label: "Alamat email" },
      { key: "whatsapp", label: "Nomor WhatsApp" },
    ],
  },
  {
    id: "header", label: "Header", description: "Atur identitas dan label menu navigasi di bagian atas situs.",
    fields: [
      { key: "name", label: "Nama / identitas situs" },
      { key: "role", label: "Profesi / peran" },
      { key: "header_home_label", label: "Menu Beranda" },
      { key: "header_works_label", label: "Menu Karya" },
      { key: "header_about_label", label: "Menu Tentang" },
      { key: "header_cv_label", label: "Menu CV" },
      { key: "header_contact_label", label: "Menu Kontak" },
      { key: "header_cta_label", label: "Tombol kanan header" },
    ],
  },
  {
    id: "footer", label: "Footer", description: "Edit ajakan, deskripsi, dan catatan di footer seluruh halaman.",
    fields: [
      { key: "footer_cta_kicker", label: "Label ajakan footer" },
      { key: "footer_cta_heading", label: "Judul ajakan footer", multiline: true },
      { key: "footer_cta_link", label: "Teks tombol footer" },
      { key: "footer_description", label: "Deskripsi setelah profesi", multiline: true },
      { key: "footer_note", label: "Catatan paling bawah" },
    ],
  },
];

const emptyProject: ProjectDraft = {
  title: "", category: "", year: String(new Date().getFullYear()), cover_url: "", description: "", sort: 0,
};
const inputClass = "w-full border border-ink/20 bg-stone px-3 py-2.5 text-sm text-ink placeholder:text-ink/45 focus:border-brass focus:outline-none";
const cardClass = "space-y-5 border border-ink/10 bg-surface p-5 sm:p-7";

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [cred, setCred] = useState({ email: "", password: "" });
  const [profile, setProfile] = useState<Profile>(placeholderProfile);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeMenu, setActiveMenu] = useState<MenuId>("home");
  const [draft, setDraft] = useState<ProjectDraft>(emptyProject);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const sb = supabase;

  const load = async () => {
    if (!supabase) return;
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      setMsg(`Gagal memeriksa sesi: ${sessionError.message}`);
      setReady(true);
      return;
    }
    const signedIn = !!sessionData.session;
    setOk(signedIn);
    setReady(true);
    if (!signedIn) return;

    const [profileResult, projectsResult] = await Promise.all([
      supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("projects").select("*").order("sort", { ascending: true }),
    ]);
    const errors = [profileResult.error, projectsResult.error].filter(Boolean);
    if (errors.length) {
      setMsg(`Gagal memuat konten: ${errors.map((error) => error?.message).join(" · ")}`);
      return;
    }
    const savedProfile = Object.fromEntries(Object.entries(profileResult.data ?? {}).filter(([, value]) => value !== null && value !== ""));
    setProfile({ ...placeholderProfile, ...savedProfile } as Profile);
    setProjects((projectsResult.data ?? []) as Project[]);
  };

  useEffect(() => { void load(); }, []);

  if (!sb) {
    return <main className="mx-auto max-w-xl p-6 sm:p-10"><p>Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local terlebih dahulu.</p></main>;
  }

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await sb.auth.signInWithPassword(cred);
    if (error) {
      setMsg(error.message);
      setBusy(false);
      return;
    }
    setMsg("");
    await load();
    setBusy(false);
  };

  const saveProfile = async (changes: Partial<Profile> = profile) => {
    setBusy(true);
    const { error } = await sb.from("profile").upsert({ ...changes, id: 1 });
    setBusy(false);
    if (error) {
      setMsg(`Profil gagal disimpan: ${error.message}. Pastikan schema terbaru sudah dijalankan di Supabase.`);
      return false;
    }
    setProfile((current) => ({ ...current, ...changes }));
    setMsg("Perubahan profil berhasil disimpan.");
    return true;
  };

  const uploadAsset = async (file: File, folder: "cv" | "works") => {
    const maxSize = folder === "cv" ? 20 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setMsg(`Ukuran file maksimal ${folder === "cv" ? "20" : "10"} MB.`);
      return null;
    }
    if (folder === "cv" && file.type !== "application/pdf") {
      setMsg("File CV harus berformat PDF.");
      return null;
    }
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
    if (folder === "works" && !acceptedImageTypes.includes(file.type)) {
      setMsg("Cover karya harus berupa gambar JPG, PNG, WebP, AVIF, atau GIF.");
      return null;
    }
    const safeName = file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await sb.storage.from("portfolio-assets").upload(path, file, {
      cacheControl: "3600", contentType: file.type, upsert: false,
    });
    if (error) {
      setMsg(`Upload gagal: ${error.message}. Jalankan pengaturan bucket dari supabase/schema.sql.`);
      return null;
    }
    return sb.storage.from("portfolio-assets").getPublicUrl(path).data.publicUrl;
  };

  const uploadCv = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    const url = await uploadAsset(file, "cv");
    if (url) await saveProfile({ cv_url: url });
    else setBusy(false);
  };

  const uploadProjectCover = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    const url = await uploadAsset(file, "works");
    if (url) setDraft((current) => ({ ...current, cover_url: url }));
    setBusy(false);
  };

  const saveProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.title.trim()) {
      setMsg("Judul karya wajib diisi.");
      return;
    }
    setBusy(true);
    const result = editingId === null
      ? await sb.from("projects").insert(draft)
      : await sb.from("projects").update(draft).eq("id", editingId);
    if (result.error) {
      setMsg(`Karya gagal disimpan: ${result.error.message}`);
      setBusy(false);
      return;
    }
    const successMessage = editingId === null ? "Karya berhasil ditambahkan." : "Perubahan karya berhasil disimpan.";
    setDraft({ ...emptyProject, sort: projects.length });
    setEditingId(null);
    await load();
    setBusy(false);
    setMsg(successMessage);
  };

  const editProject = (project: Project) => {
    const { id, ...values } = project;
    setEditingId(id);
    setDraft({ ...emptyProject, ...values });
    setMsg(`Mengedit: ${project.title}`);
    document.getElementById("project-editor")?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteProject = async (project: Project) => {
    if (!window.confirm(`Hapus karya "${project.title}"?`)) return;
    setBusy(true);
    const { error } = await sb.from("projects").delete().eq("id", project.id);
    if (error) {
      setMsg(`Karya gagal dihapus: ${error.message}`);
      setBusy(false);
      return;
    }
    await load();
    setBusy(false);
    setMsg(`Karya "${project.title}" berhasil dihapus.`);
  };

  const startNewProject = () => {
    setEditingId(null);
    setDraft({ ...emptyProject, sort: projects.length });
    setMsg("");
    document.getElementById("project-editor")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!ready) return <main className="p-10 text-sm text-ink/70">Memeriksa sesi admin…</main>;

  if (!ok) {
    return (
      <main className="mx-auto max-w-md space-y-5 p-6 sm:p-10">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[.2em] text-wine">Portal pengelola</p>
          <h1 className="font-serif text-4xl">Masuk admin</h1>
        </div>
        <p className="text-sm leading-6 text-ink/70">
          Buat akun melalui Supabase: <strong>Authentication → Users → Add user → Create new user</strong>.
          Pilih <strong>Create new user</strong>, bukan <strong>Invite user</strong>.
        </p>
        <form className="space-y-3" onSubmit={login}>
          <label className="block space-y-1 text-sm">Email
            <input className={inputClass} type="email" autoComplete="username" required value={cred.email} onChange={(event) => setCred({ ...cred, email: event.target.value })} />
          </label>
          <label className="block space-y-1 text-sm">Password
            <input className={inputClass} type="password" autoComplete="current-password" required value={cred.password} onChange={(event) => setCred({ ...cred, password: event.target.value })} />
          </label>
          <Button variant="dark" disabled={busy}>{busy ? "Memeriksa…" : "Masuk"}</Button>
        </form>
        {msg && <p role="status" className="text-sm text-wine">{msg}</p>}
      </main>
    );
  }

  const activeEditor = editorMenus.find((menu) => menu.id === activeMenu) ?? editorMenus[0];
  const saveActiveEditor = () => {
    const changes = Object.fromEntries(activeEditor.fields.map(({ key }) => [key, profile[key]])) as Partial<Profile>;
    void saveProfile(changes);
  };

  return (
    <div className="min-h-screen bg-stone lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="border-b border-ink/10 bg-surface px-4 py-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
        <a href="/" className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center border border-pine/30 font-serif text-lg text-pine-foreground">
            {profile.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}
          </span>
          <span>
            <span className="block font-serif text-lg">{profile.name}</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[.2em] text-ink/55">Admin portal</span>
          </span>
        </a>

        <p className="mb-3 mt-8 hidden px-3 text-[10px] uppercase tracking-[.2em] text-ink/45 lg:block">Kelola halaman</p>
        <nav aria-label="Menu admin" className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-0 lg:flex-col lg:overflow-visible lg:pb-0">
          {editorMenus.map((menu, index) => (
            <button
              key={menu.id}
              type="button"
              aria-current={activeMenu === menu.id ? "page" : undefined}
              onClick={() => { setActiveMenu(menu.id); setMsg(""); }}
              className={`flex shrink-0 items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors lg:w-full ${activeMenu === menu.id ? "bg-pine text-stone-foreground" : "text-ink/80 hover:bg-pine/5 hover:text-pine-foreground"}`}
            >
              <span className={`flex h-7 w-7 items-center justify-center text-[10px] ${activeMenu === menu.id ? "bg-stone/15 text-brass" : "bg-ink/5 text-ink/75"}`}>{String(index + 1).padStart(2, "0")}</span>
              {menu.label}
            </button>
          ))}
        </nav>

        <div className="mt-7 hidden border-t border-ink/10 pt-5 lg:block">
          <a href="/" className="block px-3 py-2 text-sm text-ink/65 transition-colors hover:text-pine">↗ Lihat situs</a>
          <button type="button" disabled={busy} onClick={async () => { await sb.auth.signOut(); setOk(false); }} className="w-full px-3 py-2 text-left text-sm text-wine transition-colors hover:text-ink disabled:opacity-50">Keluar dari portal</button>
        </div>
      </aside>

      <main className="min-w-0 px-5 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-6">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[.2em] text-wine">Pengelola situs</p>
            <h1 className="font-serif text-4xl md:text-5xl">{activeEditor.label}</h1>
            <p className="mt-2 max-w-2xl text-sm text-ink/65">{activeEditor.description}</p>
          </div>
          <div className="flex gap-2 lg:hidden">
            <a href="/" className="border border-ink/20 px-3 py-2 text-xs">Lihat situs</a>
            <Button variant="outline" disabled={busy} onClick={async () => { await sb.auth.signOut(); setOk(false); }}>Keluar</Button>
          </div>
        </header>

        {msg && <p role="status" className="mb-6 border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-ink">{msg}</p>}

        {activeMenu === "works" ? (
          <div className="space-y-7">
            <section className={cardClass}>
              <h2 className="font-serif text-2xl">Teks halaman karya</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {activeEditor.fields.map(({ key, label, multiline }) => (
                  <label key={key} className={`block space-y-1.5 text-sm ${multiline ? "sm:col-span-2" : ""}`}>
                    {label}
                    {multiline
                      ? <textarea rows={3} className={inputClass} value={profile[key]} onChange={(event) => setProfile({ ...profile, [key]: event.target.value })} />
                      : <input className={inputClass} value={profile[key]} onChange={(event) => setProfile({ ...profile, [key]: event.target.value })} />}
                  </label>
                ))}
              </div>
              <Button variant="dark" disabled={busy} onClick={saveActiveEditor}>{busy ? "Menyimpan…" : "Simpan teks karya"}</Button>
            </section>

            <section className={cardClass}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl">Daftar karya</h2>
                  <p className="mt-2 text-sm text-ink/65">Atur detail, gambar cover, dan urutan tampil proyek.</p>
                </div>
                <Button variant="dark" disabled={busy} onClick={startNewProject}>Tambah karya</Button>
              </div>
              <div className="divide-y divide-ink/10">
                {projects.map((project) => (
                  <article key={project.id} className="flex flex-wrap items-center gap-4 py-4">
                    {project.cover_url
                      ? <img src={project.cover_url} alt="" className="h-16 w-16 object-cover" />
                      : <div className="flex h-16 w-16 items-center justify-center bg-pine font-serif text-2xl text-stone-foreground">{project.title.charAt(0)}</div>}
                    <div className="min-w-40 flex-1">
                      <h3 className="font-serif text-xl">{project.title}</h3>
                      <p className="mt-1 text-xs text-ink/60">{project.category} · {project.year} · urutan {project.sort}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" disabled={busy} onClick={() => editProject(project)}>Edit</Button>
                      <button type="button" disabled={busy} className="px-3 text-sm text-wine underline disabled:opacity-50" onClick={() => void deleteProject(project)}>Hapus</button>
                    </div>
                  </article>
                ))}
                {projects.length === 0 && <p className="py-5 text-sm text-ink/60">Belum ada karya tersimpan.</p>}
              </div>
              <form id="project-editor" className="scroll-mt-24 space-y-4 border-t border-ink/10 pt-6" onSubmit={saveProject}>
                <h3 className="font-serif text-2xl">{editingId === null ? "Tambah karya baru" : "Edit karya"}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-sm">Judul
                    <input className={inputClass} required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
                  </label>
                  <label className="space-y-1.5 text-sm">Kategori
                    <input className={inputClass} value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
                  </label>
                  <label className="space-y-1.5 text-sm">Tahun
                    <input className={inputClass} value={draft.year} onChange={(event) => setDraft({ ...draft, year: event.target.value })} />
                  </label>
                  <label className="space-y-1.5 text-sm">Urutan tampil (angka kecil tampil lebih dulu)
                    <input className={inputClass} type="number" min="0" value={draft.sort} onChange={(event) => setDraft({ ...draft, sort: Number(event.target.value) })} />
                  </label>
                  <label className="space-y-1.5 text-sm sm:col-span-2">URL gambar cover
                    <input className={inputClass} type="url" placeholder="https://…" value={draft.cover_url} onChange={(event) => setDraft({ ...draft, cover_url: event.target.value })} />
                  </label>
                  <label className="space-y-1.5 text-sm sm:col-span-2">Atau unggah gambar (maksimal 10 MB)
                    <input className={`${inputClass} file:mr-3 file:border-0 file:bg-pine file:px-3 file:py-2 file:text-stone-foreground`} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" disabled={busy} onChange={(event) => void uploadProjectCover(event.target.files?.[0])} />
                  </label>
                  {draft.cover_url && <img src={draft.cover_url} alt="Pratinjau cover karya" className="max-h-56 max-w-full object-contain sm:col-span-2" />}
                  <label className="space-y-1.5 text-sm sm:col-span-2">Deskripsi
                    <textarea className={inputClass} rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
                  </label>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="dark" disabled={busy}>{busy ? "Menyimpan…" : editingId === null ? "Simpan karya" : "Simpan perubahan karya"}</Button>
                  {editingId !== null && <Button variant="outline" type="button" disabled={busy} onClick={startNewProject}>Batal edit</Button>}
                </div>
              </form>
            </section>
          </div>
        ) : (
          <section className={cardClass}>
            <div className="grid gap-4 sm:grid-cols-2">
              {activeEditor.fields.map(({ key, label, multiline }) => (
                <label key={key} className={`block space-y-1.5 text-sm ${multiline ? "sm:col-span-2" : ""}`}>
                  {label}
                  {multiline
                    ? <textarea rows={4} className={inputClass} value={profile[key]} onChange={(event) => setProfile({ ...profile, [key]: event.target.value })} />
                    : <input className={inputClass} value={profile[key]} onChange={(event) => setProfile({ ...profile, [key]: event.target.value })} />}
                </label>
              ))}
            </div>
            {activeMenu === "cv" && (
              <label className="block space-y-1.5 text-sm">
                Unggah CV PDF (maksimal 20 MB)
                <input className={`${inputClass} file:mr-3 file:border-0 file:bg-pine file:px-3 file:py-2 file:text-stone-foreground`} type="file" accept="application/pdf,.pdf" disabled={busy} onChange={(event) => void uploadCv(event.target.files?.[0])} />
              </label>
            )}
            <Button variant="dark" disabled={busy} onClick={saveActiveEditor}>{busy ? "Menyimpan…" : `Simpan ${activeEditor.label}`}</Button>
          </section>
        )}
      </main>
    </div>
  );
}
