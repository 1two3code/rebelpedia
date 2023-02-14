import { RebelBots } from "./rebelbots";

type InfuraAsset = {
  tokenId: string;
  metadata: {
    name: string;
    image?: string;
    description: string;
    attributes?: Array<{
      trait_type: string;
      value: string | number;
      rarity?: string;
    }> | null;
  } | null;
};

const botAttributeTraitsMap = new Map<
  RebelBots.FigthingBots.Traits.Types,
  string
>([
  ["Category", "category"],
  ["Passive skill", "passive_skill"],
  ["Head", "head"],
  ["Torso", "torso"],
  ["Left arm", "left_arm"],
  ["Right arm", "right_arm"],
  ["Feet", "fett"],
]);
// [x: RebelBots.FightingBots.Traits.Types]: 

export const assetToBot = (infuraAsset: InfuraAsset) => {
  const attributes = Array.from(botAttributeTraitsMap).reduce((attributes, [infuraAttribute, botAttribute]) => {
    const atr = infuraAsset?.metadata?.attributes?.find(a => a?.trait_type === infuraAttribute)
    attributes[botAttribute] = { value: atr?.value, rarity: atr?.rarity }
    return attributes;
  }, {} as unknown as any);

  return {
    id: parseInt(infuraAsset?.tokenId || '0', 10),
    name: infuraAsset?.metadata!.name,
    image: infuraAsset?.metadata!.image || '',
    description: infuraAsset?.metadata!.description,
    attributes
  }
};
