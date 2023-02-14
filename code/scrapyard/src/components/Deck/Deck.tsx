import { RebelBots } from "../../integrations/rebelbots";

type DeckProps = {
  bot: RebelBots.FightingBots.Bot;
};
export const Deck = ({ bot }: DeckProps) => {
  return <div style={{ display: "flex", flexDirection: "column" }}></div>;
};
