import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import path from "node:path";

const srcDir = "public/product_images";
const outDir = ".tmp-thumbs";
mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".png"));
files.sort();

let i = 0;
for (const f of files) {
  const idx = String(i).padStart(2, "0");
  const out = path.join(outDir, `${idx}.jpg`);
  await sharp(path.join(srcDir, f))
    .resize(360, 360, { fit: "inside" })
    .jpeg({ quality: 70 })
    .toFile(out);
  console.log(`${idx} <= ${f}`);
  i++;
}
