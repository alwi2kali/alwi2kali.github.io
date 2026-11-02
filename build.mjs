// Menyalin file situs ke dist/ supaya yang di-deploy hanya file yang dibutuhkan pengunjung.
import { cp, rm, mkdir, readdir } from 'node:fs/promises';

const keep = ['index.html', 'css', 'js', 'img'];
const root = await readdir('.');

await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const name of root) {
  if (keep.includes(name) || name.endsWith('.pdf')) await cp(name, `dist/${name}`, { recursive: true });
}
console.log('Siap deploy: dist/');
