/**
 * Site constants — single source of truth for public data.
 * Content that can be edited via admin lives in the database (site_content / settings).
 * These are the defaults and structural values.
 */

// Production canonical URL. Keep this independent from preview deployment hostnames.
const PRODUCTION_URL = "https://www.nascimentoreformas.com.br";

export const SITE = {
  name: "Nascimento Reformas",
  tagline: "Reformas residenciais com precisão e acabamento",
  description:
    "15 anos de experiência em reformas residenciais na Grande Florianópolis. Drywall, gesso, hidráulica e reformas completas para residências de médio e alto padrão.",
  region: "Palhoça e Grande Florianópolis — SC",
  whatsapp: "5548992056761",
  yearsExperience: 15,
  url: PRODUCTION_URL,
} as const;

export function resolveWhatsapp(dbValue?: string | null): string {
  return typeof dbValue === "string" && /^55\d{2}9\d{8}$/.test(dbValue)
    ? dbValue
    : SITE.whatsapp;
}

export function formatWhatsappDisplay(phone: string): string {
  const resolved = resolveWhatsapp(phone);
  return `(${resolved.slice(2, 4)}) ${resolved.slice(5, 10)}-${resolved.slice(10)}`;
}

export const SERVICES = [
  { slug: "reformas-residenciais", title: "Reformas residenciais", short: "Intervenções planejadas em residências de médio e alto padrão.", description: "Do detalhe à reforma completa. Planejamento, execução e acabamento com atenção ao resultado final." },
  { slug: "drywall", title: "Drywall", short: "Divisórias, forros e soluções em drywall com acabamento preciso.", description: "Execução técnica de sistemas em drywall para ambientes residenciais, com foco em qualidade e limpeza de obra." },
  { slug: "gesso", title: "Gesso", short: "Forros, sancas e detalhes em gesso.", description: "Acabamentos em gesso que valorizam o ambiente e garantem um resultado limpo e sofisticado." },
  { slug: "hidraulica", title: "Hidráulica", short: "Instalações e adequações hidráulicas residenciais.", description: "Serviços de hidráulica com organização e cuidado com o imóvel existente." },
  { slug: "adequacoes", title: "Adequações", short: "Ajustes e adaptações em ambientes existentes.", description: "Adequações planejadas para melhorar o uso dos espaços sem comprometer a estrutura e o acabamento." },
  { slug: "reformas-completas", title: "Reformas completas", short: "Obras de maior porte com coordenação de etapas.", description: "Reformas completas com acompanhamento das etapas, desde a preparação até o acabamento final." },
  { slug: "manutencao", title: "Manutenção e reparos", short: "Correções e manutenções pontuais.", description: "Manutenção e reparos com o mesmo padrão de cuidado aplicado nas reformas maiores." },
  { slug: "outros", title: "Outros serviços", short: "Serviços sob consulta conforme a necessidade.", description: "Avaliação de demandas específicas relacionadas a reformas residenciais. Entre em contato para conversar." },
] as const;

export const PROCESS_STEPS = [
  { number: "01", title: "Conversa inicial", description: "Entendemos o que você precisa e o contexto da residência." },
  { number: "02", title: "Entendimento", description: "Alinhamos escopo, expectativas e pontos de atenção." },
  { number: "03", title: "Avaliação", description: "Análise técnica do ambiente e das intervenções necessárias." },
  { number: "04", title: "Planejamento", description: "Organização das etapas e definição clara do que será executado." },
  { number: "05", title: "Execução", description: "Trabalho cuidadoso, com respeito ao imóvel e ao dia a dia da casa." },
  { number: "06", title: "Acabamento", description: "Atenção aos detalhes que fazem a diferença no resultado final." },
  { number: "07", title: "Entrega", description: "Conferência e entrega do serviço conforme o combinado." },
] as const;
