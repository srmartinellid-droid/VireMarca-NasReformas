# Nascimento Reformas

Site profissional do cliente **Nascimento Reformas** — reformas residenciais em Palhoça e Grande Florianópolis (SC).

Parte do ecossistema **VireMarca** (Core → Template Serviços → Cliente).

---

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS 4** + Design Tokens próprios
- **Framer Motion** (animações com respeito a `prefers-reduced-motion`)
- **Neon PostgreSQL** + **Drizzle ORM**
- **Vercel Blob** (imagens — não armazenar no Postgres)
- **Auth** com hash bcrypt + cookie de sessão (upgrade para Auth.js recomendado)
- Deploy: **Vercel**
- Repositório: **1 por cliente** (governança VireMarca)

---

## Identidade visual

- Cores derivadas do logotipo: navy profundo + laranja de acento
- Tipografia: Inter (Google Fonts)
- Linguagem: arquitetura em execução — precisão, acabamento, confiança
- Logo: `/public/logo.png` (não distorcer, área de respiro, versão clara/escura no componente)

---

## Setup local

```bash
# 1. Clone
git clone <repo>
cd nascimento-reformas

# 2. Dependências
npm install

# 3. Ambiente
cp .env.example .env.local
# Preencha DATABASE_URL (Neon), NEXTAUTH_SECRET, BLOB_READ_WRITE_TOKEN, etc.

# 4. Banco
npm run db:push
npm run db:seed

# 5. Dev
npm run dev
```

Acesse: http://localhost:3000  
Admin: http://localhost:3000/admin/login  

Credenciais seed: variáveis `ADMIN_EMAIL` / `ADMIN_PASSWORD` do `.env`.

---

## Estrutura

```
src/
  app/           # rotas (App Router)
  components/    # UI + layout + brand
  features/      # seções de domínio (home, etc.)
  db/            # schema + client Drizzle
  lib/           # utils, analytics, site constants
  styles/        # design tokens
```

---

## Banco de dados (Neon)

Tabelas principais:

- `users` — admins
- `categories` — categorias do portfólio
- `projects` + `project_images` — galeria
- `site_content` / `settings` — CMS leve
- `leads` — contatos
- `admin_logs` — auditoria

**Imagens NÃO vão no Postgres.** Use Vercel Blob (ou similar). Apenas URLs e metadados.

---

## Admin

- `/admin/login` — autenticação real (bcrypt)
- `/admin/dashboard` — atalhos
- CRUD de projetos, categorias, conteúdo e configurações (estrutura pronta; completar actions conforme necessidade)

**Nunca use PIN hardcoded.** Senha só no banco, hasheada.

---

## WhatsApp

Número oficial: **+55 48 9205-6761** (`554892056761`)

- CTA principal e secundário
- Botão flutuante
- Mensagens pré-preenchidas contextuais
- Eventos de analytics centralizados em `lib/analytics.ts`

---

## SEO local

- Metadata + Open Graph
- `sitemap.ts` + `robots.ts`
- JSON-LD `LocalBusiness`
- Títulos e headings semânticos
- Palhoça / Florianópolis / Grande Florianópolis de forma natural

Não inventar endereço, avaliações ou CNPJ.

---

## Deploy (Vercel)

1. Criar projeto Vercel apontando para o repositório
2. Framework: **Next.js**
3. Configurar todas as env vars (ver `.env.example` e `RELEASE_GATE.md`)
4. Deploy a partir de `main`
5. Validar checklist do `RELEASE_GATE.md`

---

## Regras VireMarca

- 1 repositório · 1 banco · 1 projeto Vercel por cliente
- `main` = fonte de verdade
- Secrets só em environment variables
- Não fabricar dados reais (obras, depoimentos, números)
- Footer: “Um site criado por VireMarca”

---

## Próximos passos recomendados

1. Configurar Neon + `db:push` + seed
2. Configurar Vercel Blob e completar upload no admin
3. Completar CRUD de projetos (API + formulários)
4. Proteger rotas `/admin/*` com middleware de sessão
5. Subir fotos reais de obras via admin
6. Validar RELEASE_GATE e publicar

---

**VireMarca** — sites profissionais por nicho.
