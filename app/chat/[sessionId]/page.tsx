import { redirect, notFound } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/server";
import { getAgent, agentList } from "@/lib/agents";
import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";

type Props = {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ agent?: string; msg?: string }>;
};

export default async function ChatPage({ params, searchParams }: Props) {
  const { sessionId } = await params;
  const { agent: agentKey, msg } = await searchParams;

  const supabase = await createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: session } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (!session) notFound();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const softwareKey =
    agentKey ??
    agentList.find(
      (a) => a.softwareName.toLowerCase() === session.software.toLowerCase()
    )?.key ??
    "general";

  const agent = getAgent(softwareKey);

  return (
    <div className="flex h-screen bg-[#080808] p-3 gap-3">
      <Sidebar sessions={sessions ?? []} userEmail={user.email} />
      <main className="flex-1 overflow-hidden">
        <ChatWindow
          sessionId={sessionId}
          agent={agent}
          initialMessage={msg ? decodeURIComponent(msg) : undefined}
        />
      </main>
    </div>
  );
}
