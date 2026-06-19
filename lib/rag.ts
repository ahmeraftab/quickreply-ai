/**
 * RAG pipeline shared by the browser demo (/api/chat) and the Twilio
 * WhatsApp webhook (/api/webhook).
 */

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, streamText, type CoreMessage } from "ai";
import { SYSTEM_PROMPT } from "@/data/kickvault";
import { retrieve, type RetrievedChunk } from "@/lib/vector-store";

export const GENERATION_MODEL = "gemini-2.5-flash";

// The Vercel AI SDK Google provider looks for GOOGLE_GENERATIVE_AI_API_KEY by
// default; we standardize on GEMINI_API_KEY across the project.
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY ?? "",
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Format retrieved chunks into a KNOWLEDGE block for the prompt. */
function buildContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map((c, i) => `[${i + 1}] ${c.title}\n${c.content}`)
    .join("\n\n");
}

/** Build the full message array (system + knowledge + history) for the model. */
async function buildMessages(
  query: string,
  history: ChatMessage[],
): Promise<{ system: string; messages: CoreMessage[] }> {
  const chunks = await retrieve(query, 4);
  const context = buildContext(chunks);

  const system = `${SYSTEM_PROMPT}

KNOWLEDGE (use only this to answer):
${context}`;

  const messages: CoreMessage[] = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: query },
  ];

  return { system, messages };
}

/** Stream a grounded response (used by the browser demo). */
export async function streamRagResponse(
  query: string,
  history: ChatMessage[] = [],
) {
  const { system, messages } = await buildMessages(query, history);
  return streamText({
    model: google(GENERATION_MODEL),
    system,
    messages,
    temperature: 0.4,
  });
}

/** Generate a complete grounded response (used by the WhatsApp webhook). */
export async function generateRagResponse(
  query: string,
  history: ChatMessage[] = [],
): Promise<string> {
  const { system, messages } = await buildMessages(query, history);
  const { text } = await generateText({
    model: google(GENERATION_MODEL),
    system,
    messages,
    temperature: 0.4,
  });
  return text.trim();
}
