import { RebelBots } from "../rebelbots";

export type Card = {
  cardID: number;
  part: Part;
  partURI: string;
  cardURI: string;
  rarity: RebelBots.FightingBots.Traits.Rarity;
  cardName: string;
  type: Type;
  attack: Attack;
  cost: number;
  abilities: string[];
  damage: number;
  shiled: number;
  repair: number;
  target: Target[];
  cardDescription: string;
  tooltip: string;
  artID: string;
}

export enum Attack {
  Melee = "Melee",
  Ranged = "Ranged",
  Tactic = "Tactic",
}

export enum Part {
  Head = "Head",
  LeftArm = "Left Arm",
  Legs = "Legs",
  RightArm = "Right Arm",
  Torso = "Torso",
}

export enum Target {
  All = "all",
  First = "first",
  Last = "last",
  Na = "na",
  None = "none",
  Opponent = "opponent",
  Random = "random",
  Self = "self",
  Target = "target",
  TargetOpponent = "Opponent",
  TargetRandom = "Random",
  You = "you",
}

export enum Type {
  Engineer = "Engineer",
  Industrial = "Industrial",
  Military = "Military",
}

export interface Metadata {
  name: string;
  image: string;
  description: string;
  attributes: Attribute[];
}

export interface Attribute {
  trait_type: RebelBots.FightingBots.Trait;
  value: string;
  rarity?: RebelBots.FightingBots.Traits.Rarity;
}
