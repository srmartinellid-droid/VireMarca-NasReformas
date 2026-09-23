import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Footer({ whatsapp }: { whatsapp: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-[#F3F1EC] text-navy-950">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_.7fr_.9fr] md:gap-16">
          <div>
            <div className="inline-flex p-0">
              <Logo variant="dark" size="md" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-600">
              Reformas residenciais com precisão e cuidado com o acabamento. Atuação em Palhoça e Grande Florianópolis.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-stone-500">Navegação</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-navy-900 transition-colors hover:text-accent-600">Início</Link></li>
              <li><Link href="/#servicos" className="text-navy-900 transition-colors hover:text-accent-600">Serviços</Link></li>
              <li><Link href="/#galeria" className="text-navy-900 transition-colors hover:text-accent-600">Galeria</Link></li>
              <li><Link href="/quem-somos" className="text-navy-900 transition-colors hover:text-accent-600">Quem somos</Link></li>
              <li><Link href="/privacidade" className="text-stone-500 transition-colors hover:text-navy-900">Política de privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-stone-500">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li><a href={buildWhatsAppUrl(whatsapp)} target="_blank" rel="noopener noreferrer" className="font-medium text-navy-900 transition-colors hover:text-accent-600">WhatsApp: {whatsappDisplay}</a></li>
              <li className="text-stone-500">{SITE.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-stone-300 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center">
          <p>© {year} {SITE.name}. Todos os direitos reservados.</p>
          <p>Um site criado por <a href="https://viremarca.com.br" target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-800 underline decoration-stone-300 underline-offset-4 hover:text-accent-600">VireMarca</a></p>
        </div>
      </div>
    </footer>
  );
}
