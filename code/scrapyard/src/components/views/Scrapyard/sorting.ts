
import { FightingBots, Card } from "../../../integrations/rebelbots";
type SortDirection = "ascending" | "descending";

export const rarityIndicies = {
  [FightingBots.Traits.Rarity.Common]: 1,
  [FightingBots.Traits.Rarity.Rare]: 2,
  [FightingBots.Traits.Rarity.Epic]: 3,
  [FightingBots.Traits.Rarity.Legendary]: 4,
};

export const sortByRarity = (direction: SortDirection) =>
  direction === "ascending"
    ? (cardA: Card, cardB: Card) =>
      rarityIndicies[cardA.rarity] - rarityIndicies[cardB.rarity]
    : (cardA: Card, cardB: Card) =>
      rarityIndicies[cardB.rarity] - rarityIndicies[cardA.rarity];