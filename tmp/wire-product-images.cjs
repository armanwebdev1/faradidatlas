const fs = require("fs");

const filePath = "components/products/product-data.ts";
const mappings = [
  ["twenty-one-pinto-beans", "pintoBeans"],
  ["twenty-one-black-eyed-peas", "blackEyedPeas"],
  ["twenty-one-green-lentils", "greenLentils"],
  ["twenty-one-sunflower-seeds", "sunflowerSeeds"],
  ["twenty-one-pumpkin-seeds", "pumpkinSeeds"],
  ["twenty-one-sesame-seeds", "sesameSeeds"],
  ["twenty-one-peanuts", "peanuts"],
  ["twenty-one-desiccated-coconut", "desiccatedCoconut"],
  ["twenty-one-cardamom", "cardamom"],
  ["twenty-one-sugar", "sugar"],
];

let source = fs.readFileSync(filePath, "utf8");
const newline = source.includes("\r\n") ? "\r\n" : "\n";

for (const [slug, imageKey] of mappings) {
  const slugNeedle = `    slug: "${slug}",`;
  const slugIndex = source.indexOf(slugNeedle);

  if (slugIndex === -1) {
    throw new Error(`Could not find product slug: ${slug}`);
  }

  const objectEndNeedle = `${newline}  },`;
  const objectEndIndex = source.indexOf(objectEndNeedle, slugIndex);

  if (objectEndIndex === -1) {
    throw new Error(`Could not find object ending for product slug: ${slug}`);
  }

  const objectSource = source.slice(slugIndex, objectEndIndex);
  const insertLine = `    ...imageSet(productImages.${imageKey}),`;

  if (objectSource.includes(insertLine)) {
    continue;
  }

  source =
    source.slice(0, objectEndIndex) +
    `${newline}${insertLine}` +
    source.slice(objectEndIndex);
}

fs.writeFileSync(filePath, source);
