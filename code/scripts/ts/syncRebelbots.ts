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
  

  // Download all abilities
  const abilities = await (await fetch('https://cdn.rebelbots.com/cards/keywords.json?refresh')).json() as any;
  await writeFile(join(dataFolder, 'abilities.json'), JSON.stringify(abilities))

  // Download all passive skills
  const [industrial, engineer, military] = [
    ['shielded', 'resistant', 'tactical', 'well-equipped'],
    ['aftermath', 'regeneration', 'agile', 'aggressive'],
    ['adaptable', 'amass', 'tough', 'charged']
  ];
  const passives = [...industrial, ...engineer, ...military];

  // Download passive skills icons
  for (let i = 1; i < passives.length + 1; i++) {
    console.log(`Downloading passive skill icons ${i}`)
    await downloadImage(join(imageFolder, 'passives'), `https://cdn.rebelbots.com/cards/passiveskills/${passives[i]}.png`)
  }

  const numKingdomCards= 6;
  const kingdomCards = [];
  const kingdomCardsStartIndex = 400

  // Download all Kingdom cards data
  for (let i = 1; i < numKingdomCards + 1; i++) {
    console.log(`Downloading Kingdom card ${i}`)
    const card = await (await fetch(`https://cdn.rebelbots.com/cards/${kingdomCardsStartIndex + i}.json`)).json() as any;
    kingdomCards.push(card);
  }
  await writeFile(join(dataFolder, 'kingdomCards.json'), JSON.stringify(kingdomCards))

  // Download all Kingdom card images
  for (let i = 0; i < kingdomCards.length; i++) {
    console.log(`Downloading kingdom card image ${basename(kingdomCards[i].cardURI)}`)
    await downloadImage(join(imageFolder, 'kingdomCards'), kingdomCards[i].cardURI)
  }
  
  const numCards = 300;
  const cards = [];
  // Download all card data
  for (let i = 1; i < numCards + 1; i++) {
    console.log(`Downloading card ${i}`)
    const card = await (await fetch(`https://cdn.rebelbots.com/cards/${i}.json`)).json() as any;
    cards.push(card);
  }

  await writeFile(join(dataFolder, 'cards.json'), JSON.stringify(cards))

  // Download all part images
  const partUris = Array.from(new Set(cards.map(c => c.partURI)));
  for (let i = 0; i < partUris.length; i++) {
    console.log(`Downloading part image ${basename(partUris[i])}`)
    await downloadImage(join(imageFolder, 'parts'), partUris[i])
  }

  // Download all card images
  for (let i = 0; i < cards.length; i++) {
    console.log(`Downloading card image ${basename(cards[i].cardURI)}`)
    await downloadImage(join(imageFolder, 'cards'), cards[i].cardURI)
  }
}

main();