import { createClient } from "@/lib/supabase/server";
import { DEFAULT_HOMEPAGE, type HomepageContent, type ServiceCategory } from "@/lib/cms-defaults";

export type { HomepageContent, HeroSlide, GalleryImage } from "@/lib/cms-defaults";
export { DEFAULT_HOMEPAGE } from "@/lib/cms-defaults";

export async function getHomepageContent(): Promise<HomepageContent> {
  const supabase = await createClient();
  const [{ data: contentRow }, { data: categoryRows }] = await Promise.all([
    supabase.from("site_content").select("value").eq("key", "homepage").maybeSingle(),
    supabase.from("categories").select("id,slug,name,description,image,display_order,published").eq("published", true).order("display_order", { ascending: true }).order("id", { ascending: true }),
  ]);
  const merged = mergeHomepage(DEFAULT_HOMEPAGE, parseHomepageValue(contentRow?.value));
  if (categoryRows?.length) {
    merged.areas = { ...merged.areas, categories: categoryRows.map((category, index) => ({ id: category.id, slug: category.slug, number: String(index + 1).padStart(2, "0"), title: category.name, description: category.description || "", image: category.image || "" })) };
  }
  return merged;
}

function parseHomepageValue(value: unknown): Partial<HomepageContent> {
  if (!value) return {};
  if (typeof value === "object") return value as Partial<HomepageContent>;
  if (typeof value === "string") { try { const parsed = JSON.parse(value); return parsed && typeof parsed === "object" ? (parsed as Partial<HomepageContent>) : {}; } catch { return {}; } }
  return {};
}

function mergeHomepage(base: HomepageContent, value: Partial<HomepageContent>): HomepageContent {
  return { ...base, ...value, hero: { ...base.hero, ...(value.hero ?? {}), showGrid: (value.hero as any)?.showGrid ?? base.hero.showGrid }, areas: { ...base.areas, ...(value.areas ?? {}), categories: base.areas.categories }, gallery: { ...base.gallery, ...(value.gallery ?? {}), images: Array.isArray(value.gallery?.images) ? value.gallery.images : base.gallery.images }, portfolio: { ...base.portfolio, ...(value.portfolio ?? {}) }, method: { ...base.method, ...(value.method ?? {}) }, finalCta: { ...base.finalCta, ...(value.finalCta ?? {}) } };
}

export async function getPublishedProjects() {
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("id,slug,title,description,location,year,cover_image,featured,display_order,categories(name),project_images(id,url,alt,display_order)").eq("published", true).order("featured", { ascending: false }).order("display_order", { ascending: true });
  return data ?? [];
}
