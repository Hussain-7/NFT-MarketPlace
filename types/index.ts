import {
  AuctionListing,
  ContractEvent,
  DirectListing,
  Marketplace,
  NFT,
  NFTCollection,
} from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

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
  volumeTraded: number;
  nftsLoaded: boolean;
  activeListingsLoaded: boolean;
  userNftsLoaded: boolean;
  events: ContractEvent<Record<string, any>>[] | undefined;
  refetchActiveListings?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<(AuctionListing | DirectListing)[], unknown>
  >;
  refetchUserNfts?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<NFT[], unknown>>;
  refetchNfts?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<NFT[], unknown>>;
};

export type NFTProps = {
  selectedNft: NFT;
};
