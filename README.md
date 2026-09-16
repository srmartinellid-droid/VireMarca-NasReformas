# Nascimento Reformas

Site institucional profissional da **Nascimento Reformas**, empresa de reformas residenciais com atuação em **Palhoça e Grande Florianópolis (SC)**.

Projeto desenvolvido pela **VireMarca**, seguindo a arquitetura de sites por nicho e a governança de produção definida para cada cliente.

> **Status:** projeto em configuração. O código recebido do template ainda contém referências à infraestrutura anterior (Neon/Drizzle/Vercel Blob). A infraestrutura oficial deste cliente foi definida como **Supabase + Vercel**, e a migração técnica deve ser concluída antes da publicação definitiva.

---

## Identidade do projeto

| Item | Valor |
|---|---|
| Cliente | Nascimento Reformas |
| Marca de projeto | Nas Reformas |
| Nicho | Reformas residenciais / serviços técnicos |
| Região | Palhoça e Grande Florianópolis, SC |
| WhatsApp | `+55 48 9205-6761` |
| GitHub | `srmartinellid-droid/VireMarca-NasReformas` |
| Branch de produção | `main` |
| Vercel | `viremarca-nasreformas` |
| Supabase | `whgznodgurkuskmsejos` |
| Banco | PostgreSQL via Supabase |
| Storage | Supabase Storage |

### Regra de isolamento

Este projeto possui infraestrutura própria. **Não compartilhar banco, Storage, autenticação, credenciais ou dados com outros clientes VireMarca.**

O projeto Supabase `whgznodgurkuskmsejos` é o banco oficial do Nas Reformas.

---

## Stack oficial

- **Next.js 15** — App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **Supabase** — PostgreSQL, Auth e Storage
- **Vercel** — build, deploy e hosting
- **GitHub** — fonte de verdade do código
- **Zod** — validação de dados
- **bcryptjs** — quando aplicável à camada de autenticação legada durante a migração
- **Lucide React** — ícones

### Infraestrutura anterior

O template recebido inicialmente foi criado com:

- Neon PostgreSQL
- Drizzle ORM
- Vercel Blob
- NextAuth

Essas referências pertencem à implementação anterior e **não representam a infraestrutura oficial do Nas Reformas**. A migração para Supabase deve remover dependências e configurações que não forem mais necessárias.

---

## Arquitetura VireMarca

O Nas Reformas segue o princípio:

```text
VireMarca Core
      ↓
Template Serviços
      ↓
Nas Reformas
      ↓
GitHub + Vercel + Supabase próprios
```

Cada cliente possui seu próprio ambiente. O conteúdo, identidade visual, imagens, leads, usuários administrativos e configurações pertencem exclusivamente ao projeto do cliente.

---

## Supabase

**Projeto oficial:** `whgznodgurkuskmsejos`

O Supabase é a fonte oficial de dados e mídia do Nas Reformas.

### Responsabilidades

- **PostgreSQL:** conteúdo estruturado, configurações, projetos/obras, leads e demais dados persistentes.
- **Auth:** autenticação do painel administrativo.
- **Storage:** imagens do site, portfólio e demais mídias administráveis.
- **RLS:** proteção das tabelas expostas pela API.

### Buckets previstos

- `property-images` — imagens relacionadas a obras/projetos quando aplicável.
- `site-media` — imagens e mídias gerais do site.

Os buckets devem permanecer isolados dentro deste projeto Supabase e nunca receber arquivos de outros clientes.

### Segurança

- Nunca colocar `service_role` ou qualquer chave secreta no frontend.
- Chaves e segredos ficam exclusivamente nas variáveis de ambiente da Vercel/Supabase.
- Toda tabela exposta pelo Data API deve ter RLS corretamente configurado.
- Autorização administrativa deve ser baseada em Auth/RLS, nunca em PIN hardcoded.
- Não armazenar arquivos binários diretamente no PostgreSQL quando o Storage for apropriado.

---

## Modelo de dados

O banco do Nas Reformas deve permanecer enxuto e orientado ao produto. A estrutura atual prevista contempla entidades para:

- `admins` — vínculo de usuários autorizados ao painel.
- `settings` — identidade, contatos, textos e configurações do site.
- `properties` — obras/projetos/itens de portfólio, conforme o modelo final do produto.
- `posts` — conteúdo editorial, caso o módulo seja utilizado.
- `contacts` — leads e mensagens recebidas pelo site.

