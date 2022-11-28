import { useRouter } from "next/router";
import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { motion } from "framer-motion";
import { client } from "../../lib/sanityClient";
import Header from "../../components/common/Header";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import NFTCard from "../../components/collections/NFTCard";
import Loader from "../../components/common/Loader";
import { MarketPlaceContext } from "../../context/MarketPlace";
import {
  useActiveListings,
  useAddress,
  useListings,
  useNFTs,
  useOwnedNFTs,
  useSDK,
  useUser,
} from "@thirdweb-dev/react";
import { addresses } from "../../lib/constants";
const style = {
  bannerImageContainer: ` lg:h-[20rem] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `hidden md:flex text-3xl mb-[-2rem] mr-2`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-3xl lg:text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[80%] gap-5 md:w-[65%] flex flex-col md:flex-row items-center justify-center md:justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};
type collectionType = {
  imageUrl: string;
  bannerImageUrl: string;
  volumeTraded: number;
  createdBy: number;
  contractAddress: string;
  creator: any;
  title: string;
  floorPrice: number;
  allOwners: any[];
  description: string;
};
const CollectionId = () => {
  const router = useRouter();
  const { collectionid } = router.query;
  console.log(collectionid);
  const [collection, setCollection] = useState<collectionType>({
    imageUrl: "https://via.placeholder.com/200",
    bannerImageUrl: "https://via.placeholder.com/200",
    volumeTraded: 0,
    createdBy: 0,
    contractAddress: "",
    creator: "Xrevenge",
    title: "",
    floorPrice: 0,
    allOwners: [],
    description: "",
  });
  // use activeListing hook from ThirdwebSDK
  const {
    nfts,
    listings,
    nftsLoaded,
    activeListingsLoaded,
    volumeTraded,
    listedNfts,
  } = useContext(MarketPlaceContext);

  const owners = useMemo(() => {
    return (
      listings
        ?.map((nft) => nft.sellerAddress)
        .filter((value, index, self) => self.indexOf(value) === index) || []
    );
  }, [listings]);

  const floorPrice = useMemo(() => {
    // map listings to listing.buyoutCurrencyValuePerToken.displayValue
    const prices = listings?.map((listing) =>
      parseFloat(listing.buyoutCurrencyValuePerToken.displayValue)
    );
    if (prices)
      return Math.min(...prices) === Infinity ? 0 : Math.min(...prices);
    return 0;
  }, [listings]);
  const fetchCollectionData = useCallback(
    async (sanityClient = client) => {
      const query = `*[_type == "marketItems" && contractAddress == "${collectionid}" ] {
        "imageUrl": profileImage.asset->url,
        "bannerImageUrl": bannerImage.asset->url,
        volumeTraded,
        createdBy,
        contractAddress,
        "creator": createdBy->userName,
        title, floorPrice,
        "allOwners": owners[]->,
        description
    }`;
      const collectionData = await sanityClient.fetch(query);
      // the query returns 1 object inside of an array
      setCollection(collectionData[0]);
      console.log("collectionData", collectionData);
    },
    [collectionid]
  );

  useEffect(() => {
    if (!collectionid) return;
    console.log("collectionid", collectionid);
    fetchCollectionData();
  }, [collectionid]);

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
      className="overflow-hidden"
    >
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{" "}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{listedNfts?.length || 0}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {/* {collection?.allOwners ? collection.allOwners.length : ""} */}
                {owners ? owners.length : ""}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {floorPrice ? floorPrice : 0}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {volumeTraded || 0}
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      {nftsLoaded && activeListingsLoaded ? (
        <div className="my-[3rem] grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {listedNfts!.length > 0 &&
            listedNfts?.map((nftItem, id) => (
              <NFTCard
                key={id}
                nftItem={nftItem}
                title={collection?.title}
                listings={listings}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center my-[4rem] text-white animate-pulse">
          <Loader width={2} color="04111d" text={"Loading NFTs..."} />
        </div>
      )}
    </motion.div>
  );
};

export default CollectionId;
