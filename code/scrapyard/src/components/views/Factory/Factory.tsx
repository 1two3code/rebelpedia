import * as nftPolygon from "../../../assets/data/hasse.eth.json";
import { assetToBot, InfuraAsset } from "../../../integrations/infura";
import { botToDeck } from "../../../integrations/rebelbots";
import { Deck } from "../../Deck/Deck";
import "./Factory.scss";

const figtherBotContract = "0x17892c8c3eb60c144872c18f013626471c3658bf";

const { assets } = nftPolygon;
const botAssets = assets?.filter(
  (asset) => asset.contract === figtherBotContract
) as InfuraAsset[];
const bots = botAssets.map(assetToBot);

function Factory() {
  return (
    <div className="factory">
      <h1>Factory</h1>
      <div>
        {bots.map((bot) => (
          <Deck key={bot.id} cards={botToDeck(bot)} />
        ))}
      </div>
    </div>
  );
}

export default Factory;
