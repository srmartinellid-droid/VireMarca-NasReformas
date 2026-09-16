import { createClient } from "@/lib/supabase/server";
import { DEFAULT_HOMEPAGE, type GalleryImage, type HomepageContent } from "@/lib/cms-defaults";

export async function getConsolidatedHomepage(): Promise<HomepageContent> {
  const supabase = await createClient();
  const [{ data: row }, { data: categories }, { data: projects }] = await Promise.all([
    supabase.from("site_content").select("value").eq("key", "homepage").maybeSingle(),
    supabase.from("categories").select("id,slug,name,description,image,display_order,published").eq("published", true).order("display_order").order("id"),
    supabase.from("projects").select("id,title,display_order").eq("published", true).order("display_order").order("id"),
  ]);

  const value = parseValue(row?.value);
  const content: HomepageContent = {
    ...DEFAULT_HOMEPAGE,
    ...value,
    hero: { ...DEFAULT_HOMEPAGE.hero, ...(value.hero ?? {}) },
    areas: { ...DEFAULT_HOMEPAGE.areas, ...(value.areas ?? {}) },
    gallery: { ...DEFAULT_HOMEPAGE.gallery, ...(value.gallery ?? {}), images: Array.isArray(value.gallery?.images) ? value.gallery.images : DEFAULT_HOMEPAGE.gallery.images },
    portfolio: { ...DEFAULT_HOMEPAGE.portfolio, ...(value.portfolio ?? {}) },
    method: { ...DEFAULT_HOMEPAGE.method, ...(value.method ?? {}) },
    finalCta: { ...DEFAULT_HOMEPAGE.finalCta, ...(value.finalCta ?? {}) },
  };

  content.areas.categories = (categories ?? []).map((category, index) => ({
    id: category.id,
    slug: category.slug,
    number: String(index + 1).padStart(2, "0"),
    title: category.name,
    description: category.description ?? "",
    image: category.image ?? "",
  }));

  const projectIds = (projects ?? []).map((project) => project.id);
  if (projectIds.length) {
    const { data: projectImages } = await supabase
      .from("project_images")
      .select("project_id,url,alt,display_order")
      .in("project_id", projectIds)
      .order("display_order")
      .order("id");

    const projectTitles = new Map((projects ?? []).map((project) => [project.id, project.title]));
    const albumImages: GalleryImage[] = (projectImages ?? []).map((item) => ({
      image: item.url,
      alt: item.alt || projectTitles.get(item.project_id) || "Obra Nascimento Reformas",
      label: projectTitles.get(item.project_id) || "",
    }));

    const existing = new Set(content.gallery.images.map((item) => item.image));
    content.gallery.images = [
      ...content.gallery.images,
      ...albumImages.filter((item) => item.image && !existing.has(item.image)),
    ];
  }

  return content;
}

function parseValue(value: unknown): Partial<HomepageContent> {
  if (!value) return {};
  if (typeof value === "object") return value as Partial<HomepageContent>;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? (parsed as Partial<HomepageContent>) : {};
    } catch {
      return {};
    }
  }
  return {};
}
