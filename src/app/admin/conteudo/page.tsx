import { createClient } from "@/lib/supabase/server";
import AdminConteudoClient from "./AdminConteudoClient";
export default async function AdminConteudoPage(){const supabase=await createClient();const{data,error}=await supabase.from("site_content").select("value").eq("key","homepage").maybeSingle();return <AdminConteudoClient initialValue={data?.value??null} initialError={error?.message??null}/>}
