import { Card as CardType, cdnToLocal } from "../../integrations/rebelbots";
import "./Card.scss";

type CardProps = {
  card: CardType;
};

export const Card = ({ card }: CardProps) => {
  return (
    <div className="card">
      <img src={cdnToLocal(card.cardURI)} alt={card.cardName} />
    </div>
  );
};
