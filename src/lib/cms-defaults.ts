export type HeroSlide = { image: string; alt?: string; label?: string };
export type HomepageContent = {
  hero: { eyebrow: string; title: string; highlight: string; description: string; panelTitle: string; panelText: string; primaryLabel: string; secondaryLabel: string; heroInterval: number; heroOverlay: number; accentColor: string; showGrid: boolean; images: HeroSlide[] };
  areas: { eyebrow: string; title: string; highlight: string; description: string };
  portfolio: { eyebrow: string; title: string; description: string; emptyTitle: string; emptyText: string };
  method: { eyebrow: string; title: string; highlight: string; description: string };
  finalCta: { title: string; description: string; button: string };
};
export const DEFAULT_HOMEPAGE: HomepageContent = {
  hero:{eyebrow:"Nascimento Reformas",title:"Reformas que transformam espaços.",highlight:"Precisão em cada detalhe",description:"Execução cuidadosa para residências e espaços comerciais na Grande Florianópolis, do primeiro alinhamento ao acabamento final.",panelTitle:"Comece sua obra com uma base bem definida",panelText:"Fale diretamente com a equipe e conte o que você pretende construir ou reformar.",primaryLabel:"Solicitar orçamento",secondaryLabel:"Conheça nossos serviços",heroInterval:6500,heroOverlay:58,accentColor:"#0B3A64",showGrid:false,images:[]},
  areas:{eyebrow:"Áreas de atuação",title:"Obras em diferentes escalas",highlight:"Precisão em cada detalhe",description:"Da construção predial aos espaços comerciais e interiores, adaptamos planejamento e execução às necessidades de cada projeto."},
  portfolio:{eyebrow:"Trabalhos",title:"Projetos que falam por si",description:"Uma seleção de obras e intervenções realizadas pela Nascimento Reformas.",emptyTitle:"Galeria em construção",emptyText:"Publique seus projetos reais pelo painel administrativo e eles aparecerão aqui automaticamente."},
  method:{eyebrow:"Nosso método",title:"Clareza do início à entrega",highlight:"Segurança em cada decisão",description:"Um processo contínuo, com planejamento claro, comunicação próxima e atenção ao acabamento."},
  finalCta:{title:"Vamos conversar sobre sua obra?",description:"Conte o que você pretende construir ou reformar e fale diretamente com a equipe.",button:"Solicitar orçamento"}
};