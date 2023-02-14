import { RebelBots } from "./rebelbots";
import { Attribute } from "./rebelbots/Card";

type InfuraAsset = {
  tokenId: string;
  metadata: {
    name: string;
    image?: string;
    description: string;
    attributes?: Attribute[];
  } | null;
};

const botAttributeTraitsMap = new Map<
  RebelBots.FightingBots.Trait,
  RebelBots.FightingBots.Traits.Types
>([
  [RebelBots.FightingBots.Trait.Category, "Category"],
  [RebelBots.FightingBots.Trait.PassiveSkill, "PassiveSkill"],
  [RebelBots.FightingBots.Trait.Head, "Head"],
  [RebelBots.FightingBots.Trait.Torso, "Torso"],
  [RebelBots.FightingBots.Trait.LeftArm, "LeftArm"],
  [RebelBots.FightingBots.Trait.RightArm, "RightArm"],
  [RebelBots.FightingBots.Trait.Feet, "Feet"]
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
