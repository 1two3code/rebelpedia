import { Attribute } from "./rebelbots/Card"

export namespace RebelBots {
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

    export type Bot = {
      id: number,
      name: string,
      image: string,
      description: string,
      attributes: { [x in Traits.Types]: Attribute }
    }
  }
}