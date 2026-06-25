import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase/server";
import { getAgent } from "@/lib/agents";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_MESSAGES = 100;
const MAX_MESSAGE_LENGTH = 32_000;

export async function POST(request: NextRequest) {
  // Auth check — reject unauthenticated requests
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages, agentKey } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: "Too many messages" }, { status: 400 });
    }

    const sanitized = messages.map((m: { role: string; content: string }) => {
      if (typeof m.content !== "string" || typeof m.role !== "string") {
        throw new Error("Invalid message shape");
      }
      return {
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, MAX_MESSAGE_LENGTH),
      };
    });

    const agent = getAgent(agentKey ?? "general");

    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: agent.systemPrompt,
      messages: sanitized,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
