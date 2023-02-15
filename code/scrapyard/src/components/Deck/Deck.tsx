import { Card as CardType } from "../../integrations/rebelbots";
import { Card } from "./Card";
import "./Deck.scss";

type DeckProps = {
  cards: CardType[];
};
export const Deck = ({ cards }: DeckProps) => {
  return (
    <div className="deck">
      {cards.map((card) => (
        <Card key={card.cardID} card={card} />
      ))}
    </div>
  );
};
