"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Cloud, Settings, BookOpen, Diamond, Building2, Terminal } from "lucide-react";
import { Agent } from "@/lib/agents";

type Props = {
  agent: Agent;
};

const iconMap: Record<string, React.ReactNode> = {
  salesforce: <Cloud className="w-4 h-4" />,
  hubspot: <Settings className="w-4 h-4" />,
  quickbooks: <BookOpen className="w-4 h-4" />,
  jira: <Diamond className="w-4 h-4" />,
  sap: <Building2 className="w-4 h-4" />,
  general: <Terminal className="w-4 h-4" />,
};

export default function NewSessionButton({ agent }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ software: agent.softwareName }),
      });
      const session = await res.json();
      router.push(`/chat/${session.id}?agent=${agent.key}`);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="group flex items-center gap-3 px-4 py-4 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] rounded-2xl transition-all duration-200 text-left disabled:opacity-60 w-full"
    >
      <div className="w-8 h-8 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0066FF]/20 transition-colors duration-200">
        <span className="text-[#0066FF]">
          {iconMap[agent.key] ?? <Terminal className="w-4 h-4" />}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#F8F9FA] group-hover:text-white transition-colors">
          {agent.softwareName}
        </p>
        <p className="text-xs text-[#6B7280] truncate mt-0.5">{agent.softwareDescription}</p>
      </div>
    </button>
  );
}
