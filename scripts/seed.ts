/**
 * Seed script — creates admin user and initial categories.
 * Run: npm run db:seed
 * Requires DATABASE_URL and ADMIN_EMAIL / ADMIN_PASSWORD in .env
 *
 * DEMO data only. No real projects or client information.
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users, categories, settings } from "../src/db/schema";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const email = process.env.ADMIN_EMAIL || "admin@nascimentoreformas.com.br";
  const password = process.env.ADMIN_PASSWORD || "change-me-on-first-login";

  console.log("Seeding admin user…");
  const hash = await bcrypt.hash(password, 12);

  await db
    .insert(users)
    .values({
      email: email.toLowerCase(),
      name: "Administrador",
      passwordHash: hash,
      role: "admin",
    })
    .onConflictDoNothing();

  console.log("Seeding categories…");
  const cats = [
    { slug: "reforma-completa", name: "Reforma completa", order: 1 },
    { slug: "drywall", name: "Drywall", order: 2 },
    { slug: "gesso", name: "Gesso", order: 3 },
    { slug: "hidraulica", name: "Hidráulica", order: 4 },
    { slug: "acabamentos", name: "Acabamentos", order: 5 },
    { slug: "antes-depois", name: "Antes e depois", order: 6 },
  ];

  for (const c of cats) {
    await db.insert(categories).values(c).onConflictDoNothing();
  }

  console.log("Seeding settings…");
  await db
    .insert(settings)
    .values([
      { key: "whatsapp", value: "554892056761" },
      { key: "site_name", value: "Nascimento Reformas" },
      { key: "region", value: "Palhoça e Grande Florianópolis — SC" },
    ])
    .onConflictDoNothing();

  console.log("Seed complete.");
  console.log(`Admin: ${email}`);
  console.log("Change the password after first login.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
