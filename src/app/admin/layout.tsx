import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export default async function AdminLayout({children}:{children:React.ReactNode}){const pathname=(await headers()).get("x-nas-admin-path")||"";if(pathname==="/admin/login")return children;const supabase=await createClient();const{data:user}=await supabase.auth.getUser();if(!user.user)redirect("/admin/login?next="+encodeURIComponent(pathname||"/admin/dashboard"));const{data:isAdmin,error}=await supabase.rpc("is_admin");if(error||!isAdmin)redirect("/admin/login?error=unauthorized");return children}
