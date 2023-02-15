import { Card as CardType } from "../../integrations/rebelbots";
import { Card } from "./Card";
import "./Deck.scss";

type DeckProps = {
  cards: CardType[];
};
export const Deck = ({ cards }: DeckProps) => {
  return (
    <div className="deck">
      {cards.map((card, i) => (
        <Card key={`${card.cardID}_${i}`} card={card} />
      ))}
    </div>
  );
};
