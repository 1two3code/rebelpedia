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

import { promises } from 'fs';
import { join, basename } from 'path';

const { writeFile } = promises;

const assetsFolder = 'code/scripts/assets';
const imageFolder = join(assetsFolder, 'images');
const dataFolder = join(assetsFolder, 'data');

async function downloadImage(folder: string, uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(join(folder, basename(uri)), buffer);
}

async function main() {

  // Sync all data from rebelbots with local assets folder

  // const { default: fetch } = await import('node-fetch');



  // for each CARD
  //   Update partURI and cardURI to the local one

  const numCards = 300;
  const cards = [];
  for (let i = 1; i < numCards + 1; i++) {
    console.log(`Downloading card ${i}`)
    const card = await (await fetch(`https://cdn.rebelbots.com/cards/${i}.json`)).json() as any;
    cards.push(card);
  }

  await writeFile(join(dataFolder, 'cards.json'), JSON.stringify(cards))

  // for each unique "partURI"
  //   download image assets/images/parts
  const partUris = Array.from(new Set(cards.map(c => c.partURI)));
  for (let i = 0; i < partUris.length; i++) {
    console.log(`Downloading image ${basename(partUris[i])}`)
    await downloadImage(join(imageFolder, 'parts'), partUris[i])
    // await new Promise(r => setTimeout(r, 20));
  }
  
  // for each "cardURI"
  //   download image into assets/images/cards
  
  for (let i = 0; i < cards.length; i++) {
    console.log(`Downloading image ${basename(cards[i].cardURI)}`)
    await downloadImage(join(imageFolder, 'cards'), cards[i].cardURI)
    // await new Promise(r => setTimeout(r, 20));
  }


  // const dir = dirname('https://cdn.rebelbots.com/cards/cards/v1_l_mil5_legs.png');
  // const base = basename('https://cdn.rebelbots.com/cards/cards/v1_l_mil5_legs.png');
  // console.log(dir)

}

main();