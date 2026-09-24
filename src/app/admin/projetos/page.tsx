import { createClient } from "@/lib/supabase/server";
import AdminProjetosClient,{type Project,type Category} from "./AdminProjetosClient";
export default async function AdminProjetosPage(){const supabase=await createClient();const[{data:projects},{data:categories}]=await Promise.all([supabase.from("projects").select("*").order("display_order"),supabase.from("categories").select("id,name").order("display_order")]);return <AdminProjetosClient initialProjects={(projects??[]) as Project[]} initialCategories={(categories??[]) as Category[]}/>}
