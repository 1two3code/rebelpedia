import { RebelBots } from "../../integrations/rebelbots";

type DeckProps = {
  cards: RebelBots.Card[];
};
export const Deck = ({ cards }: DeckProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {cards[0].part}
    </div>
  );
};
