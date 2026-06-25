import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/server";
import Sidebar from "@/components/layout/Sidebar";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";

export default async function DashboardPage() {
  const supabase = await createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex h-screen bg-[#080808] p-3 gap-3">
      <Sidebar sessions={sessions ?? []} userEmail={user.email} />
      <main className="flex-1">
        <DashboardWelcome />
      </main>
    </div>
  );
}
