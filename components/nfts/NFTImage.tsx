import React from "react";
import { IoMdSnow } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { NFTProps } from "../../types";
import ethereum from "../../assets/ethereum.svg";
const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
};

const NFTImage = ({ selectedNft }: NFTProps) => {
  return (
    <div className="border border-[#303339] rounded-lg">
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          {/* <IoMdSnow /> */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
            alt="ethereum"
            className="w-3"
          />
          <div className={style.likesCounter}>
            <span className="pr-2">2.3K</span>
            <AiOutlineHeart />
          </div>
        </div>
      </div>
      <div>
        <img
          src={selectedNft?.metadata.image}
          className="w-[80%] mx-auto object-cover"
        />
      </div>
    </div>
  );
};

export default NFTImage;
