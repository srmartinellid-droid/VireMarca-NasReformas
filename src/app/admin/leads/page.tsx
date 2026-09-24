import { createClient } from "@/lib/supabase/server";
import AdminLeadsClient, { type Lead } from "./AdminLeadsClient";
export default async function AdminLeadsPage(){const supabase=await createClient();const{data,count,error}=await supabase.from("leads").select("id,name,phone,email,message,source,service,status,created_at",{count:"exact"}).order("created_at",{ascending:false}).range(0,19);return <AdminLeadsClient initialLeads={(data??[]) as Lead[]} initialTotal={count??0} initialError={error?.message??null}/>}
