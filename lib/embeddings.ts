/**
 * Gemini text-embedding-004 helper.
 *
 * Uses the Generative Language REST API directly so it works both in the
 * Node build script (scripts/generate-embeddings.ts) and inside Next.js
 * route handlers without pulling in extra SDK surface.
 */

const EMBEDDING_MODEL = "text-embedding-004";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

interface EmbeddingResponse {
  embedding: { values: number[] };
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to your environment to enable embeddings.",
    );
  }
  return key;
}

/** Embed a single piece of text and return its vector. */
export async function embedText(
  text: string,
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY" = "RETRIEVAL_QUERY",
): Promise<number[]> {
  const apiKey = getApiKey();
  const res = await fetch(
    `${API_BASE}/models/${EMBEDDING_MODEL}:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: `models/${EMBEDDING_MODEL}`,
        content: { parts: [{ text }] },
        taskType,
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Embedding request failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as EmbeddingResponse;
  return data.embedding.values;
}

/** Embed many documents sequentially (keeps us well under rate limits). */
export async function embedDocuments(texts: string[]): Promise<number[][]> {
  const vectors: number[][] = [];
  for (const text of texts) {
    vectors.push(await embedText(text, "RETRIEVAL_DOCUMENT"));
  }
  return vectors;
}

/** Cosine similarity between two equal-length vectors. */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    dot += av * bv;
    normA += av * av;
    normB += bv * bv;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
