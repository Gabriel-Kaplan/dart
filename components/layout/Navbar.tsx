"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";

type NavbarProps = {
  userEmail?: string;
};

export default function Navbar({ userEmail }: NavbarProps) {
  const router = useRouter();
  const supabase = createSupabaseClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  }

  return (
    <header className="h-12 border-b border-border bg-surface flex items-center px-4 shrink-0">
      <Link
        href="/dashboard"
        className="text-sm font-bold tracking-widest text-foreground hover:text-accent transition-colors"
      >
        DART
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {userEmail && (
          <span className="text-xs text-muted hidden sm:block">{userEmail}</span>
        )}
        <button
          onClick={signOut}
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
