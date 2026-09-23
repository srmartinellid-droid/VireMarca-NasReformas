# RELEASE GATE — Nascimento Reformas

**Cliente:** Nascimento Reformas  
**Repositório:** `srmartinellid-droid/VireMarca-NasReformas`  
**Branch de publicação:** `main`  
**Banco:** Supabase (projeto próprio e isolado)  
**Deploy:** Vercel (projeto próprio)  
**Domínio oficial:** https://www.nascimentoreformas.com.br

## Checklist obrigatório

| # | Critério | Como validar |
|---|---|---|
| 1 | Código em `main` | commit publicado corresponde ao SHA de `main` |
| 2 | TypeScript | `npx tsc --noEmit` |
| 3 | Build | `npm run build` |
| 4 | Supabase | projeto `whgznodgurkuskmsejos` responde e conteúdo publicado carrega |
| 5 | Autenticação | `/admin/login` e rotas protegidas |
| 6 | Upload / CMS | imagens e conteúdo publicados pelo painel |
| 7 | WhatsApp | todos os CTAs usam a fonte única e abrem o número confirmado |
| 8 | SEO | canonical, sitemap, robots e JSON-LD usam o domínio oficial |
| 9 | Compartilhamento | Open Graph image responde 200 |
| 10 | Build identity | `/build-info.json` corresponde ao SHA publicado |
| 11 | Analytics | Vercel Web Analytics ativo; clique de WhatsApp medido por origem |
| 12 | Produção | domínio público responde sem 404/500 |
| 13 | Domínio legado | `viremarca-nasreformas.vercel.app` redireciona para o domínio oficial |

## Identidade do build

O build gera automaticamente:

```json
{
  "sha": "<VERCEL_GIT_COMMIT_SHA>",
  "branch": "<VERCEL_GIT_COMMIT_REF>",
  "date": "<ISO-8601>",
  "environment": "<VERCEL_ENV>"
}
```

Endpoint:

```
/build-info.json
```

## Infraestrutura

Variáveis públicas esperadas:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

O domínio canônico do código é `https://www.nascimentoreformas.com.br`.

Não colocar secrets no código ou no Git.

## Fluxo de release

```
alteração
→ validação
→ commit
→ push main
→ Vercel Production
→ Release Gate
→ validação pública
```

Nunca editar produção manualmente.  
Nunca misturar credenciais de outro cliente.

## Pendências de conteúdo

Não publicar dados comerciais inventados.

Atualmente dependem de validação do cliente:

- WhatsApp correto
- CNPJ
- e-mail
- Instagram
- texto da seção Hidráulica
- 4 etapas finais do método, caso o cliente queira um processo específico

## Preservar

- identidade visual azul-marinho + laranja
- HTTPS
- um H1 por página
- `lang="pt-BR"`
- acessibilidade existente
- responsividade
- zoom
- página 404
- estrutura de navegação
