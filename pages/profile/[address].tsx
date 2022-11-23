import { useRouter } from "next/router";
import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { client } from "../../lib/sanityClient";
import Header from "../../components/common/Header";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import NFTCard from "../../components/collections/NFTCard";
import Loader from "../../components/common/Loader";
import { MarketPlaceContext } from "../../context/MarketPlace";

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
  createdBy: `text-xl mb-4 flex flex-col space-x-3`,
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
const Profile = () => {
  const router = useRouter();
  const { address } = router.query;
  console.log(address);
  const [owners, setOwners] = useState<string[]>([]);
  const [collection, setCollection] = useState<collectionType>({
    imageUrl: "https://avatars.githubusercontent.com/u/39308600?v=4",
    bannerImageUrl:
      "https://home.kpmg/content/dam/kpmg/xx/images/2022/03/person-using-vr-banner.jpg",
    volumeTraded: 0,
    createdBy: 0,
    contractAddress: "",
    creator: "Xrevenge",
    title: "",
    floorPrice: 0,
    allOwners: [],
    description: "",
  });

  const {
    userNfts,
    userNftsLoaded,
    listings,
    activeListingsLoaded,
    userListings,
  } = useContext(MarketPlaceContext);

  return (
    <div className="overflow-hidden">
      <Header />
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
          <div className={style.createdBy}>
            <div className="flex flex-row space-4 items-center justif">
              {" "}
              <span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                  alt="eth"
                  className={style.ethLogo}
                />
              </span>
              <span className="text-[#2081e2]">
                {address!?.slice(0, 6) + "..." + address!?.slice(-4)}
              </span>
            </div>

            <span className="text-[#788897]">Joined May 2022</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{userNfts?.length || 0}</div>
              <div className={style.statName}>Nfts Owned</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{userListings?.length || 0}</div>
              <div className={style.statName}>NFTS Listed</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
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
                {collection?.volumeTraded}
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      {userNftsLoaded ? (
        <div className="my-[3rem] grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {userNfts?.map((nftItem, id) => (
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
    </div>
  );
};

export default Profile;
