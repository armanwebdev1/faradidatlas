const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const escapeXml = (value) =>
  value.replace(/[&<>]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  })[char]);

async function main() {
  const dir = process.argv[2] ?? path.join("public", "product_images");
  const output = process.argv[3] ?? path.join("tmp", "product-source-contact-sheet.jpg");
  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
    .sort((a, b) => {
      const aTime = fs.statSync(path.join(dir, a)).mtimeMs;
      const bTime = fs.statSync(path.join(dir, b)).mtimeMs;

      return aTime - bTime || a.localeCompare(b);
    });

  const cellW = 300;
  const cellH = 360;
  const cols = 5;
  const rows = Math.ceil(files.length / cols);
  const composites = [];

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const x = (i % cols) * cellW;
    const y = Math.floor(i / cols) * cellH;
    const sourcePath = path.join(dir, file);
    const image = await sharp(sourcePath)
      .resize({
        width: 260,
        height: 260,
        fit: "inside",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toBuffer();

    composites.push({ input: image, left: x + 20, top: y + 18 });

    const label = escapeXml(file.length > 37 ? `${file.slice(0, 34)}...` : file);
    const size = Math.round(fs.statSync(sourcePath).size / 1024);
    const svg = `
      <svg width="${cellW}" height="82" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="4" width="276" height="66" rx="10" fill="white" opacity="0.94"/>
        <text x="22" y="31" font-family="Arial" font-size="22" font-weight="700" fill="#111">${String(i + 1).padStart(2, "0")}</text>
        <text x="64" y="28" font-family="Arial" font-size="12" fill="#222">${label}</text>
        <text x="64" y="49" font-family="Arial" font-size="11" fill="#666">${size} KB</text>
      </svg>
    `;

    composites.push({ input: Buffer.from(svg), left: x, top: y + 272 });
  }

  await sharp({
    create: {
      width: cols * cellW,
      height: rows * cellH,
      channels: 4,
      background: "#f6f4ef",
    },
  })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toFile(output);

  console.log(files.map((file, index) => `${String(index + 1).padStart(2, "0")} ${file}`).join("\n"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
