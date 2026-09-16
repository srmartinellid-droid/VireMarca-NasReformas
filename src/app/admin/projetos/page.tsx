import Link from "next/link";

export default function AdminProjetosPage() {
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/dashboard" className="text-sm text-navy-600 hover:underline mb-4 inline-block">
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-navy-900 mb-2">Projetos</h1>
        <p className="text-stone-600 mb-8">
          CRUD de portfólio. Cada projeto pode ter título, descrição, categoria,
          localização, ano, capa, múltiplas imagens, destaque, ordem e status publicado.
        </p>
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500">
          <p>Lista e formulários de projetos serão alimentados pelo banco (Neon).</p>
          <p className="mt-2 text-sm">
            Após <code>db:push</code> e seed, implemente as Server Actions / API routes
            de create / update / delete / upload (Vercel Blob).
          </p>
        </div>
      </div>
    </div>
  );
}
