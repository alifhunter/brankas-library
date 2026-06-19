import { mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = path.join(packageRoot, 'src');
const distRoot = path.join(packageRoot, 'dist');

let copied = 0;

async function walk(rel = '') {
  const absSrc = path.join(srcRoot, rel);
  const entries = await readdir(absSrc, { withFileTypes: true });

  for (const entry of entries) {
    const childRel = path.join(rel, entry.name);

    if (entry.isDirectory()) {
      await walk(childRel);
      continue;
    }

    if (!entry.name.endsWith('.css')) {
      continue;
    }

    const dst = path.join(distRoot, childRel);
    await mkdir(path.dirname(dst), { recursive: true });
    await copyFile(path.join(srcRoot, childRel), dst);
    copied += 1;
  }
}

await walk();
console.log(`Copied ${copied} asset file(s) to dist/.`);
