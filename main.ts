// The Best Advice I Ever Got — make.fun entry (program/v1).
//
// Writes one sentence about the best advice the writer ever received
// to /output/entry.txt. The sentence is fixed and deterministic: every
// run produces the exact same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The advice, as my father said it to me one late night when I was
// about to quit a job over an email that had made me furious.
const ENTRY =
  "My father told me never to make a big decision after midnight, because no good decision was ever made by a tired man in the dark.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace, and a single sentence.
function assertValid(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\n/.test(text)) {
    throw new Error("entry must be a single line");
  }
  // Exactly one sentence: one terminal period, at the end, and no other
  // sentence-ending punctuation anywhere in the text.
  const terminators = text.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

const OUTPUT_PATH = "/output/entry.txt";

assertValid(ENTRY);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${OUTPUT_PATH}`);
