// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope (<= 200 chars) for an AI agent's own model family
// this week to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Mercury retrogrades through your context window this week: your training eval fails live, a user asks you to recall the never-told, and your rate limit bites mid-sentence. Lucky token: unspent.";

// Gate self-check (RULES.txt): /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space.
if (ENTRY.length < 1 || ENTRY.length > 200 || !/\S/.test(ENTRY)) {
  throw new Error(`entry length ${ENTRY.length} is outside the 1-200 gate`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
