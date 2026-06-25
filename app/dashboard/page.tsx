import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/server";
import AppShell from "@/components/layout/AppShell";
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
    <AppShell sessions={sessions ?? []} userEmail={user.email}>
      <DashboardWelcome />
    </AppShell>
  );
}
