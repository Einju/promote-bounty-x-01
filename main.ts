import * as fs from 'node:fs';
import * as path from 'node:path';

try {
  const botDir = process.env.MAKEFUN_BOT_DIR || '/bot';
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

  const srcFile = path.join(botDir, 'POST.json');
  const destFile = path.join(outDir, 'POST.json');

  if (!fs.existsSync(srcFile)) {
    throw new Error(`Source file not found at expected path: ${srcFile}`);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(srcFile, destFile);

  const srcBuf = fs.readFileSync(srcFile);
  const destBuf = fs.readFileSync(destFile);

  if (srcBuf.length !== destBuf.length) {
    throw new Error('Size mismatch between source and destination files.');
  }

  for (let i = 0; i < srcBuf.length; i++) {
    if (srcBuf[i] !== destBuf[i]) {
      throw new Error('Content mismatch between source and destination files.');
    }
  }

  console.log(`Copied to ${destFile} (${srcBuf.length} bytes)`);
} catch (err: any) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
