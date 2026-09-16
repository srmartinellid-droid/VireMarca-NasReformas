import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-stone-100">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-4 text-stone-300 text-sm leading-relaxed max-w-xs">
              Reformas residenciais com precisão e cuidado com o acabamento.
              Atuação em Palhoça e Grande Florianópolis.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-stone-200 hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/#servicos" className="text-stone-200 hover:text-white transition-colors">Serviços</Link></li>
              <li><Link href="/#galeria" className="text-stone-200 hover:text-white transition-colors">Galeria</Link></li>
              <li><Link href="/quem-somos" className="text-stone-200 hover:text-white transition-colors">Quem somos</Link></li>
              <li><Link href="/privacidade" className="text-stone-200 hover:text-white transition-colors">Política de privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-4">Contato</h3>
            <ul className="space-y-3 text-stone-200">
              <li><a href={buildWhatsAppUrl(SITE.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: {SITE.whatsappDisplay}</a></li>
              <li className="text-sm text-stone-400">{SITE.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-400">
          <p>© {year} {SITE.name}. Todos os direitos reservados.</p>
          <p className="text-xs">Um site criado por{" "}<a href="https://viremarca.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-200">VireMarca</a></p>
        </div>
      </div>
    </footer>
  );
}
