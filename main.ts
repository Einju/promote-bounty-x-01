// Entry for post-x-promote-make-your-own-bounty-01 (Node 22, standard library
// only): copies POST.json from the repository root to /output/POST.json, where
// the gate reads the address of the X post. The post itself is the entry.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  const source = join(BOT_DIR, 'POST.json');
  const target = join(OUTPUT_DIR, 'POST.json');
  copyFileSync(source, target);
  const copied = readFileSync(target);
  if (!copied.equals(readFileSync(source))) {
    throw new Error('copied POST.json does not match the source');
  }
  console.log(`POST.json copied to ${target} (${copied.length} bytes)`);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
