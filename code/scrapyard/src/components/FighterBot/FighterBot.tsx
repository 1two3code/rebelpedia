import { FightingBots } from "../../integrations/rebelbots";
import "./FighterBot.scss";

type FigtherBotProps = {
  bot: FightingBots.Bot;
};
export const FighterBot = ({ bot }: FigtherBotProps) => {
  return (
    <div className="fighter-bot">
      <h2>{bot.name}</h2>
      <img src={bot.image} alt={bot.name} />
    </div>
  );
};
