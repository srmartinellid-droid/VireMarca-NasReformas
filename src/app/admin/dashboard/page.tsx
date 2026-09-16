import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function AdminDashboardPage() {
  const items = [
    { label: "Projetos", href: "/admin/projetos", desc: "Portfólio e galerias de projetos" },
    { label: "Categorias", href: "/admin/categorias", desc: "Cards da home + imagens" },
    { label: "Conteúdo", href: "/admin/conteudo-v2", desc: "Hero, textos e galeria horizontal" },
    { label: "Leads", href: "/admin/leads", desc: "Mensagens e contatos" },
    { label: "Configurações", href: "/admin/configuracoes", desc: "WhatsApp, SEO, logo e cores" },
  ];

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo size="sm" href="/admin/dashboard" />
          <nav className="flex items-center gap-4 text-sm">
            {items.map(item => <Link key={item.href} href={item.href} className="text-navy-800 hover:underline">{item.label}</Link>)}
            <Link href="/" className="text-stone-500 hover:underline">Ver site</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-2 text-2xl font-semibold text-navy-900">Dashboard</h1>
        <p className="mb-10 text-stone-600">Painel administrativo da Nascimento Reformas.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(item => <Link key={item.href} href={item.href} className="block rounded-xl border border-stone-200 bg-white p-6 transition hover:border-navy-300 hover:shadow-md"><h2 className="font-semibold text-navy-900">{item.label}</h2><p className="mt-1 text-sm text-stone-500">{item.desc}</p></Link>)}
        </div>
      </main>
    </div>
  );
}
