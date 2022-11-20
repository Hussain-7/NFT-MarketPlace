import { useWeb3 } from "@3rdweb/hooks";
import { MarketplaceModule, ThirdwebSDK } from "@3rdweb/sdk";
import { NextComponentType, NextPageContext } from "next";
import { createContext, useState, useEffect, useMemo } from "react";
import { ContextType, Listing, NFT } from "../types";

// create a context for managing nfts and listings
export const MarketPlaceContext = createContext<ContextType>({
  nfts: [],
  listings: [],
  loaded: false,
  marketPlaceModule: undefined,
});

type Props = {
  children: React.ReactNode;
};

// create a provider for the context
export const MarketPlaceProvider = ({ children }: Props) => {
  const { provider } = useWeb3();
  const [nfts, setNfts] = useState<Array<NFT>>([]);
  const [listings, setListings] = useState<Array<Listing>>([]);
  const [loaded, setLoaded] = useState(false);
  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // @ts-ignore
      // "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
    );
    return sdk.getNFTModule(
      "0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75" as string
    );
  }, [provider]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();
      // @ts-ignore
      setNfts(nfts);
      console.log("Context: nfts", nfts);
      setLoaded(true);
    })();
  }, [nftModule]);

  const marketPlaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // @ts-ignore
      // "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
    );
    return sdk.getMarketplaceModule(
      "0xFE64BFAC909d23027691074E833DcB29a3233523"
    );
  }, [provider]);

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return;
    (async () => {
      const listings = await marketPlaceModule.getAllListings();
      // @ts-ignore
      setListings(listings);
      console.log("Context: listings", listings);
    })();
  }, [marketPlaceModule]);
  return (
    <MarketPlaceContext.Provider
      value={{ nfts, listings, loaded, marketPlaceModule }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
};
