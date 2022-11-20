import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect, useContext } from "react";
import Header from "../../components/common/Header";
import GenralDetails from "../../components/nfts/GenralDetails";
import ItemActivity from "../../components/nfts/ItemActivity";
import NFTImage from "../../components/nfts/NFTImage";
import Purchase from "../../components/nfts/Purchase";
import { MarketPlaceContext } from "../../context/MarketPlace";
import { NFT } from "../../types";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex flex-col space-y-8 md:flex-row md:space-y-0`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const NFTItem = () => {
  const router = useRouter();
  const { nfts, listings } = useContext(MarketPlaceContext);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  useEffect(() => {
    console.log("nfts in NFTItem", nfts);
    if (nfts.length == 0) return;
    const nft = nfts.find((nft: NFT) => nft.metadata.id === router.query.nftid);
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
            <div className={style.detailsContainer}>
              <GenralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router?.query?.isListed}
                selectedNft={selectedNft}
                listings={listings}
              />
            </div>
          </div>
          <ItemActivity selectedNft={selectedNft} />
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
