import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { transcript } = await request.json();

  if (!transcript || typeof transcript !== "string") {
    return NextResponse.json({ error: "transcript is required" }, { status: 400 });
  }

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: `Summarize this IT support session in one sentence. Focus on what the user was trying to do and whether it was resolved.\n\n${transcript}`,
      },
    ],
  });

  const summary =
    message.content[0].type === "text" ? message.content[0].text.trim() : "";

  return NextResponse.json({ summary });
}
