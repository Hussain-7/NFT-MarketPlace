import { useAddress, useSDK, useUser } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { SocketAddress } from "net";
import { NextComponentType, NextPageContext } from "next";
import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useQuery } from "react-query";
import { ContextType } from "../types";
// create a context for managing nfts and listings
export const MarketPlaceContext = createContext<ContextType>({
  user: {
    address: "",
  },
  nfts: [],
  listings: [],
  userNfts: [],
  userListings: [],
  nftsLoaded: false,
  activeListingsLoaded: false,
  userNftsLoaded: false,
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
  const [userListings, setUserListings] = useState<any[]>([]);
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

  // function with takes in a promise and returns a value object

  const marketPlaceContract = useMemo(async () => {
    const sdk = new ThirdwebSDK(
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
      // "goerli"
    );
    const contract = await sdk!.getContract(
      "0xFE64BFAC909d23027691074E833DcB29a3233523",
      "marketplace"
    );
    return contract;
  }, []);

  const getAllNfts = useCallback(async () => {
    return [];
    // return await (await nftContract)!.getAll();
    // @ts-ignore
  }, [nftContract, address]);
  const getUserNfts = useCallback(async () => {
    return [];
    // return await (await nftContract)!.getOwned(address);
    // @ts-ignore
  }, [nftContract, address]);
  const getActiveListings = useCallback(async () => {
    return [];
    // return await (await marketPlaceContract)!.getActiveListings();
  }, [marketPlaceContract, address]);

  const {
    data: nfts,
    error: nftsLoadingError,
    isLoading: nftsLoaded,
    refetch: refetchNfts,
  } = useQuery("getAllNfts", getAllNfts);
  const {
    data: userNfts,
    error: userNftsError,
    isLoading: userNftsLoaded,
    refetch: refetchUserNfts,
  } = useQuery("getUserNfts", getUserNfts, {
    enabled: !!address,
  });
  const {
    data: listings,
    error: activeListingsErrors,
    isLoading: activeListingsLoaded,
    refetch: refetchActiveListings,
  } = useQuery("getActiveListings", getActiveListings);
  useEffect(() => {
    // check if the user has any listings
    if (listings && listings.length > 0 && address) {
      const userListing = listings!.filter(
        (l: any) => l.sellerAddress === address
      );
      setUserListings(userListing);
    }
  }, [listings, address]);
  useEffect(() => {
    console.log("============================================================");
    console.log("data", nfts, userNfts, userListings, listings);
    console.log("isloaded", nftsLoaded, userNftsLoaded, activeListingsLoaded);
    console.log("error", nftsLoadingError, userNftsError, activeListingsErrors);
    console.log("============================================================");
  }, [nfts, userNfts, listings]);
  return (
    <MarketPlaceContext.Provider
      value={{
        user,
        nfts,
        listings,
        userNfts,
        userListings,
        nftsLoaded: !nftsLoaded,
        activeListingsLoaded: !activeListingsLoaded,
        userNftsLoaded: !userNftsLoaded,
      }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
};
