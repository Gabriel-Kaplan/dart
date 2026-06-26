import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId, role, content } = await request.json();

  if (!sessionId || !role || !content) {
    return NextResponse.json({ error: "sessionId, role, and content are required" }, { status: 400 });
  }

  if (role !== "user" && role !== "assistant") {
    return NextResponse.json({ error: "role must be user or assistant" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({ session_id: sessionId, role, content })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
