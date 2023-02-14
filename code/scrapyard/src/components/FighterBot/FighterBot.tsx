import { FightingBots } from "../../integrations/rebelbots";

type FigtherBotProps = {
  bot: FightingBots.Bot;
};
export const FighterBot = ({ bot }: FigtherBotProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{bot.id}</div>
      <div>{bot.name}</div>
      <div>{bot.description}</div>
      <img src={bot.image} alt={bot.name} />
      <div>{bot.attributes.Head.value}</div>
      <div>{bot.attributes.Head.rarity}</div>
    </div>
  );
};
