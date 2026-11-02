"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import type { Profile, Project } from "@/lib/content";
const pf: (keyof Profile)[] = ["name", "role", "tagline", "about", "skills", "email", "whatsapp", "cv_url"];
const inp = "w-full border border-ink/30 bg-white px-3 py-2 text-sm";
export default function Admin() {
  const [ok, setOk] = useState(false); const [msg, setMsg] = useState("");
  const [cred, setCred] = useState({ email: "", password: "" });
  const [profile, setProfile] = useState<Partial<Profile>>({}); const [projects, setProjects] = useState<Project[]>([]);
  const [np, setNp] = useState({ title: "", category: "", year: "", cover_url: "", description: "" });
  const load = async () => {
    if (!supabase) return;
    const { data: s } = await supabase.auth.getSession(); setOk(!!s.session); if (!s.session) return;
    setProfile((await supabase.from("profile").select("*").eq("id", 1).maybeSingle()).data ?? {});
    setProjects(((await supabase.from("projects").select("*").order("sort")).data ?? []) as Project[]);
  };
  useEffect(() => { load(); }, []);
  if (!supabase) return <p className="p-10">Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local terlebih dahulu.</p>;
  const sb = supabase;
  const login = async () => {
    const { error } = await sb.auth.signInWithPassword(cred);
    if (error) {
      setMsg(error.message);
      return;
    }
    setMsg("");
    await load();
  };
  const saveProfile = async () => { const { error } = await sb.from("profile").upsert({ ...profile, id: 1 }); setMsg(error ? error.message : "Profil tersimpan."); };
  const add = async () => { if (!np.title) return setMsg("Judul wajib diisi."); const { error } = await sb.from("projects").insert({ ...np, sort: projects.length }); setMsg(error ? error.message : "Karya ditambahkan."); setNp({ title: "", category: "", year: "", cover_url: "", description: "" }); load(); };
  const del = async (id: string | number) => { await sb.from("projects").delete().eq("id", id); load(); };
  if (!ok) return (
    <main className="mx-auto max-w-sm space-y-3 p-6 sm:p-10"><h1 className="font-serif text-4xl">Masuk admin</h1>
      <p className="text-sm leading-6 text-ink/70">
        Belum punya akun? Buat di Supabase: <strong>Authentication → Users → Add user → Create new user</strong>.
        Pilih <strong>Create new user</strong>, bukan <strong>Invite user</strong>, agar tidak perlu mengirim email konfirmasi.
      </p>
      <input className={inp} placeholder="Email" onChange={(e) => setCred({ ...cred, email: e.target.value })} />
      <input className={inp} type="password" placeholder="Password" onChange={(e) => setCred({ ...cred, password: e.target.value })} />
      <Button variant="dark" onClick={login}>Masuk</Button><p role="status" className="text-sm text-wine">{msg}</p></main>);
  return (
    <main className="mx-auto max-w-3xl space-y-12 p-6 md:p-10">
      <div className="flex justify-between"><h1 className="font-serif text-4xl">Kelola konten</h1><a href="/" className="text-sm underline">Lihat situs</a></div>
      <p className="text-sm text-wine">{msg}</p>
      <section className="space-y-3"><h2 className="font-serif text-2xl">Profil</h2>
        {pf.map((k) => <label key={k} className="block text-sm capitalize">{k}<textarea rows={k === "about" ? 4 : 1} className={inp} value={profile[k] ?? ""} onChange={(e) => setProfile({ ...profile, [k]: e.target.value })} /></label>)}
        <Button variant="dark" onClick={saveProfile}>Simpan profil</Button></section>
      <section className="space-y-3"><h2 className="font-serif text-2xl">Karya</h2>
        {projects.map((p) => <div key={p.id} className="flex items-center justify-between border-b border-ink/20 py-2 text-sm"><span>{p.title} ({p.category}, {p.year})</span><button className="text-wine underline" onClick={() => del(p.id)}>Hapus</button></div>)}
        {(["title", "category", "year", "cover_url", "description"] as const).map((k) => <input key={k} className={inp} placeholder={k === "cover_url" ? "cover_url (link gambar)" : k} value={np[k]} onChange={(e) => setNp({ ...np, [k]: e.target.value })} />)}
        <Button variant="dark" onClick={add}>Tambah karya</Button></section>
      <Button variant="outline" onClick={async () => { await sb.auth.signOut(); setOk(false); }}>Keluar</Button>
    </main>);
}
