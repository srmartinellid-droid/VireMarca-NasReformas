import Link from "next/link";

export default function AdminConfigPage() {
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/dashboard" className="text-sm text-navy-600 hover:underline mb-4 inline-block">
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-navy-900 mb-2">Configurações</h1>
        <p className="text-stone-600 mb-8">
          Logo, favicon, WhatsApp, telefone, links sociais, SEO e dados institucionais.
        </p>
        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500">
          WhatsApp atual: <strong>48 9205-6761</strong> (configurável via tabela settings).
        </div>
      </div>
    </div>
  );
}
