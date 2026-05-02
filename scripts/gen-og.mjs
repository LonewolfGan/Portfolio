import sharp from 'sharp';
import { readFileSync } from 'fs';

const W = 1200;
const H = 630;

const photoBuffer = readFileSync('./public/atlas.png');

// Resize photo to fit right side (crop to card height)
const photoResized = await sharp(photoBuffer)
  .resize({ height: H, fit: 'cover', position: 'top' })
  .toBuffer();

const { width: pw } = await sharp(photoResized).metadata();
// Place photo flush to right edge
const photoLeft = W - pw;

// ── Layer 1: solid dark background ────────────────────────────────────────
const bgSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b110c"/>
      <stop offset="100%" stop-color="#0d1a0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#2d7a3a" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#2d7a3a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
</svg>`;

// ── Layer 2: left-to-right fade (hides photo behind text panel) ────────────
// Opaque from x=0 → x=680, transparent by x=820
const fadeSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0b110c" stop-opacity="1"/>
      <stop offset="56%"  stop-color="#0b110c" stop-opacity="1"/>
      <stop offset="70%"  stop-color="#0b110c" stop-opacity="0.7"/>
      <stop offset="85%"  stop-color="#0b110c" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#0b110c" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
</svg>`;

// ── Layer 3: text + accent elements ───────────────────────────────────────
const textSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Left accent bar -->
  <rect x="60" y="0" width="3" height="${H}" fill="#2d7a3a" opacity="0.7"/>

  <!-- Mono label -->
  <text x="84" y="122"
    font-family="monospace" font-size="12" fill="#2d7a3a"
    letter-spacing="5" opacity="0.85">PORTFOLIO · 2025</text>

  <!-- Name line 1 -->
  <text x="82" y="258"
    font-family="serif" font-size="88" font-weight="bold"
    fill="#f2f2f2" letter-spacing="-3">Atlas</text>

  <!-- Name line 2 -->
  <text x="82" y="355"
    font-family="serif" font-size="88" font-weight="bold"
    fill="#f2f2f2" letter-spacing="-3">Lonewolf.</text>

  <!-- Green divider -->
  <rect x="82" y="376" width="56" height="2.5" fill="#2d7a3a"/>

  <!-- Tagline -->
  <text x="82" y="418"
    font-family="monospace" font-size="19" fill="#b0b0b0">Junior Full-Stack Developer</text>

  <!-- Tech stack -->
  <text x="82" y="452"
    font-family="monospace" font-size="13" fill="#555" letter-spacing="1">React · Node.js · TypeScript · SQL</text>

  <!-- URL badge background -->
  <rect x="82" y="528" width="244" height="38" rx="19"
    fill="#2d7a3a" fill-opacity="0.12"
    stroke="#2d7a3a" stroke-width="1" stroke-opacity="0.45"/>

  <!-- URL text -->
  <text x="204" y="552"
    font-family="monospace" font-size="13" fill="#3a9a4a"
    text-anchor="middle">atlaslonewolf.dev</text>
</svg>`;

// ── Composite everything ───────────────────────────────────────────────────
await sharp(Buffer.from(bgSvg))
  .composite([
    // Photo on the right
    { input: photoResized, left: Math.max(0, photoLeft), top: 0 },
    // Fade gradient over photo (left side stays solid)
    { input: Buffer.from(fadeSvg), left: 0, top: 0 },
    // Text on top of everything
    { input: Buffer.from(textSvg), left: 0, top: 0 },
  ])
  .png({ compressionLevel: 8 })
  .toFile('./public/og-image.png');

console.log('✅  OG image generated → public/og-image.png (1200×630)');
