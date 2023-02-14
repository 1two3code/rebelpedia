export namespace FightingBots {
  export enum Trait {
    Category = "Category",
    Feet = "Feet",
    Head = "Head",
    LeftArm = "Left arm",
    PassiveSkill = "Passive skill",
    RightArm = "Right arm",
    Torso = "Torso",
  }

  export namespace Traits {
    export type Types = keyof typeof Trait;
    export type Category = 'INDUSTRIAL' | 'MILITARY' | 'ENGINEER'
    export enum Rarity {
      Common = "common",
      Epic = "epic",
      Legendary = "legendary",
      Rare = "rare",
    }
  }

  export type BotAttributes = { [x in Traits.Types]: Cards.Attribute };
  export type Bot = {
    id: number,
    name: string,
    image: string,
    description: string,
    attributes: BotAttributes
  }
}

export type Card = {
  cardID: number;
  part: Cards.Part;
  partURI: string;
  cardURI: string;
  rarity: FightingBots.Traits.Rarity;
  cardName: string;
  type: Cards.Type;
  attack: Cards.Attack;
  cost: number;
  abilities: Abilities.Name[];
  damage: number;
  shiled: number;
  repair: number;
  target: Cards.Target[];
  cardDescription: string;
  tooltip: string;
  artID: string;
}
export namespace Cards {
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
    attributes: Cards.Attribute[];
  }

  export interface Attribute {
    trait_type: FightingBots.Trait;
    value: string;
    rarity?: FightingBots.Traits.Rarity;
  }

}

export type Ability = {
  ID: number;
  Name: Abilities.Name;
  "Description (in game)": string;
  Grouping: string;
  Limit: number;
  "Stack Scaling": number;
  "Removal Rules": Abilities.RemovalRules;
  Icon: Abilities.ActionRequired;
  "Action Required?": Abilities.ActionRequired;
  "Action required Text": string;
  keywordEnum: string;
  iconURL: string;
}
export namespace Abilities {
  export type Name = 'Recycle' | 'Lucky' | 'Taunt' | 'Absorb' | 'Reflect' | 'Dodge' | 'Revenge' | 'Avenge' | 'Pierce' | 'Spiked' | 'Rapid-Fire' | 'Overheat' | 'Grounded' | 'Purge' | 'Unlucky' | 'Ransomware' | 'Overload' | 'Weak' | 'Frail' | 'Dazed' | 'Fizzle' | 'Burn' | 'Downgrade' | 'Target-Lock' | 'Zap' | 'Relocate' | 'Fixate' | 'Processing' | 'Anticipate' | 'Follow-Up' | 'Power-Up' | 'Deal-Damage' | 'Power' | 'Shield' | 'Draw' | 'Repair' | 'Energy' | 'Cost' | 'Discard' | 'Boost'

  export enum ActionRequired {
    Empty = "",
    No = "No",
    Yes = "Yes",
  }

  export enum RemovalRules {
    Buff1Removeall = "BUFF1_REMOVEALL",
    Buff2Remove1 = "BUFF2_REMOVE1",
    Buff2Removeall = "BUFF2_REMOVEALL",
    Empty = "",
    WhenUsed = "WHEN_USED",
  }

}

export const botToCards = (bot: FightingBots.Bot): Card[] => {

  // for each of bot.attributes ~

  return [{
    cardID: 1,
    part: Cards.Part.RightArm,
    partURI: "https://cdn.rebelbots.com/cards/parts/v1_ind1_right_arm.png",
    cardURI: "https://cdn.rebelbots.com/cards/cards/v1_c_ind1_right_arm.png",
    rarity: FightingBots.Traits.Rarity.Common,
    cardName: "Knock-Knock",
    type: Cards.Type.Industrial,
    attack: Cards.Attack.Melee,
    cost: 3,
    abilities: [
      "Relocate",
      "Deal-Damage"
    ],
    damage: 60,
    shiled: 0,
    repair: 0,
    target: [
      Cards.Target.Self,
      Cards.Target.First
    ],
    cardDescription: "Relocate self and attack closest enemy.",
    tooltip: "Attack type: Melee. Cost: 3. Damage: 60. Targeting squence: self, first",
    artID: "ind1_right_arm"
  }]
}
