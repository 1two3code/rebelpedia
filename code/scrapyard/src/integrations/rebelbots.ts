export namespace RebelBots {
  export namespace FigthingBots {
    export namespace Traits {
      export type Types = 'Category' | 'Passive skill' | 'Head' | 'Torso' | 'Left arm' | 'Right arm' | 'Feet'
      export type Category = 'INDUSTRIAL' | 'MILITARY' | 'ENGINEER'
      export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
    }

    export type Bot = {
      id: number,
      name: string,
      image: string,
      description: string,
      attributes: any
    }
  }
}