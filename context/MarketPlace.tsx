import { useContract, useMarketplace, useUser } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { providers } from "ethers";
import { NextComponentType, NextPageContext } from "next";
import { createContext, useState, useEffect, useMemo } from "react";
import { ContextType, Listing, NFT } from "../types";

// create a context for managing nfts and listings
export const MarketPlaceContext = createContext<ContextType>({
  nfts: [],
  listings: [],
  nftsLoaded: false,
  activeListingsLoaded: false,
  marketPlaceContract: undefined,
  nftContract: undefined,
});

type Props = {
  children: React.ReactNode;
};

export const MarketPlaceProvider = ({ children }: Props) => {
  const [nfts, setNfts] = useState<Array<NFT>>([]);
  const [listings, setListings] = useState<Array<Listing>>([]);
  const [nftsLoaded, setNftsLoaded] = useState(false);
  const [activeListingsLoaded, setActiveListingsLoaded] = useState(false);
  const { contract: marketPlaceContract } = useContract(
    "0xFE64BFAC909d23027691074E833DcB29a3233523",
    "marketplace"
  );
  const { contract: nftContract } = useContract(
    "0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75",
    "nft-collection"
  );

  // const nftContract = useMemo(() => {
  //   const sdk = new ThirdwebSDK(
  //     "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
  //   );
  //   return sdk.getContract(
  //     "0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75",
  //     "nft-collection"
  //   );
  // }, []);

  // const marketPlaceContract = useMemo(() => {
  //   const sdk = new ThirdwebSDK(
  //     "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
  //   );
  //   return sdk.getContract(
  //     "0xFE64BFAC909d23027691074E833DcB29a3233523",
  //     "marketplace"
  //   );
  // }, []);

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftContract) return;
    (async () => {
      // const nfts = await (await nftContract)!.getAll();
      const nfts = await nftContract!.getAll();
      // @ts-ignore
      setNfts(nfts);
      console.log("Context: nfts", nfts);
      setNftsLoaded(true);
    })();
  }, [nftContract]);

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceContract) return;
    (async () => {
      const listings = await marketPlaceContract!.getActiveListings();
      // @ts-ignore
      setListings(listings);
      setActiveListingsLoaded(true);
      console.log("Context: listings", listings);
    })();
  }, [marketPlaceContract]);

  return (
    <MarketPlaceContext.Provider
      value={{
        nfts,
        listings,
        nftsLoaded,
        activeListingsLoaded,
        marketPlaceContract,
        nftContract,
      }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
};
