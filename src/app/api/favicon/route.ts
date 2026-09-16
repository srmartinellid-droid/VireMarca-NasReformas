import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("value").eq("key", "favicon_url").maybeSingle();
  const url = data?.value || `${process.env.NEXT_PUBLIC_SITE_URL || ""}/logo.png`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return NextResponse.redirect(new URL("/logo.png", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
    return new NextResponse(await response.arrayBuffer(), { headers: { "Content-Type": response.headers.get("content-type") || "image/png", "Cache-Control": "public, max-age=300" } });
  } catch {
    return NextResponse.redirect(new URL("/logo.png", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }
}
