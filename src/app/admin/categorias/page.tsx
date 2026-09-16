"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  display_order: number;
  published: boolean;
};

type Draft = Category;

export default function AdminCategoriasPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const s = createClient();
    const { data, error } = await s.from("categories").select("id,name,slug,description,image,display_order,published").order("display_order").order("id");
    if (error) {
      setMessage(`Não foi possível carregar as categorias: ${error.message}`);
      setLoading(false);
      return;
    }
    const next = (data ?? []) as Category[];
    setItems(next);
    setDrafts(Object.fromEntries(next.map((item) => [item.id, { ...item }])));
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  function slugify(value: string) {
    return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function updateDraft(id: number, changes: Partial<Draft>) {
    setDrafts((current) => ({ ...current, [id]: { ...current[id], ...changes } }));
  }

  async function saveCategory(id: number) {
    const draft = drafts[id];
    if (!draft) return;
    if (!draft.name.trim()) {
      setMessage("O nome da categoria não pode ficar vazio.");
      return;
    }
    setSavingId(id);
    setMessage("");
    const s = createClient();
    const { error } = await s.from("categories").update({ name: draft.name.trim(), slug: slugify(draft.name), description: draft.description?.trim() || "", display_order: draft.display_order, published: draft.published, image: draft.image || null }).eq("id", id);
    if (error) {
      setMessage(`Não foi possível salvar o card: ${error.message}`);
      setSavingId(null);
      return;
    }
    await load();
    setMessage("Card salvo e publicado na Área de atuação.");
    setSavingId(null);
  }

  async function uploadImage(id: number, file: File) {
    setUploadingId(id);
    setMessage("");
    const s = createClient();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `services/${id}-${crypto.randomUUID()}.${ext}`;
    const upload = await s.storage.from("site-media").upload(path, file, { contentType: file.type, upsert: false });
    if (upload.error) {
      setMessage(`Não foi possível enviar a imagem: ${upload.error.message}`);
      setUploadingId(null);
      return;
    }
    const { data } = s.storage.from("site-media").getPublicUrl(path);
    const { error } = await s.from("categories").update({ image: data.publicUrl }).eq("id", id);
    if (error) {
      setMessage(`A imagem foi enviada, mas não pôde ser vinculada ao card: ${error.message}`);
      setUploadingId(null);
      return;
    }
    await load();
    setMessage("Imagem salva e publicada no card.");
    setUploadingId(null);
  }

  async function removeImage(id: number) {
    setSavingId(id);
    setMessage("");
    const s = createClient();
    const { error } = await s.from("categories").update({ image: null }).eq("id", id);
    if (error) {
      setMessage(`Não foi possível remover a imagem: ${error.message}`);
      setSavingId(null);
      return;
    }
    await load();
    setMessage("Imagem removida do card.");
    setSavingId(null);
  }

  async function createCategory() {
    if (!name.trim()) return;
    setCreating(true);
    setMessage("");
    const s = createClient();
    const { error } = await s.from("categories").insert({ name: name.trim(), slug: slugify(name), description: description.trim(), display_order: items.length, published: true, image: null });
    if (error) {
      setMessage(`Não foi possível criar a categoria: ${error.message}`);
      setCreating(false);
      return;
    }
    setName("");
    setDescription("");
    await load();
    setMessage("Nova categoria criada e publicada.");
    setCreating(false);
  }

  async function removeCategory(item: Category) {
    if (!window.confirm(`Excluir definitivamente o card “${item.name}”?`)) return;
    setSavingId(item.id);
    setMessage("");
    const s = createClient();
    const { error } = await s.from("categories").delete().eq("id", item.id);
    if (error) {
      setMessage(`Não foi possível excluir: ${error.message}`);
      setSavingId(null);
      return;
    }
    await load();
    setMessage("Categoria excluída.");
    setSavingId(null);
  }

  async function moveCategory(item: Category, direction: -1 | 1) {
    const index = items.findIndex((current) => current.id === item.id);
    const target = items[index + direction];
    if (!target) return;
    setSavingId(item.id);
    setMessage("");
    const s = createClient();
    const first = await s.from("categories").update({ display_order: target.display_order }).eq("id", item.id);
    const second = await s.from("categories").update({ display_order: item.display_order }).eq("id", target.id);
    if (first.error || second.error) {
      setMessage(`Não foi possível reorganizar os cards: ${first.error?.message || second.error?.message}`);
      setSavingId(null);
      return;
    }
    await load();
    setMessage("Ordem dos cards atualizada.");
    setSavingId(null);
  }

  if (loading) return <div className="min-h-screen bg-stone-100 p-8 text-sm text-stone-500">Carregando categorias…</div>;

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <div><Link href="/admin/dashboard" className="text-xs font-semibold uppercase tracking-[.18em] text-stone-500">← Dashboard</Link><h1 className="mt-1 text-xl font-semibold tracking-tight text-navy-950 sm:text-2xl">Categorias · cards da home</h1></div>
          <Link href="/" className="shrink-0 text-sm font-semibold text-navy-700">Ver site ↗</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-7 px-5 py-7 sm:px-8 sm:py-9">
        {message && <div className="border border-stone-200 bg-white px-4 py-3 text-sm text-navy-900 shadow-sm">{message}</div>}

        <section className="border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-stone-400">Novo card</p>
          <h2 className="mt-1 text-xl font-semibold text-navy-950">Adicionar área de atuação</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-500">Cadastre o título e a descrição. A imagem pode ser inserida depois, exatamente como nos demais cards.</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.4fr_auto]"><Field label="Título" value={name} onChange={setName} placeholder="Ex.: Drywall e gesso" /><Field label="Descrição" value={description} onChange={setDescription} placeholder="Descrição curta exibida no card" /><button onClick={createCategory} disabled={creating || !name.trim()} className="h-11 rounded-lg bg-navy-900 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{creating ? "Criando…" : "Adicionar card"}</button></div>
        </section>

        <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-stone-400">Fonte única de verdade</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-navy-950">Cards da Área de atuação</h2></div><span className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-500">{items.length} {items.length === 1 ? "card" : "cards"}</span></div>

        <section className="space-y-6">
          {items.map((item, index) => {
            const draft = drafts[item.id] ?? item;
            const busy = savingId === item.id;
            const uploading = uploadingId === item.id;
            return (
              <article key={item.id} className="overflow-hidden border border-stone-200 bg-white shadow-sm">
                <div className="grid lg:grid-cols-[430px_1fr]">
                  <div className="relative min-h-[290px] bg-stone-200 sm:min-h-[350px]">
                    {draft.image ? <img src={draft.image} alt={draft.name} className="h-full min-h-[290px] w-full object-cover sm:min-h-[350px]" /> : <div className="grid min-h-[290px] place-items-center p-8 text-center text-sm text-stone-400 sm:min-h-[350px]">Nenhuma imagem cadastrada.<br />Insira uma foto para completar este card.</div>}
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/65 to-transparent p-4 pt-14"><label className="cursor-pointer rounded-md bg-white px-4 py-2.5 text-xs font-bold text-navy-900 shadow-sm">{uploading ? "Enviando…" : draft.image ? "Trocar imagem" : "Inserir imagem"}<input type="file" accept="image/*" className="hidden" disabled={uploading || busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(item.id, file); event.currentTarget.value = ""; }} /></label>{draft.image && <button type="button" onClick={() => void removeImage(item.id)} disabled={busy || uploading} className="rounded-md bg-black/70 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">Remover imagem</button>}</div>
                  </div>

                  <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-5"><div><span className="font-mono text-xs font-medium tracking-[.18em] text-stone-400">{String(index + 1).padStart(2, "0")}</span><p className={`mt-2 text-xs font-bold uppercase tracking-[.16em] ${draft.published ? "text-emerald-700" : "text-stone-400"}`}>{draft.published ? "Publicado na home" : "Oculto da home"}</p></div><div className="flex gap-1"><button type="button" onClick={() => void moveCategory(item, -1)} disabled={index === 0 || busy} aria-label="Mover card para cima" className="h-9 w-9 rounded border border-stone-200 text-sm text-stone-600 disabled:opacity-30">↑</button><button type="button" onClick={() => void moveCategory(item, 1)} disabled={index === items.length - 1 || busy} aria-label="Mover card para baixo" className="h-9 w-9 rounded border border-stone-200 text-sm text-stone-600 disabled:opacity-30">↓</button></div></div>
                    <div className="mt-6 grid gap-5"><Field label="Título do card" value={draft.name} onChange={(value) => updateDraft(item.id, { name: value })} /><Field label="Descrição do card" value={draft.description ?? ""} onChange={(value) => updateDraft(item.id, { description: value })} multiline /></div>
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-stone-100 pt-5"><label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-stone-700"><input type="checkbox" checked={draft.published} onChange={(event) => updateDraft(item.id, { published: event.target.checked })} /> Mostrar na home</label><div className="ml-auto flex flex-wrap gap-2"><button type="button" onClick={() => void removeCategory(item)} disabled={busy || uploading} className="rounded border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 disabled:opacity-50">Excluir categoria</button><button type="button" onClick={() => void saveCategory(item.id)} disabled={busy || uploading} className="rounded-lg bg-navy-900 px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50">{busy ? "Salvando…" : "Salvar card"}</button></div></div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {!items.length && <div className="border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">Ainda não existem categorias cadastradas.</div>}
      </main>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, multiline = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; multiline?: boolean }) {
  return <label className="block min-w-0"><span className="mb-2 block text-xs font-bold uppercase tracking-[.16em] text-stone-500">{label}</span>{multiline ? <textarea rows={4} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="w-full resize-y rounded-lg border border-stone-300 bg-white p-3 text-sm leading-6 text-navy-950 outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10" /> : <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-navy-950 outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10" />}</label>;
}
