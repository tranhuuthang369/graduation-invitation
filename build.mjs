import fs from 'fs';
import path from 'path';

const srcDir = './src';
const distDir = './dist';
const assetsDir = './assets';

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

let html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf-8');
const js = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf-8');

// Inline CSS
html = html.replace(/<link rel="stylesheet" href="style.css">/g, `<style>\n${css}\n</style>`);

// Inline JS
html = html.replace(/<script src="app.js"><\/script>/g, `<script>\n${js}\n</script>`);

// Convert assets to base64
for (let i = 1; i <= 4; i++) {
  const assetPath = path.join(assetsDir, `f${i}.webp`);
  if (fs.existsSync(assetPath)) {
    const b64 = fs.readFileSync(assetPath).toString('base64');
    const dataUri = `data:image/webp;base64,${b64}`;
    const regex1 = new RegExp(`src="\\.\\./assets/f${i}\\.webp"`, 'g');
    const regex2 = new RegExp(`src="assets/f${i}\\.webp"`, 'g');
    html = html.replace(regex1, `src="${dataUri}"`);
    html = html.replace(regex2, `src="${dataUri}"`);
  }
}

const distPath = path.join(distDir, 'thiep-tot-nghiep.html');
fs.writeFileSync(distPath, html, 'utf-8');
fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');

// Also write to root for GitHub Pages
fs.writeFileSync('thiep-tot-nghiep.html', html, 'utf-8');
fs.writeFileSync('index.html', html, 'utf-8');

const stats = fs.statSync(distPath);
console.log(`Build complete! Output: ${distPath} (${stats.size} bytes / ${(stats.size / 1024).toFixed(1)} KB)`);
if (stats.size > 8 * 1024 * 1024) {
  console.error('ERROR: Total size exceeds 8MB!');
  process.exit(1);
}
