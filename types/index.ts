import { Marketplace, NFTCollection } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";

// For general use case
export type ObjectArray = Array<{
  [key: string]: string;
}>;

export type NFT = {
  id: string;
  name: string;
  image: string;
  description: string;
  background_color: string;
  uri: string;
  external_url: string;
  likes: number;
};

export type Listing = {
  id: string;
  asset: NFT;
  assetContractAddress: string;
  buyoutCurrencyValuePerToken: {
    name: string;
    symbol: string;
    decimals: number;
    value: string;
    displayValue: string;
  };
  currencyBuyoutPrice: BigNumber;
  buyoutPrice: BigNumber;
  quanitiy: BigNumber;
  secondsUnitilEnd: BigNumber;
  sellerAddress: string;
  startTimeInSeconds: BigNumber;
  tokenId: BigNumber;
};

export type ContextType = {
  nfts: Array<NFT>;
  listings: Array<Listing>;
  loaded: boolean;
  marketPlaceContract: Promise<Marketplace> | undefined;
  nftContract: Promise<NFTCollection> | undefined;
};

export type NFTProps = {
  selectedNft: NFT;
};
