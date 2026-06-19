import { type NextRequest, NextResponse } from "next/server";
import { streamRagResponse, type ChatMessage } from "@/lib/rag";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ChatRequestBody {
  message?: string;
  history?: ChatMessage[];
}

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json(
      { error: "A non-empty 'message' is required." },
      { status: 400 },
    );
  }

  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

  try {
    const result = await streamRagResponse(message, history);
    return result.toTextStreamResponse();
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate response: ${detail}` },
      { status: 500 },
    );
  }
}
