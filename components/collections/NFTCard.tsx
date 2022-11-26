import React, { useEffect, useState } from "react";
import Router from "next/router";
import { BiHeart } from "react-icons/bi";
import { HiTag } from "react-icons/hi";
import { AuctionListing, DirectListing, NFT } from "@thirdweb-dev/sdk";

type NFTCardProps = {
  nftItem: NFT;
  title: string;
  listings: (AuctionListing | DirectListing)[] | undefined;
};

const style = {
  wrapper: `bg-[#303339] flex-auto my-10 mx-auto rounded-2xl overflow-hidden cursor-pointer hover:scale-110 duration-150 ease-in-out`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2 text-left`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  onSalelikes: `text-[#8a939b] font-bold flex items-center w-full justify-between  mt-3`,
  likeIcon: `text-xl mr-2`,
};

const NFTCard = ({ nftItem, listings, title }: NFTCardProps) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    const listing = listings?.find(
      (listing) => listing.asset.id === nftItem.metadata.id
    );
    if (Boolean(listing)) {
      setIsListed(true);
      setPrice(listing!.buyoutCurrencyValuePerToken.displayValue);
    }
  }, [listings, nftItem]);

  return (
    <div
      className={style.wrapper}
      onClick={() => {
        Router.push(
          {
            pathname: `/nfts/${nftItem.metadata.id}`,
            query: { isListed: isListed },
          },
          undefined,
          {
            shallow: true,
          }
        );
      }}
    >
      <div className={style.imgContainer}>
        <img src={nftItem.metadata.image || ""} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.assetName}>{nftItem.metadata.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>
        <div className={isListed ? style.onSalelikes : style.likes}>
          {isListed && <HiTag />}

          <div className="flex items-center justify-center">
            {" "}
            <span className={style.likeIcon}>
              <BiHeart />
            </span>{" "}
            <> {nftItem.metadata.likes || "34.3k"}</>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
