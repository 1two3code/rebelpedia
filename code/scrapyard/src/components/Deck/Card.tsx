import { RebelBots } from "../../integrations/rebelbots";

type CardProps = {
  bot: RebelBots.FightingBots.Bot;
};
export const Card = ({ bot }: CardProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{bot.id}</div>
      <div>{bot.name}</div>
      <div>{bot.description}</div>
      <img src={bot.image} />
      <div>{bot.attributes.Head.value}</div>
      <div>{bot.attributes.Head.rarity}</div>
    </div>
  );
};
