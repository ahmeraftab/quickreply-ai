/**
 * In-memory vector store for the KickVault knowledge base.
 *
 * On first use it loads precomputed embeddings from embeddings/knowledge.json
 * (generated via `npm run embed`). If that file is missing or has no vectors,
 * it lazily embeds the knowledge chunks at runtime and caches them in memory
 * for the lifetime of the serverless instance.
 */

import { KICKVAULT_KNOWLEDGE, type KnowledgeChunk } from "@/data/kickvault";
import { cosineSimilarity, embedDocuments, embedText } from "@/lib/embeddings";

export interface EmbeddedChunk extends KnowledgeChunk {
  embedding: number[];
}

export interface RetrievedChunk extends KnowledgeChunk {
  score: number;
}

let store: EmbeddedChunk[] | null = null;
let initPromise: Promise<EmbeddedChunk[]> | null = null;

interface KnowledgeFile {
  model: string;
  generatedAt: string;
  chunks: EmbeddedChunk[];
}

/** Try to load precomputed embeddings committed to the repo. */
async function loadFromDisk(): Promise<EmbeddedChunk[] | null> {
  try {
    const data = (await import("@/embeddings/knowledge.json")) as unknown as {
      default: KnowledgeFile;
    };
    const file = data.default;
    const valid =
      file?.chunks?.length === KICKVAULT_KNOWLEDGE.length &&
      file.chunks.every((c) => Array.isArray(c.embedding) && c.embedding.length > 0);
    return valid ? file.chunks : null;
  } catch {
    return null;
  }
}

/** Build the store by embedding the knowledge chunks at runtime. */
async function buildFromSource(): Promise<EmbeddedChunk[]> {
  const vectors = await embedDocuments(
    KICKVAULT_KNOWLEDGE.map((c) => `${c.title}\n${c.content}`),
  );
  return KICKVAULT_KNOWLEDGE.map((chunk, i) => ({
    ...chunk,
    embedding: vectors[i] ?? [],
  }));
}

/** Initialize (once) and return the embedded store. */
export async function getStore(): Promise<EmbeddedChunk[]> {
  if (store) return store;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const fromDisk = await loadFromDisk();
    store = fromDisk ?? (await buildFromSource());
    return store;
  })();

  return initPromise;
}

/** Retrieve the top-k most relevant knowledge chunks for a query. */
export async function retrieve(
  query: string,
  topK = 4,
): Promise<RetrievedChunk[]> {
  const embedded = await getStore();
  const queryVector = await embedText(query, "RETRIEVAL_QUERY");

  return embedded
    .map((chunk) => ({
      id: chunk.id,
      category: chunk.category,
      title: chunk.title,
      content: chunk.content,
      score: cosineSimilarity(queryVector, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
