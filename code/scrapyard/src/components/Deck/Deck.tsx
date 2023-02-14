import { Card } from "../../integrations/rebelbots";
import "./Deck.scss";

type DeckProps = {
  cards: Card[];
};
export const Deck = ({ cards }: DeckProps) => {
  return (
    <div className="deck">
      {cards.map((card) => (
        <div key={card.cardID}>
          <img src={card.cardURI} alt={card.cardName} />
        </div>
      ))}
    </div>
  );
};
