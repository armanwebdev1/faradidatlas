const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const sourceDir = path.join("public", "product_images");
const outputDir = path.join(sourceDir, "optimized");

const imageMap = [
  ["ChatGPT Image Jun 17, 2026, 01_19_30 PM.png", "mizban-super-basmati.webp"],
  ["ChatGPT Image Jun 17, 2026, 01_19_45 PM.png", "mizban-white-basmati.webp"],
  ["ChatGPT Image Jun 17, 2026, 01_55_22 PM (5).png", "golbanoo-386-basmati.webp"],
  ["ChatGPT Image Jun 17, 2026, 01_55_22 PM (6).png", "hayat-thai-jasmine.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_01_59 PM (1).png", "turmeric.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_01_59 PM (2).png", "walnut-kernels.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_00 PM (3).png", "sunflower-seed-kernels.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_01 PM (4).png", "pumpkin-seed-kernels.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_02 PM (5).png", "cashew-nuts.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_18 PM (1).png", "red-lentil.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_18 PM (2).png", "chickpeas.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_19 PM (3).png", "white-bean-bag.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_19 PM (4).png", "mung-bean.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_20 PM (5).png", "kidney-bean.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_21 PM (6).png", "desi-chickpea.webp"],
  ["ChatGPT Image Jun 17, 2026, 04_02_24 PM (10).png", "popcorn-corn.webp"],
  ["ChatGPT Image Jun 17, 2026, 06_04_31 PM (1).png", "golbanoo-sella-basmati.webp"],
  ["ChatGPT Image Jun 17, 2026, 06_04_31 PM (2).png", "twenty-one-sella-basmati.webp"],
  ["ChatGPT Image Jun 17, 2026, 01_54_42 PM (3).png", "white-beans-box.webp"],
  ["ChatGPT Image Jun 28, 2026, 12_50_28 PM.png", "pinto-beans.webp"],
  ["ChatGPT Image Jun 28, 2026, 12_54_00 PM.png", "black-eyed-peas.webp"],
  ["ChatGPT Image Jun 28, 2026, 12_57_12 PM.png", "green-lentils.webp"],
  ["ChatGPT Image Jun 28, 2026, 12_59_34 PM.png", "sunflower-seeds.webp"],
  ["ChatGPT Image Jun 28, 2026, 01_20_54 PM.png", "pumpkin-seeds.webp"],
  ["ChatGPT Image Jun 28, 2026, 01_23_05 PM.png", "sesame-seeds.webp"],
  ["ChatGPT Image Jun 28, 2026, 01_34_04 PM.png", "peanuts.webp"],
  ["ChatGPT Image Jun 28, 2026, 01_38_58 PM.png", "desiccated-coconut.webp"],
  ["ChatGPT Image Jun 28, 2026, 01_42_11 PM.png", "cardamom.webp"],
  ["ChatGPT Image Jun 28, 2026, 02_05_11 PM.png", "sugar.webp"],
  ["وزن خالص به فارسی 20 باشه.png", "black-pepper.webp"],
];

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  for (const [sourceName, outputName] of imageMap) {
    const sourcePath = path.join(sourceDir, sourceName);
    const outputPath = path.join(outputDir, outputName);

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing source image: ${sourcePath}`);
    }

    await sharp(sourcePath)
      .rotate()
      .resize({
        width: 960,
        height: 1200,
        fit: "cover",
        position: "center",
      })
      .webp({
        quality: 82,
        effort: 5,
        smartSubsample: true,
      })
      .toFile(outputPath);

    const { width, height } = await sharp(outputPath).metadata();
    const size = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`${outputName}\t${width}x${height}\t${size} KB`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
