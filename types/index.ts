import {
  AuctionListing,
  DirectListing,
  Marketplace,
  NFT,
  NFTCollection,
} from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";

// For general use case
export type ObjectArray = Array<{
  [key: string]: string;
}>;
export type NFT_METADATA = {
  id: string;
  name: string;
  image: string;
  description: string;
  background_color: string;
  uri: string;
  external_url: string;
  likes: number;
};
// export type NFT = {
//   owner: string;
//   type: string;
//   supply: string;
//   metadata: NFT_METADATA;
// };

// export type Listing = {
//   id: string;
//   asset: NFT_METADATA;
//   assetContractAddress: string;
//   buyoutCurrencyValuePerToken: {
//     name: string;
//     symbol: string;
//     decimals: number;
//     value: string;
//     displayValue: string;
//   };
//   currencyBuyoutPrice: BigNumber;
//   buyoutPrice: BigNumber;
//   quanitiy: BigNumber;
//   secondsUnitilEnd: BigNumber;
//   sellerAddress: string;
//   startTimeInSeconds: BigNumber;
//   tokenId: BigNumber;
// };

export type ContextType = {
  user: {
    address: string;
  };
  nfts: NFT[] | undefined;
  listings: (AuctionListing | DirectListing)[] | undefined;
  userListings: (AuctionListing | DirectListing)[] | undefined;
  userNfts: NFT[] | undefined;
  nftsLoaded: boolean;
  activeListingsLoaded: boolean;
  userNftsLoaded: boolean;
};

export type NFTProps = {
  selectedNft: NFT;
};
