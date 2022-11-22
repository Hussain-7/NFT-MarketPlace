import { useAddress, useSDK, useUser } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { SocketAddress } from "net";
import { NextComponentType, NextPageContext } from "next";
import { createContext, useState, useEffect, useMemo } from "react";
import { ContextType, Listing, NFT } from "../types";
// create a context for managing nfts and listings
export const MarketPlaceContext = createContext<ContextType>({
  user: {
    address: "",
  },
  nfts: [],
  listings: [],
  userNfts: [],
  nftsLoaded: false,
  activeListingsLoaded: false,
  userNftsLoaded: false,
  marketPlaceContract: undefined,
  nftContract: undefined,
});

type Props = {
  children: React.ReactNode;
};

export const MarketPlaceProvider = ({ children }: Props) => {
  const address = useAddress();
  const [user, setUser] = useState<{
    address: string;
  }>({
    address: "",
  });
  const [nfts, setNfts] = useState<Array<NFT>>([]);
  const [userNfts, setUserNfts] = useState<Array<NFT>>([]);
  const [listings, setListings] = useState<Array<Listing>>([]);
  const [nftsLoaded, setNftsLoaded] = useState(false);
  const [userNftsLoaded, setUserNftsLoaded] = useState<boolean>(false);
  const [activeListingsLoaded, setActiveListingsLoaded] = useState(false);
  useEffect(() => {
    if (address) {
      setUser({
        address,
      });
    }
  }, [address]);
  const nftContract = useMemo(() => {
    const sdk = new ThirdwebSDK(
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
      // "goerli"
    );
    return sdk!.getContract(
      "0x97c4ffB08C8438e671951Ae957Dc77c1f0777D75",
      "nft-collection"
    );
  }, []);

  const marketPlaceContract = useMemo(() => {
    const sdk = new ThirdwebSDK(
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
      // "goerli"
    );
    return sdk!.getContract(
      "0xFE64BFAC909d23027691074E833DcB29a3233523",
      "marketplace"
    );
  }, []);
  // get all nfts owned by current user
  useEffect(() => {
    if (!nftContract || !user.address) return;
    (async () => {
      const nfts = await (await nftContract)!.getOwned(user.address);
      // @ts-ignore
      setUserNfts(nfts);
      console.log("Context: user nfts", nfts);
      setUserNftsLoaded(true);
    })();
  }, [nftContract, user.address]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftContract) return;
    (async () => {
      const nfts = await (await nftContract)!.getAll();
      // @ts-ignore
      setNfts(nfts);
      console.log("Context: nfts", nfts);
      setNftsLoaded(true);
    })();
  }, [nftContract, address]);

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceContract) return;
    (async () => {
      const listings = await (await marketPlaceContract)!.getActiveListings();
      // @ts-ignore
      setListings(listings);
      setActiveListingsLoaded(true);
      console.log("Context: listings", listings);
    })();
  }, [marketPlaceContract, address]);

  // get all events from marketplace contract
  useEffect(() => {
    if (!marketPlaceContract) return;
    (async () => {
      const newSales = await (await marketPlaceContract)!.events.getEvents(
        "NewSale",
        {}
      );
      const listingAdded = await (await marketPlaceContract)!.events.getEvents(
        "ListingAdded",
        {}
      );
      console.log("Context: events newSales", newSales);
      console.log("Context: events listingAdded", listingAdded);
    })();
  }, [marketPlaceContract, address]);

  return (
    <MarketPlaceContext.Provider
      value={{
        user,
        nfts,
        listings,
        userNfts,
        nftsLoaded,
        activeListingsLoaded,
        userNftsLoaded,
        marketPlaceContract,
        nftContract,
      }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
};
