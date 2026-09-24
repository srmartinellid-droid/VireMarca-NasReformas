import { createClient } from "@/lib/supabase/server";
import AdminCategoriasClient,{type Category} from "./AdminCategoriasClient";
export default async function AdminCategoriasPage(){const supabase=await createClient();const{data,error}=await supabase.from("categories").select("id,name,slug,description,image,display_order,published").order("display_order").order("id");return <AdminCategoriasClient initialItems={(data??[]) as Category[]} initialError={error?.message??null}/>}
