import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import Header from "../../components/common/Header";
import NFTImage from "../../components/nfts/NFTImage";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const NFTItem = () => {
  const { provider } = useWeb3();
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [listings, setListings] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      // @ts-ignore
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
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
      setSelectedNft(nfts);
      setLoaded(true);
    })();
  }, [nftModule]);

  const marketPlaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      // @ts-ignore
      "https://eth-goerli.g.alchemy.com/v2/sJeqdSsAWetNNKmR__bWMkAXzcmh6a98"
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
    })();
  }, [marketPlaceModule]);

  return (
    <div>
      <Header />
      <NFTImage />
    </div>
  );
};

export default NFTItem;
