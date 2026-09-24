import { createClient } from "@/lib/supabase/server";
import AdminConfigClient from "./AdminConfigClient";
const keys=["site_name","whatsapp","region","email","instagram","cnpj","accent_color","orange_color","seo_title","seo_description","logo_url","wordmark_url","favicon_url"];
export default async function AdminConfigPage(){const supabase=await createClient();const{data}=await supabase.from("settings").select("key,value").in("key",keys);const values=Object.fromEntries((data??[]).map(row=>[row.key,row.value??""]));return <AdminConfigClient initialValues={values}/>}
