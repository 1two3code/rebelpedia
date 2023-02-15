import * as nftPolygon from "../../../assets/data/hasse.eth.json";
import { assetToBot, InfuraAsset } from "../../../integrations/infura";
import { botToDeck } from "../../../integrations/rebelbots";
import { Deck } from "../../Deck/Deck";
import "./Scrapyard.scss";

const figtherBotContract = "0x17892c8c3eb60c144872c18f013626471c3658bf";

const { assets } = nftPolygon;
const botAssets = assets?.filter(
  (asset) => asset.contract === figtherBotContract
) as InfuraAsset[];
const bots = botAssets.map(assetToBot);

function Scrapyard() {
  return (
    <div className="scrapyard">
      <h1>Scrapyard</h1>
      <div>
        {bots.map((bot) => (
          <Deck key={bot.id} cards={botToDeck(bot)} />
        ))}
      </div>
    </div>
  );
}

export default Scrapyard;
