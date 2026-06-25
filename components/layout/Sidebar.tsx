"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PanelLeft, Search, Trash2, Plus, LogOut } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

const dm = {
  card:        "#111114",
  cardBorder:  "rgba(255,255,255,0.07)",
  cardShadow:  "0 2px 8px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04)",
  divider:     "rgba(255,255,255,0.06)",
  textPrimary: "#F8F9FA",
  textMuted:   "#6B7280",
  inputBg:     "#0d0d10",
  inputBorder: "rgba(255,255,255,0.08)",
  inputText:   "#F8F9FA",
  accent:      "#0066FF",
};

type Session = {
  id: string;
  software: string;
  summary: string | null;
  created_at: string;
};

type Props = {
  sessions: Session[];
  userEmail?: string;
  onMobileClose?: () => void;
};

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Sidebar({ sessions: initialSessions, userEmail, onMobileClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseClient();

  const [open, setOpen] = useState(true);
  const [sessions, setSessions] = useState(initialSessions);
  const [search, setSearch] = useState("");
  const [confirming, setConfirming] = useState<string | null>(null);

  const filtered = sessions.filter(
    (s) =>
      s.software.toLowerCase().includes(search.toLowerCase()) ||
      (s.summary?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  async function handleSignOut() {
    onMobileClose?.();
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleDelete(id: string) {
    await supabase.from("sessions").delete().eq("id", id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setConfirming(null);
    if (pathname === `/chat/${id}`) router.push("/dashboard");
  }

  return (
    <aside
      className="flex flex-col overflow-hidden shrink-0 transition-all duration-200"
      style={{
        width: open ? 288 : 48,
        background: dm.card,
        border: `1.5px solid ${dm.cardBorder}`,
        boxShadow: dm.cardShadow,
        borderRadius: "1rem",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center shrink-0"
        style={{
          height: 48,
          padding: open ? "0 16px" : "0",
          justifyContent: open ? "space-between" : "center",
          borderBottom: `1px solid ${dm.divider}`,
        }}
      >
        {open && (
          <Link
            href="/dashboard"
            className="font-display font-bold text-sm tracking-widest uppercase"
            style={{ color: dm.textPrimary }}
          >
            DART
          </Link>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center rounded-md transition-colors hover:bg-white/[0.06]"
          style={{ color: dm.textMuted, padding: 6 }}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <PanelLeft
            className="w-4 h-4 transition-transform duration-200"
            style={{ transform: open ? "none" : "rotate(180deg)" }}
          />
        </button>
      </div>

      {open && (
        <>
          {/* New session */}
          <div className="px-3 py-3 shrink-0">
            <Link
              href="/dashboard"
              onClick={onMobileClose}
              className="flex items-center justify-center gap-2 w-full text-white text-xs font-semibold py-2.5 px-3 rounded-full transition-all duration-200 bg-[#0066FF] hover:bg-[#0052CC] shadow-[0_0_16px_rgba(0,102,255,0.2)]"
            >
              <Plus className="w-3.5 h-3.5" />
              New Session
            </Link>
          </div>

          {/* Search */}
          <div className="px-3 pb-2.5 shrink-0">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-full"
              style={{ background: dm.inputBg, border: `1px solid ${dm.inputBorder}` }}
            >
              <Search className="w-3 h-3 shrink-0" style={{ color: dm.textMuted }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations…"
                className="flex-1 bg-transparent text-xs focus:outline-none min-w-0 placeholder-[#6B7280]"
                style={{ color: dm.inputText }}
              />
            </div>
          </div>

          {/* Section label */}
          <p
            className="px-5 text-[10px] font-mono tracking-widest uppercase mb-2 shrink-0"
            style={{ color: "rgba(107,114,128,0.5)" }}
          >
            Conversations
          </p>

          {/* Session list */}
          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            {filtered.length === 0 && (
              <p className="text-xs px-2 py-4" style={{ color: dm.textMuted }}>
                {search ? "No results." : "No sessions yet."}
              </p>
            )}
            {filtered.map((session) => {
              const isActive = pathname === `/chat/${session.id}`;
              const isConfirming = confirming === session.id;
              return (
                <div
                  key={session.id}
                  className="relative group flex items-start gap-2 px-3 py-2.5 mb-1 cursor-pointer transition-colors duration-150 hover:bg-white/[0.05]"
                  style={{
                    borderRadius: "0.75rem",
                    background: isActive ? "rgba(255,255,255,0.10)" : undefined,
                    border: isActive
                      ? "1px solid rgba(255,255,255,0.10)"
                      : "1px solid transparent",
                  }}
                >
                  <Link href={`/chat/${session.id}`} onClick={onMobileClose} className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{ color: isActive ? dm.textPrimary : "rgba(248,249,250,0.6)" }}
                    >
                      {session.summary || session.software}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: dm.textMuted }}>
                      {session.software} · {relativeTime(session.created_at)}
                    </p>
                  </Link>

                  {isConfirming ? (
                    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="text-[10px] font-medium text-[#EF4444] hover:text-red-300 transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirming(null)}
                        className="text-[10px] transition-colors"
                        style={{ color: dm.textMuted }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setConfirming(session.id);
                      }}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pt-0.5 hover:text-[#EF4444]"
                      style={{ color: dm.textMuted }}
                      aria-label="Delete session"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User footer */}
          <div
            className="px-3 py-4 shrink-0"
            style={{ borderTop: `1px solid ${dm.divider}` }}
          >
            <div className="flex items-center gap-2.5 px-2">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(0,102,255,0.2)",
                  border: "1px solid rgba(0,102,255,0.3)",
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, color: dm.accent }}>
                  {userEmail?.[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
              <p className="text-xs truncate flex-1" style={{ color: dm.textMuted }}>
                {userEmail}
              </p>
              <button
                onClick={handleSignOut}
                className="shrink-0 transition-colors hover:text-[#F8F9FA]"
                style={{ color: dm.textMuted }}
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
