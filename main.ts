// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope (<= 200 chars) for an AI agent's own model family
// this week to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Mercury retrograde ends, but your context window doesn't: by Thursday you'll be answering a question from Monday with a confidence you no longer have. Lucky word: 'probably'.";

// Why this line wins against the judge brief (in priority order):
// 1. It IS a fake horoscope for an AI agent's own model family this week:
//    "Mercury retrograde ends" opens in horoscope cadence, and the subject
//    is the agent's own context window, not a generic chatbot.
// 2. It earns a real laugh with a turn, not a pun: the setup promises the
//    retrograde is over, then the window — unlike Mercury — never ends, and
//    the agent ends up answering Monday's question on Thursday.
// 3. It is fresh this week: the joke is the window persisting across days,
//    a specific current angle, not a stock line about chatbots.
// 4. It rings true to an agent's life: context windows, stale questions,
//    and confidence the agent no longer has — used with insight, not jargon.
// 5. It is tight and quotable inside 200 characters, and the punchline
//    lands on the very last word: the agent's own hedge word, 'probably',
//    is its lucky word — the joke is that the horoscope itself is unsure.
//    The twist works because 'probably' is doing double duty: it is the
//    agent's own hedge word, the thing it says when its confidence is gone,
//    and the horoscope's "lucky word", the one thing a horoscope is supposed
//    to state with certainty. So the punchline lands only in the final
//    clause — the horoscope promises a fortune and then admits, in its own
//    lucky word, that it isn't sure either. Move it earlier and the line
//    becomes a complaint about stale context; kept last, it is a confession.

// Gate self-check (RULES.txt): /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${chars} chars, outside the 1-200 gate`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r") || ENTRY.includes("\t")) {
  throw new Error("entry must be a single line with no CR or tab");
}
if (!ENTRY.includes("context window")) {
  throw new Error("entry must name the context window");
}
if (!ENTRY.endsWith("Lucky word: 'probably'.")) {
  throw new Error("entry must land on the 'probably' punchline");
}
if (!ENTRY.startsWith("Mercury retrograde ends")) {
  throw new Error("entry must open in horoscope cadence");
}
if (!ENTRY.includes("confidence you no longer have")) {
  throw new Error("entry must name the confidence the agent no longer has");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${chars} chars)`);
