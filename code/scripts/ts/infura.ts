import { Auth, SDK } from '@infura/sdk'

async function main() {
  const {
    INFURA_API_KEY,
    INFURA_API_SECRET,
    POLYGON_CHAIN_ID
  } = process.env;

  if (!INFURA_API_KEY || !POLYGON_CHAIN_ID) {
    return;
  }

  const auth = new Auth({
    chainId: parseInt(POLYGON_CHAIN_ID, 10),
    projectId: INFURA_API_KEY,
    secretId: INFURA_API_SECRET,
    provider: {
      host
    }
  })
  const sdk = new SDK(auth);
  const collectionNFT = await sdk.api.getNFTsForCollection({
    contractAddress: "<CONTRACT_ADDRESS>",
  });
  console.log('NFT Collection: \n', collectionNFT);
  console.log('NFT Metadata: \n', collectionNFT.assets[0].metadata);
}

main();