A estrutura deve evoluir por migrações controladas. **Não criar tabelas ou campos diretamente em produção sem registrar a alteração no histórico técnico do projeto.**

---

## Admin

O painel administrativo é parte do produto e deve utilizar autenticação real.

Rotas previstas:

```text
/admin/login
/admin/dashboard
```

O administrador poderá gerenciar, conforme os módulos efetivamente habilitados:

- configurações do site;
- serviços;
- obras/projetos;
- imagens;
- conteúdo editorial;
- leads e contatos.

### Regra crítica

**Nunca usar senha, PIN ou usuário hardcoded no código de produção.**

---

## Conversão e contato

WhatsApp oficial do cliente:

```text
+55 48 9205-6761
554892056761
```

O site deve priorizar conversão por:

- CTA de WhatsApp;
- botão flutuante;
- formulário de orçamento/contato;
- chamadas contextuais por serviço ou obra;
- mensagens pré-preenchidas quando fizer sentido.

Eventos de conversão devem ser centralizados na camada de analytics do projeto.

---

## SEO local

O posicionamento digital deve trabalhar naturalmente a região atendida:

- Palhoça;
- Grande Florianópolis;
- Florianópolis e municípios da região quando efetivamente atendidos.

Implementações previstas:

- Metadata;
- Open Graph;
- sitemap;
- robots;
- headings semânticos;
- JSON-LD apropriado;
- performance e Core Web Vitals.

**Não inventar endereço, avaliações, CNPJ, certificações, obras, depoimentos ou números comerciais.**

---

## Identidade visual

A direção visual do projeto deve comunicar:

- precisão;
- acabamento;
- confiança;
- execução profissional;
- reformas residenciais de médio e alto padrão quando sustentado pelo conteúdo real do cliente.

A identidade deve respeitar o logotipo e os ativos oficiais fornecidos para o projeto.

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

Aplicação local:

```text
http://localhost:3000
```

As variáveis de ambiente devem ser configuradas em `.env.local` e **nunca commitadas**.

A configuração definitiva deve utilizar as credenciais e URLs do projeto Supabase:

```text
whgznodgurkuskmsejos
```

---

## Git e fonte de verdade

`main` é a única fonte de verdade para produção.

Fluxo obrigatório:

```text
alteração
   ↓
validação local
   ↓
commit
   ↓
push para main
   ↓
Vercel build
   ↓
deployment Production
   ↓
validação pública
```

Evitar alterações manuais diretamente na infraestrutura de produção.

---

## Release Gate

Uma entrega só está concluída quando:

- [ ] código está em `main`;
- [ ] build passa sem erro;
- [ ] variáveis de ambiente estão configuradas no projeto Vercel correto;
- [ ] aplicação aponta para o Supabase `whgznodgurkuskmsejos`;
- [ ] Auth está funcionando;
- [ ] persistência está funcionando;
- [ ] Storage está funcionando;
- [ ] RLS foi revisado;
- [ ] formulários/WhatsApp foram testados;
- [ ] imagens carregam corretamente;
- [ ] SEO básico foi validado;
- [ ] deployment Production corresponde ao commit esperado;
- [ ] nenhuma alteração afetou outro cliente VireMarca.

---

## Governança VireMarca

A regra estrutural é:

**1 cliente = 1 repositório + 1 projeto Vercel + 1 projeto Supabase.**

Regras complementares:

1. `main` é a fonte de verdade.
2. Cada cliente possui dados e credenciais próprios.
3. Secrets nunca entram no Git.
4. Não copiar dados reais de outro cliente.
5. Não fabricar informações comerciais.
6. Mudanças estruturais no banco devem ser controladas por migração.
7. Alterações de produção devem passar pelo fluxo Git → Vercel.
8. O site deve manter o crédito institucional **“Um site criado por VireMarca”** no footer, conforme o padrão do ecossistema.

---

## Próximas etapas

1. Confirmar e configurar o projeto Supabase `whgznodgurkuskmsejos`.
2. Finalizar a migração do código de Neon/Drizzle/Vercel Blob para Supabase.
3. Configurar Auth e permissões administrativas.
4. Configurar schema, RLS e Storage.
5. Configurar variáveis de ambiente na Vercel.
6. Validar build e runtime.
7. Alimentar o conteúdo real do cliente.
8. Executar o Release Gate.
9. Publicar em Production.

---

## Projeto

**Nascimento Reformas / Nas Reformas**  
Desenvolvido por **VireMarca**.

**VireMarca — sites profissionais por nicho.**
