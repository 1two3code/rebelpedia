import { FightingBots, Cards } from "./rebelbots";

export type InfuraAsset = {
  tokenId: string;
  metadata: {
    name: string;
    image?: string;
    description: string;
    attributes?: Cards.Attribute[];
  } | null;
};

const botAttributeTraitsMap = new Map<
  FightingBots.Trait,
  FightingBots.Traits.Types
>([
  [FightingBots.Trait.Category, "Category"],
  [FightingBots.Trait.PassiveSkill, "PassiveSkill"],
  [FightingBots.Trait.Head, "Head"],
  [FightingBots.Trait.Torso, "Torso"],
  [FightingBots.Trait.LeftArm, "LeftArm"],
  [FightingBots.Trait.RightArm, "RightArm"],
  [FightingBots.Trait.Feet, "Feet"]
]);

export const assetToBot = (infuraAsset: InfuraAsset): FightingBots.Bot => {
  const attributes = Array.from(botAttributeTraitsMap).reduce((attributes, [infuraAttribute, botAttribute]) => {
    const atr = infuraAsset?.metadata?.attributes?.find(a => a?.trait_type === infuraAttribute)
    attributes[botAttribute] = atr!;
    return attributes;
  }, {} as unknown as FightingBots.BotAttributes);

  return {
    id: parseInt(infuraAsset?.tokenId || '0', 10),
    name: infuraAsset?.metadata!.name,
    image: infuraAsset?.metadata!.image || '',
    description: infuraAsset?.metadata!.description,
    attributes
  }
};
