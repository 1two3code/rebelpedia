import { cdnToLocal } from "./rebelbots";

describe('cdnToLocal', () => {
  it("card URL", () => {
    const cardUrl = 'https://cdn.rebelbots.com/cards/cards/v1_c_dom1_torso.png';
    expect(cdnToLocal(cardUrl)).toBe('images/cards/v1_c_dom1_torso.png');
  });

  it("part URL", () => {
    const partUrl = 'https://cdn.rebelbots.com/cards/parts/v1_dom1_torso.png';
    expect(cdnToLocal(partUrl)).toBe('images/parts/v1_dom1_torso.png');
  });

  it("abilities URL", () => {
    const iconUrl = 'https://cdn.rebelbots.com/cards/keywords/Lucky.png';
    expect(cdnToLocal(iconUrl)).toBe('images/abilities/Lucky.png');
  });

  it("passives URL", () => {
    const passivesUrl = 'https://cdn.rebelbots.com/cards/passiveskills/adaptable.png';
    expect(cdnToLocal(passivesUrl)).toBe('images/passiveskills/adaptable.png');
  });
})
