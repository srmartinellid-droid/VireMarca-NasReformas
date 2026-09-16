import Link from "next/link";

export default function AdminConteudoPage() {
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/dashboard" className="text-sm text-navy-600 hover:underline mb-4 inline-block">
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-navy-900 mb-2">Conteúdo</h1>
        <p className="text-stone-600 mb-8">
          Edição de hero, textos de seções, serviços, sobre, CTA e região.
        </p>
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500">
          Conteúdo estrutural está em <code>src/lib/site.ts</code>.  
          Para CMS dinâmico, use a tabela <code>site_content</code>.
        </div>
      </div>
    </div>
  );
}
