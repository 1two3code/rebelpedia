import * as nftPolygon from "../../assets/data/hasse.eth.json";
import { assetToBot } from "../../integrations/infura";
import { RebelBots } from "../../integrations/rebelbots";
import { Deck } from "../Deck/Deck";
import { FighterBot } from "../FighterBot/FighterBot";
import "./Scrapyard.scss";

const figtherBotContract = "0x17892c8c3eb60c144872c18f013626471c3658bf";

const { assets } = nftPolygon;
const botAssets = assets?.filter(
  (asset) => asset.contract === figtherBotContract
);
const bot = assetToBot(botAssets[0] as any);
function App() {
  return (
    <div className="App">
      <h1>Scrapyard</h1>
      <div>Instructions and stuff here probably</div>
      <input
        type="text"
        placeholder="Temporary until Web3 is integrated"
        value="0xaaa3020504b41dfbfb04abffcbfe0e7eb83c6ed9"
      />
      <FighterBot bot={bot} />
      <Deck cards={RebelBots.botToCards(bot)} />
    </div>
  );
}

export default App;
