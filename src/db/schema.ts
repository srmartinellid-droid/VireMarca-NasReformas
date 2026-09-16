import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* ======================== USERS (Admin) ======================== */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 50 }).default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ======================== CATEGORIES ======================== */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  order: integer("order").default(0).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================== PROJECTS (Portfolio) ======================== */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: integer("category_id").references(() => categories.id),
  location: varchar("location", { length: 150 }),
  year: integer("year"),
  coverImage: text("cover_image"),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectImages = pgTable("project_images", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 255 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================== SITE CONTENT (CMS) ======================== */
export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ======================== SETTINGS ======================== */
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ======================== LEADS ======================== */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  message: text("message"),
  source: varchar("source", { length: 100 }), // whatsapp, form, etc
  service: varchar("service", { length: 100 }),
  status: varchar("status", { length: 50 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================== ADMIN LOGS ======================== */
export const adminLogs = pgTable("admin_logs", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  entity: varchar("entity", { length: 100 }),
  entityId: varchar("entity_id", { length: 100 }),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================== RELATIONS ======================== */
export const projectsRelations = relations(projects, ({ one, many }) => ({
  category: one(categories, {
    fields: [projects.categoryId],
    references: [categories.id],
  }),
  images: many(projectImages),
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  projects: many(projects),
}));
