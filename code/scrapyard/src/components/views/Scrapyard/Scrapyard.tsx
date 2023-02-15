import * as nftPolygon from "../../../assets/data/hasse.eth.json";
import { assetToBot, InfuraAsset } from "../../../integrations/infura";
import { botToDeck } from "../../../integrations/rebelbots";
import { Deck } from "../../Deck/Deck";
import "./Scrapyard.scss";
import { sortByAttackType, sortByRarity } from "./sorting";

const figtherBotContract = "0x17892c8c3eb60c144872c18f013626471c3658bf";

const { assets } = nftPolygon;
const botAssets = assets?.filter(
  (asset) => asset.contract === figtherBotContract
) as InfuraAsset[];
const cards = botAssets.map(assetToBot).flatMap((bot) => botToDeck(bot));

const Scrapyard = () => {
  const sortFunction =
    sortByAttackType("ascending") || sortByRarity("descending");
  return (
    <div className="scrapyard">
      <h1>Scrapyard</h1>
      <Deck cards={cards.sort(sortFunction)} />
    </div>
  );
};

export default Scrapyard;
