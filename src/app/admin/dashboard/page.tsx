import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Logo size="sm" href="/admin/dashboard" />
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/projetos" className="text-navy-800 hover:underline">
              Projetos
            </Link>
            <Link href="/admin/categorias" className="text-navy-800 hover:underline">
              Categorias
            </Link>
            <Link href="/admin/conteudo" className="text-navy-800 hover:underline">
              Conteúdo
            </Link>
            <Link href="/admin/leads" className="text-navy-800 hover:underline">
              Leads
            </Link>
            <Link href="/admin/configuracoes" className="text-navy-800 hover:underline">
              Configurações
            </Link>
            <Link href="/" className="text-stone-500 hover:underline">
              Ver site
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-navy-900 mb-2">Dashboard</h1>
        <p className="text-stone-600 mb-10">
          Painel administrativo da Nascimento Reformas.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Projetos", href: "/admin/projetos", desc: "CRUD completo de portfólio" },
            { label: "Categorias", href: "/admin/categorias", desc: "Organização da galeria" },
            { label: "Conteúdo", href: "/admin/conteudo", desc: "Textos e seções do site" },
            { label: "Leads", href: "/admin/leads", desc: "Mensagens e contatos" },
            { label: "Configurações", href: "/admin/configuracoes", desc: "WhatsApp, SEO, logo" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-6 rounded-xl bg-white border border-stone-200 hover:border-navy-300 hover:shadow-md transition"
            >
              <h2 className="font-semibold text-navy-900">{item.label}</h2>
              <p className="mt-1 text-sm text-stone-500">{item.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
          <strong>Setup necessário:</strong> Configure <code>DATABASE_URL</code>, rode as
          migrations (<code>npm run db:push</code>) e o seed (<code>npm run db:seed</code>)
          para criar o usuário admin e categorias iniciais. Veja o README.
        </div>
      </main>
    </div>
  );
}
