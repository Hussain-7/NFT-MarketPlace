import {
  useActiveListings,
  useAddress,
  useContract,
  useSDK,
  useUser,
} from "@thirdweb-dev/react";
import { AuctionListing, DirectListing, ThirdwebSDK } from "@thirdweb-dev/sdk";
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
  listedNfts: [],
  userListings: [],
  events: [],
  floorPrice: 0,
  volumeTraded: 0,
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
  const [volumeTraded, setVolumeTraded] = useState(0);
  useEffect(() => {
    if (address) {
      setUser({
        address,
      });
    }
  }, [address]);
  const nftContract = useMemo(() => {
    const sdk = new ThirdwebSDK(
      "https://eth-goerli.g.alchemy.com/v2/ve0bD3a4XW9jPjVI1TSLJdpyfzqOFNoR"
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
      "https://eth-goerli.g.alchemy.com/v2/ve0bD3a4XW9jPjVI1TSLJdpyfzqOFNoR"
      // "goerli"
    );
    const contract = await sdk!.getContract(
      "0x97d0C2f14EcecbBDe050EC1e6c28EF44BE60B4a0",
      "marketplace"
    );
    return contract;
  }, []);

  const getAllNfts = async () => {
    console.log("Running getAllNfts");
    // if (!nftContract) return [];
    return await (await nftContract)!.getAll();
    // @ts-ignore
  };
  const getUserNfts = async () => {
    console.log("Running getUserNfts");
    // if (!nftContract) return [];
    return await (await nftContract)!.getOwned(address);
    // @ts-ignore
  };
  const getActiveListings = async (): Promise<
    (AuctionListing | DirectListing)[]
  > => {
    console.log("Running getActiveListings");
    if (!address && !marketPlaceContract) return [];
    const result = await (await marketPlaceContract)!.getActiveListings();
    if (result.length > 0) return result;
    else return listings as (AuctionListing | DirectListing)[];
    // const result = await marketPlaceContract.getActiveListings();
    // return result;
  };

  const getAllMarkeplaceEvents = async () => {
    console.log("Running getAllMarkeplaceEvents");
    if (!nftContract || !address) return [];
    const newSaleEvents = await (await marketPlaceContract)!.events.getEvents(
      "NewSale"
    );
    const ListingAddedEvents =
      await (await marketPlaceContract)!.events.getEvents("ListingAdded");

    const events = [...newSaleEvents, ...ListingAddedEvents];
    console.log("events", events);
    // find volume volumeTraded
    setVolumeTraded(
      newSaleEvents.reduce((acc, event) => {
        return acc + parseInt(event.data.totalPricePaid._hex) / 10 ** 18;
      }, 0)
    );
    console.log("volumeTraded", volumeTraded);
    return events;
  };
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
  } = useQuery("getUserNfts", getUserNfts);
  const {
    status,
    data: listings,
    error: activeListingsErrors,
    isLoading: activeListingsLoaded,
    refetch: refetchActiveListings,
  } = useQuery("getActiveListings", getActiveListings);
  const {
    data: events,
    error: eventsError,
    isLoading: eventsLoaded,
    refetch: refetchEvents,
  } = useQuery("getAllMarkeplaceEvents", getAllMarkeplaceEvents);
  useEffect(() => {
    // check if the user has any listings
    if (listings && listings.length > 0 && address) {
      const userListing = listings!.filter(
        (l: any) => l.sellerAddress === address
      );
      setUserListings(userListing);
    }
  }, [listings, address]);

  const listedNfts = useMemo(() => {
    return nfts?.filter((nft) =>
      listings?.find((listing) => listing.asset.id === nft.metadata.id)
    );
  }, [listings, nfts]);

  useEffect(() => {
    console.log("============================================================");
    console.log("nfts", nfts);
    console.log("userNfts", userNfts);
    console.log("userListings", userListings);
    console.log("listings", listings);
    console.log("status", status);
    console.log("isloaded", nftsLoaded, userNftsLoaded, activeListingsLoaded);
    console.log("error", nftsLoadingError, userNftsError, activeListingsErrors);
    console.log("events", events);
    console.log("============================================================");
  }, [nfts, userNfts, listings, events, status]);
  return (
    <MarketPlaceContext.Provider
      value={{
        user,
        nfts,
        listings,
        userNfts,
        userListings,
        listedNfts,
        volumeTraded,
        events,
        nftsLoaded: !nftsLoaded,
        activeListingsLoaded: status === "success",
        userNftsLoaded: !userNftsLoaded,
        refetchNfts,
        refetchUserNfts,
        refetchActiveListings,
      }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
};
