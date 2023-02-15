
import { FightingBots, Card } from "../../../integrations/rebelbots";
type SortDirection = "ascending" | "descending";
type SortFunction = (cardA: Card, cardB: Card) => number;

export const rarityIndicies = {
  [FightingBots.Traits.Rarity.Common]: 1,
  [FightingBots.Traits.Rarity.Rare]: 2,
  [FightingBots.Traits.Rarity.Epic]: 3,
  [FightingBots.Traits.Rarity.Legendary]: 4,
};

const sortDirection = (direction: SortDirection) => (
  ascendingSort: SortFunction,
  descendingSort: SortFunction
) => direction === "ascending"
    ? ascendingSort
    : descendingSort

export const sortByRarity = (direction: SortDirection) =>
  sortDirection(direction)(
    (cardA: Card, cardB: Card) => rarityIndicies[cardA.rarity] - rarityIndicies[cardB.rarity],
    (cardA: Card, cardB: Card) => rarityIndicies[cardB.rarity] - rarityIndicies[cardA.rarity]
  )

export const sortByAttackType = (direction: SortDirection) =>
  sortDirection(direction)(
    (cardA: Card, cardB: Card) => cardA.attack.localeCompare(cardB.attack),
    (cardA: Card, cardB: Card) => cardB.attack.localeCompare(cardA.attack)
  )