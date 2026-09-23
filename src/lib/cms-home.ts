import { createClient } from "@/lib/supabase/server";
import { DEFAULT_HOMEPAGE, type GalleryImage, type HomepageContent } from "@/lib/cms-defaults";

type ProjectRow = {
  id: number;
  title: string;
  display_order: number | null;
  cover_image: string | null;
  project_images: Array<{
    id: number;
    url: string;
    alt: string | null;
    display_order: number | null;
  }>;
};

export async function getConsolidatedHomepage(): Promise<HomepageContent> {
  const supabase = await createClient();
  const [{ data: row }, { data: categories }, { data: projects }] = await Promise.all([
    supabase.from("site_content").select("value").eq("key", "homepage").maybeSingle(),
    supabase.from("categories").select("id,slug,name,description,image,display_order,published").eq("published", true).order("display_order").order("id"),
    supabase
      .from("projects")
      .select("id,title,display_order,cover_image,project_images(id,url,alt,display_order)")
      .eq("published", true)
      .order("display_order")
      .order("id"),
  ]);

  const value = parseValue(row?.value);
  const { data: whatsappSetting } = await supabase.from("settings").select("value").eq("key", "whatsapp").maybeSingle();
  const whatsapp = typeof whatsappSetting?.value === "string" && whatsappSetting.value.trim() ? whatsappSetting.value.trim() : undefined;
  const content: HomepageContent = {
    ...DEFAULT_HOMEPAGE,
    ...value,
    hero: { ...DEFAULT_HOMEPAGE.hero, ...(value.hero ?? {}) },
    areas: { ...DEFAULT_HOMEPAGE.areas, ...(value.areas ?? {}) },
    gallery: {
      ...DEFAULT_HOMEPAGE.gallery,
      ...(value.gallery ?? {}),
      images: Array.isArray(value.gallery?.images) ? value.gallery.images : DEFAULT_HOMEPAGE.gallery.images,
    },
    portfolio: { ...DEFAULT_HOMEPAGE.portfolio, ...(value.portfolio ?? {}) },
    method: { ...DEFAULT_HOMEPAGE.method, ...(value.method ?? {}), steps: normalizeMethodSteps(value.method?.steps) },
    whatsapp,
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

  const albumImages = buildProjectGallery((projects ?? []) as ProjectRow[]);
  const seen = new Set<string>();
  const configuredImages = content.gallery.images.filter((item) => {
    const key = normalizeImageUrl(item.image);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  content.gallery.images = [...configuredImages, ...albumImages.filter((item) => {
    const key = normalizeImageUrl(item.image);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  })];

  return content;
}

function buildProjectGallery(projects: ProjectRow[]): GalleryImage[] {
  return projects.flatMap((project) => {
    const images = (project.project_images ?? [])
      .filter((item) => normalizeImageUrl(item.url))
      .slice()
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || a.id - b.id);

    if (images.length > 0) {
      return images.map((item) => ({
        image: item.url.trim(),
        alt: item.alt?.trim() || project.title || "Obra Nascimento Reformas",
        label: project.title || "",
      }));
    }

    const cover = normalizeImageUrl(project.cover_image);
    return cover
      ? [{ image: cover, alt: project.title || "Obra Nascimento Reformas", label: project.title || "" }]
      : [];
  });
}

function normalizeImageUrl(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
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

function normalizeMethodSteps(value: unknown): HomepageContent["method"]["steps"] {
  if (!Array.isArray(value)) return DEFAULT_HOMEPAGE.method.steps;
  const steps = value
    .filter((step): step is { number?: unknown; title?: unknown; description?: unknown } => !!step && typeof step === "object")
    .map((step, index) => ({
      number: typeof step.number === "string" && step.number.trim() ? step.number.trim() : String(index + 1).padStart(2, "0"),
      title: typeof step.title === "string" ? step.title.trim() : "",
      description: typeof step.description === "string" ? step.description.trim() : "",
    }))
    .filter((step) => step.title && step.description);
  return steps.length ? steps : DEFAULT_HOMEPAGE.method.steps;
}
