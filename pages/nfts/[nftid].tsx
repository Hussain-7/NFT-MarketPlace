import { useRouter } from "next/router";
import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import Header from "../../components/common/Header";
import GenralDetails from "../../components/nfts/GenralDetails";
import ItemActivity from "../../components/nfts/ItemActivity";
import NFTImage from "../../components/nfts/NFTImage";
import Trade from "../../components/nfts/Trade";
import { MarketPlaceContext } from "../../context/MarketPlace";
import CustomModal from "../../components/common/Modal";
import { NFT } from "@thirdweb-dev/sdk";
import useMediaQuery from "../../hooks/useMediaQuery";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex flex-col space-y-8 md:flex-row md:space-y-0 items-center`,
  nftImgContainer: `flex-1 md:mr-4 w-full`,
  detailsContainer: `flex-[2] md:ml-4 w-full `,
};

const NFTItem = () => {
  const router = useRouter();
  const { nftid } = router.query;

  const { nfts, listings, user } = useContext(MarketPlaceContext);
  const [isOwner, setIsOwner] = useState(false);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [marketNft, setMarketNft] = useState<any>(null);
  // check if media is less than 700px
  const matches = useMediaQuery({ query: "(max-width: 700px)" });
  useEffect(() => {
    if (listings?.length === 0 || !nftid || !selectedNft) return;
    (async () => {
      console.log("selectedNft in purchase:", selectedNft);
      console.log("listings in purchase", listings);
      const marketNftVal = listings!?.find(
        (marketNft) => marketNft?.asset.id === selectedNft?.metadata?.id
      );
      console.log("marketNftVal", marketNftVal);
      setMarketNft(marketNftVal);
    })();
  }, [selectedNft, listings, nftid]);
  useEffect(() => {
    // set is owner
    console.log("address", user.address);
    if (user.address && selectedNft?.owner === user.address) {
      setIsOwner(true);
    }
  }, [user.address, selectedNft]);
  useEffect(() => {
    if (nfts?.length === 0) return;
    const nft = nfts!?.find(
      (nft: NFT) => nft.metadata.id == router.query.nftid
    );
    setSelectedNft(nft);
  }, [nfts]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
    >
      <div className={style.wrapper}>
        <div className={style.container}>
          {matches && (
            <GenralDetails selectedNft={selectedNft} isOwner={isOwner} />
          )}
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              {!matches && (
                <GenralDetails selectedNft={selectedNft} isOwner={isOwner} />
              )}
              <Trade
                isListed={router?.query?.isListed}
                isOwner={isOwner}
                selectedNft={selectedNft}
                marketNft={marketNft}
                listings={listings}
              />
            </div>
          </div>
          <ItemActivity selectedNft={selectedNft} />
        </div>
      </div>
    </motion.div>
  );
};

export default NFTItem;
