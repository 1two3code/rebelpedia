import { Card } from "../../integrations/rebelbots";

type DeckProps = {
  cards: Card[];
};
export const Deck = ({ cards }: DeckProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {cards.map((card) => (
        <img src={card.cardURI} alt={card.cardName} />
      ))}
    </div>
  );
};
