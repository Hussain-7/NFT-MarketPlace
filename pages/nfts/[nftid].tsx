import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect, useContext } from "react";
import Header from "../../components/common/Header";
import GenralDetails from "../../components/nfts/GenralDetails";
import NFTImage from "../../components/nfts/NFTImage";
import { MarketPlaceContext } from "../../context/MarketPlace";
import { NFT } from "../../types";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const NFTItem = () => {
  const router = useRouter();
  const { nfts, listings, loaded } = useContext(MarketPlaceContext);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  useEffect(() => {
    console.log("nfts in NFTItem", nfts);
    if (nfts.length == 0) return;
    const nft = nfts.find((nft: NFT) => nft.id === router.query.nftid);
    setSelectedNft(nft);
    console.log("selectedNft", selectedNft);
  }, [nfts]);

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div>
              <GenralDetails selectedNft={selectedNft} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
