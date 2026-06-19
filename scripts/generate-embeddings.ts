/**
 * Precompute embeddings for the KickVault knowledge base.
 *
 *   GEMINI_API_KEY=xxx npm run embed
 *
 * Writes embeddings/knowledge.json which is loaded by the in-memory vector
 * store at runtime. Committing this file means production doesn't have to
 * re-embed on cold start. If the file is absent or empty, the vector store
 * falls back to embedding the chunks lazily at runtime.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { KICKVAULT_KNOWLEDGE } from "../data/kickvault";
import { embedDocuments } from "../lib/embeddings";

async function main(): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Set GEMINI_API_KEY before running `npm run embed`.");
  }

  console.log(`Embedding ${KICKVAULT_KNOWLEDGE.length} knowledge chunks...`);
  const vectors = await embedDocuments(
    KICKVAULT_KNOWLEDGE.map((c) => `${c.title}\n${c.content}`),
  );

  const chunks = KICKVAULT_KNOWLEDGE.map((chunk, i) => ({
    ...chunk,
    embedding: vectors[i] ?? [],
  }));

  const outDir = resolve(process.cwd(), "embeddings");
  mkdirSync(outDir, { recursive: true });

  const payload = {
    model: "text-embedding-004",
    generatedAt: new Date().toISOString(),
    chunks,
  };

  writeFileSync(
    resolve(outDir, "knowledge.json"),
    JSON.stringify(payload, null, 2),
    "utf-8",
  );

  console.log(
    `✓ Wrote embeddings/knowledge.json (${chunks.length} chunks, dim ${vectors[0]?.length ?? 0})`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
