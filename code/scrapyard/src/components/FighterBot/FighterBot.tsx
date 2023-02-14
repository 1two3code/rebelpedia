import { RebelBots } from "../../integrations/rebelbots";

type FigtherBotProps = {
  bot: RebelBots.FigthingBots.Bot;
};
export const FighterBot = ({ bot }: FigtherBotProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{bot.id}</div>
      <div>{bot.name}</div>
      <div>{bot.description}</div>
      <img src={bot.image} />
      <div>{bot.attributes.head.value}</div>
      <div>{bot.attributes.head.rarity}</div>
    </div>
  );
};
