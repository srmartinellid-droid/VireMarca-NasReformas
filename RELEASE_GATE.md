# RELEASE GATE — Nascimento Reformas

**Cliente:** Nascimento Reformas  
**Repositório:** (criar no GitHub — 1 repo por cliente)  
**Banco:** Neon PostgreSQL (próprio, isolado)  
**Deploy:** Vercel (projeto próprio)  
**Regra VireMarca:** `main` é a fonte de verdade da publicação.

---

## Checklist obrigatório antes de declarar “pronto”

| # | Critério | Status | Como validar |
|---|----------|--------|--------------|
| 1 | Código em `main` | ☐ | `git log -1` e branch atual |
| 2 | Build passa | ☐ | `npm run build` sem erros |
| 3 | Banco configurado | ☐ | `DATABASE_URL` na Vercel + `db:push` |
| 4 | Autenticação funciona | ☐ | Login em `/admin/login` com usuário seed |
| 5 | Upload de imagens | ☐ | Vercel Blob token configurado + teste de upload |
| 6 | CRUD de projetos | ☐ | Criar, editar, publicar, despublicar projeto |
| 7 | WhatsApp funciona | ☐ | CTAs abrem `wa.me/554892056761` com mensagem |
| 8 | Formulário / leads | ☐ | (quando implementado) grava no banco |
| 9 | Produção responde | ☐ | URL pública carrega e não é 404/500 |
| 10 | Commit publicado = esperado | ☐ | Vercel deployment bate com SHA do `main` |

---

## Identidade do build

Incluir no README ou no footer do admin:

```
Build: [SHA curto]
Branch: main
Deploy: [data]
```

---

## Fluxo de release

```
alteração → teste local → commit → push main → Vercel build → deployment → validação em produção
```

Nunca editar produção manualmente.  
Nunca misturar credenciais de outro cliente.  
Nunca compartilhar o banco Neon com outro site.

---

## Variáveis de ambiente (Vercel)

- `DATABASE_URL` — Neon connection string (pooled)
- `NEXTAUTH_SECRET` / session secret
- `NEXTAUTH_URL` — URL de produção
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP=554892056761`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` (apenas para seed inicial)

---

## Pós-deploy

1. Confirmar homepage
2. Confirmar `/quem-somos`
3. Confirmar botão flutuante WhatsApp
4. Confirmar `/admin/login`
5. Confirmar SEO (title, OG, JSON-LD)
6. Confirmar mobile

---

**Assinatura VireMarca:** Um site criado por VireMarca — no footer.
