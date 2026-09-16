import { getConsolidatedHomepage } from "@/lib/cms-home";
import { createClient } from "@/lib/supabase/server";

export type { HomepageContent, HeroSlide, GalleryImage } from "@/lib/cms-defaults";
export { DEFAULT_HOMEPAGE } from "@/lib/cms-defaults";

/**
 * Compatibility entry point for older admin/server consumers.
 * The homepage data source is intentionally consolidated in cms-home.ts so
 * categories, manual gallery images and published project albums cannot drift.
 */
export async function getHomepageContent() {
  return getConsolidatedHomepage();
}

export async function getPublishedProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id,slug,title,description,location,year,cover_image,featured,display_order,categories(name),project_images(id,url,alt,display_order)")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("display_order", { ascending: true });

  return data ?? [];
}
