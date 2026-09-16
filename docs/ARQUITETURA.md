# Arquitetura — Nascimento Reformas

## Modelo VireMarca

```
VireMarca Core (futuro)
      │
      └── Template Serviços Residenciais
              │
              └── Nascimento Reformas  ← este repositório
```

## Decisões técnicas

| Área | Escolha | Motivo |
|------|---------|--------|
| Framework | Next.js 15 App Router | Stack padrão VireMarca, RSC, performance |
| Estilo | Tailwind 4 + tokens CSS | Design system isolado por cliente |
| Banco | Neon PostgreSQL + Drizzle | Preferência do projeto; isolado por cliente |
| Auth | bcrypt + cookie (simples) | Suficiente para admin single-user; upgrade Auth.js possível |
| Storage | Vercel Blob | CDN, transformações, integração nativa Vercel |
| Animação | Framer Motion | Reveal on scroll, respeito a reduced-motion |
| Analytics | Camada central `lib/analytics.ts` | Não espalhar gtag nos componentes |

## O que NÃO foi inventado

- Número de obras, depoimentos, CNPJ, CREA, equipe, prêmios
- Fotos de “obras do cliente” — apenas placeholder editorial
- Endereço físico completo

## O que está pronto para evolução

- Schema completo de projetos + imagens + categorias
- CMS leve (`site_content` / `settings`)
- Leads e logs admin
- SEO local e JSON-LD
- Design system reutilizável para próximo cliente do nicho

## Próximas implementações prioritárias

1. Middleware de proteção das rotas `/admin/*`
2. Server Actions para CRUD de projetos
3. Upload para Vercel Blob
4. Middleware de sessão
5. OG image gerada a partir do logo
6. Favicon / apple-touch-icon / webmanifest
