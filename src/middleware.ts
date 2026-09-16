import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data, error: userError } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";
  if (isAdminRoute && !isLoginRoute) {
    if (userError || !data.user) { const loginUrl = request.nextUrl.clone(); loginUrl.pathname = "/admin/login"; loginUrl.searchParams.set("next", pathname); return NextResponse.redirect(loginUrl); }
    const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");
    if (adminError || !isAdmin) { const loginUrl = new URL("/admin/login", request.url); loginUrl.searchParams.set("error", "unauthorized"); return NextResponse.redirect(loginUrl); }
  }
  if (isLoginRoute && data.user && !userError) { const { data: isAdmin } = await supabase.rpc("is_admin"); if (isAdmin) return NextResponse.redirect(new URL("/admin/dashboard", request.url)); }
  const rewrites: Record<string, string> = { "/admin/conteudo": "/admin/conteudo-v2", "/admin/categorias": "/admin/categorias-v2" };
  const target = rewrites[pathname];
  if (target) { const url = request.nextUrl.clone(); url.pathname = target; return NextResponse.rewrite(url, response); }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
