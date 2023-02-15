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


/**
 * Download ability definitions and icons
 */
const stepAbilities = async () => {
  const abilities = await (await fetch('https://cdn.rebelbots.com/cards/keywords.json?refresh')).json() as any;
  await writeFile(join(dataFolder, 'abilities.json'), JSON.stringify(abilities))

  for (let i = 0; i < abilities.length; i++) {
    const { iconURL } = abilities[i];
    if (iconURL !== '') {
      console.log(`Downloading ability icon ${basename(iconURL)}`)
      await downloadImage(join(imageFolder, 'abilities'),iconURL)
    }
  }
}

/**
 * Download passive skill definitions and icons
 */
const stepPassiveSkills = async () => {
  const [industrial, engineer, military] = [
    ['shielded', 'resistant', 'tactical', 'well-equipped'],
    ['aftermath', 'regeneration', 'agile', 'aggressive'],
    ['adaptable', 'amass', 'tough', 'charged']
  ];
  const passiveSkills = [...industrial, ...engineer, ...military];

  for (let i = 1; i < passiveSkills.length + 1; i++) {
    console.log(`Downloading passive skill icons ${i}`)
    await downloadImage(join(imageFolder, 'passiveskills'), `https://cdn.rebelbots.com/cards/passiveskills/${passiveSkills[i]}.png`)
  }
}

/**
 * Download Kingdom Card definitions and images
 */
const stepKingdomCards = async () => {  
  const numKingdomCards= 6;
  const kingdomCards = [];
  const kingdomCardsStartIndex = 400

  for (let i = 1; i < numKingdomCards + 1; i++) {
    console.log(`Downloading Kingdom card ${i}`)
    const card = await (await fetch(`https://cdn.rebelbots.com/cards/${kingdomCardsStartIndex + i}.json`)).json() as any;
    kingdomCards.push(card);
  }
  await writeFile(join(dataFolder, 'kingdomCards.json'), JSON.stringify(kingdomCards))

  for (let i = 0; i < kingdomCards.length; i++) {
    console.log(`Downloading kingdom card image ${basename(kingdomCards[i].cardURI)}`)
    await downloadImage(join(imageFolder, 'kingdomCards'), kingdomCards[i].cardURI)
  }
}

/**
 * Download Card definitions and images
 */
const stepCardsAndParts = async () => {
  const numCards = 300;
  const cards = [];
  
  for (let i = 1; i < numCards + 1; i++) {
    console.log(`Downloading card ${i}`)
    const card = await (await fetch(`https://cdn.rebelbots.com/cards/${i}.json`)).json() as any;
    cards.push(card);
  }
  await writeFile(join(dataFolder, 'cards.json'), JSON.stringify(cards))

  const partUris = Array.from(new Set(cards.map(c => c.partURI)));
  for (let i = 0; i < partUris.length; i++) {
    console.log(`Downloading part image ${basename(partUris[i])}`)
    await downloadImage(join(imageFolder, 'parts'), partUris[i])
  }

  for (let i = 0; i < cards.length; i++) {
    console.log(`Downloading card image ${basename(cards[i].cardURI)}`)
    await downloadImage(join(imageFolder, 'cards'), cards[i].cardURI)
  }
}

async function main() {
  await stepAbilities();
  // await stepPassiveSkills();
  // await stepKingdomCards();
  // await stepCardsAndParts();

  console.log('Done!');
}

main();