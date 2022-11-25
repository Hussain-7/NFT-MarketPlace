import { AiFillHeart } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import { GiShare } from "react-icons/gi";
import { NFTProps } from "../../types";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  selectedNft: NFTProps["selectedNft"];
  isOwner: Boolean;
};

const style = {
  wrapper: `flex mb-10 md:mb-0 flex-col md:flex-row`,
  infoContainer: `h-16 md:h-36 md:w-full flex flex-col flex-1 justify-between mb-6`,
  accent: `text-[#2081e2] text-lg`,
  nftTitle: `text-3xl font-extrabold`,
  otherInfo: `flex`,
  ownedBy: `text-[#8a939b] mr-4`,
  likes: `flex items-center text-[#8a939b]`,
  likeIcon: `mr-1`,
  actionButtonsContainer: `w-44 ml-auto`,
  actionButtons: `flex flex-row container justify-between text-[1.4rem] border-2 rounded-lg`,
  actionButton: `my-2`,
  divider: `border-r-2`,
};

const GenralDetails = ({ selectedNft, isOwner }: Props) => {
  const router = useRouter();
  return (
    <div className={style.wrapper}>
      {selectedNft?.metadata.name && (
        <div className={style.infoContainer}>
          <div className={style.accent}>
            <button
              onClick={() => {
                router.back();
              }}
            >
              Bored Ape Yacht Club
              {/* <div className="animate-pulse">
                <div className="h-4 bg-[#2081e2] w-[60%] rounded-full"></div>
              </div> */}
            </button>
          </div>
          <div className={style.nftTitle}>
            {selectedNft?.metadata.name}
          </div>
          <div className={style.otherInfo}>
            <div className={style.ownedBy}>
              Owned by{" "}
              <span className={style.accent + "text-sm"}>
                {!isOwner
                  ? selectedNft?.owner?.slice(2, 8).toUpperCase()
                  : "You"}
              </span>
            </div>
            <div className={style.likes}>
              <AiFillHeart className={style.likeIcon} /> 2.3K favorites
            </div>
          </div>
        </div>
      )}
      <div className={style.actionButtonsContainer}>
        <div className={style.actionButtons}>
          <div className={`${style.actionButton} ml-2`}>
            <MdRefresh />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <RiShareBoxLine />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <GiShare />
          </div>
          <div className={style.divider} />
          <div className={`${style.actionButton} mr-2`}>
            <FiMoreVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenralDetails;
