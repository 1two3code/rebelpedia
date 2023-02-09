// scrape this: https://rebelbots.com/cardsExplorer

// card images: https://cdn.rebelbots.com/cards/cards/v1_l_mil4_head.png
// filename: v1_<rarity>_<class><#>_<part>.png
// rarity: l, e, r, c
// class: ind, mil, dom

// Card
// https://cdn.rebelbots.com/cards/261.json

// Abilities
// https://cdn.rebelbots.com/cards/keywords.json?refresh

// kingdom cards:
// https://cdn.rebelbots.com/cards/kingdomCards/Disrupt.png

import { createWriteStream } from 'fs';
import { join, basename, dirname } from 'path';

const assetFolder = 'code/scripts/assets/images';

async function download(filename: string) {
  const { default: fetch } = await import('node-fetch');

  const res = await fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png');
  await new Promise<void>((resolve, reject) => {
    const fileStream = createWriteStream(join(assetFolder, filename));
    res.body!.pipe(fileStream);
    res.body!.on("error", (err) => {
      reject(err);
    });
    fileStream.on("finish", function() {
      resolve();
    });
  });
}

async function main() {

  // todo:
  // for each 0 - 300
  //  get: https://cdn.rebelbots.com/cards/300.json
  // save to json

  // for each
  // get "partURI" and "cardURI" into assets

  // for (let i = 0; i < 300; i++) {
  //   const data = await (await fetch(`https://cdn.rebelbots.com/cards/${i}.json`)).json();
  // }

  const dir = dirname('https://cdn.rebelbots.com/cards/cards/v1_l_mil5_legs.png');
  const base = basename('https://cdn.rebelbots.com/cards/cards/v1_l_mil5_legs.png');
  console.log(dir)




}

main();